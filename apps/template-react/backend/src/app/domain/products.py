from collections.abc import Awaitable, Callable
from dataclasses import dataclass, field
from typing import Any
from uuid import UUID

from core.infrastructure.config import settings
from core.infrastructure.database.models.payments import Payment
from core.infrastructure.logging import get_logger

logger = get_logger(__name__)


@dataclass
class CurrencyPrice:
    amount: float
    currency: str


async def default_reward(user_id: UUID, payment: Payment, recurring_details: dict, subscriptions_service) -> None:
    logger.warning(
        f"Default reward: payment {payment.id} for user {user_id} completed successfully (product {payment.product_id} has no reward handler)"
    )


async def weekly_reward(user_id: UUID, payment: Payment, recurring_details: dict, subscriptions_service) -> None:
    logger.info(f"Weekly reward: initiating top-up for user {user_id}, payment {payment.id}")
    await subscriptions_service.top_up_subscription(
        user_id, payment.product_id, 7, payment, recurring_details,
    )


async def monthly_reward(user_id: UUID, payment: Payment, recurring_details: dict, subscriptions_service) -> None:
    logger.info(f"Monthly reward: initiating top-up for user {user_id}, payment {payment.id}")
    await subscriptions_service.top_up_subscription(
        user_id, payment.product_id, 30, payment, recurring_details,
    )


async def yearly_reward(user_id: UUID, payment: Payment, recurring_details: dict, subscriptions_service) -> None:
    logger.info(f"Yearly reward: initiating top-up for user {user_id}, payment {payment.id}")
    await subscriptions_service.top_up_subscription(
        user_id, payment.product_id, 365, payment, recurring_details,
    )


RewardStrategy = Callable[[UUID, Payment, dict[str, Any], Any], Awaitable[None]]


@dataclass
class PaymentProduct:
    product_id: str
    name: str
    duration_days: int
    prices: dict[str, CurrencyPrice]
    recurring: bool = False
    reward_handler: RewardStrategy = field(default=default_reward)

    def get_price_for(self, currency: str) -> CurrencyPrice:
        return self.prices.get(currency) or next(iter(self.prices.values()))

    async def reward(self, user_id: UUID, payment: Payment, recurring_details: dict, subscriptions_service) -> None:
        await self.reward_handler(user_id, payment, recurring_details, subscriptions_service)


# ============================================================
# LEGACY PRODUCTS — оставлены для активных подписок, не показываются
# ============================================================
LEGACY_PRODUCTS = {
    "WEEK_SUB": PaymentProduct(
        product_id="WEEK_SUB",
        name="Weekly Subscription",
        duration_days=7,
        prices={"RUB": CurrencyPrice(129.0, "RUB"), "USD": CurrencyPrice(1.49, "USD")},
        recurring=True,
        reward_handler=weekly_reward,
    ),
    "MONTH_SUB": PaymentProduct(
        product_id="MONTH_SUB",
        name="Monthly Subscription",
        duration_days=30,
        prices={"RUB": CurrencyPrice(249.0, "RUB"), "USD": CurrencyPrice(2.99, "USD")},
        recurring=True,
        reward_handler=monthly_reward,
    ),
    "YEAR_SUB": PaymentProduct(
        product_id="YEAR_SUB",
        name="Yearly Subscription",
        duration_days=365,
        prices={"RUB": CurrencyPrice(749.0, "RUB"), "USD": CurrencyPrice(7.99, "USD")},
        recurring=True,
        reward_handler=yearly_reward,
    ),
    "WEEK_SUB_V2": PaymentProduct(
        product_id="WEEK_SUB_V2",
        name="Weekly Subscription",
        duration_days=7,
        prices={"RUB": CurrencyPrice(169.0, "RUB"), "USD": CurrencyPrice(1.99, "USD")},
        recurring=True,
        reward_handler=weekly_reward,
    ),
    "MONTH_SUB_V2": PaymentProduct(
        product_id="MONTH_SUB_V2",
        name="Monthly Subscription",
        duration_days=30,
        prices={"RUB": CurrencyPrice(349.0, "RUB"), "USD": CurrencyPrice(3.99, "USD")},
        recurring=True,
        reward_handler=monthly_reward,
    ),
    "YEAR_SUB_V2": PaymentProduct(
        product_id="YEAR_SUB_V2",
        name="Yearly Subscription",
        duration_days=365,
        prices={"RUB": CurrencyPrice(849.0, "RUB"), "USD": CurrencyPrice(9.99, "USD")},
        recurring=True,
        reward_handler=yearly_reward,
    ),
    # V3 — тоже legacy, были активны до этого
    "WEEK_SUB_V3": PaymentProduct(
        product_id="WEEK_SUB_V3",
        name="Weekly Subscription",
        duration_days=7,
        prices={"RUB": CurrencyPrice(222.0, "RUB"), "USD": CurrencyPrice(1.99, "USD")},
        recurring=True,
        reward_handler=weekly_reward,
    ),
    "MONTH_SUB_V3": PaymentProduct(
        product_id="MONTH_SUB_V3",
        name="Monthly Subscription",
        duration_days=30,
        prices={"RUB": CurrencyPrice(555.0, "RUB"), "USD": CurrencyPrice(3.99, "USD")},
        recurring=True,
        reward_handler=monthly_reward,
    ),
    "YEAR_SUB_V3": PaymentProduct(
        product_id="YEAR_SUB_V3",
        name="Yearly Subscription",
        duration_days=365,
        prices={"RUB": CurrencyPrice(999.0, "RUB"), "USD": CurrencyPrice(9.99, "USD")},
        recurring=True,
        reward_handler=yearly_reward,
    ),
}


# ============================================================
# FEEL IT PRODUCTS — активные, показываются в Mini App
# Все на 30 дней, отличаются лимитами (в newsbot)
# ============================================================
FEELIT_PRODUCTS = {
    "FEELIT_START": PaymentProduct(
        product_id="FEELIT_START",
        name="Старт",
        duration_days=30,
        prices={
            "XTR": CurrencyPrice(250.0, "XTR"),
            "RUB": CurrencyPrice(250.0, "RUB"),
        },
        recurring=True,
        reward_handler=monthly_reward,
    ),
    "FEELIT_PRO": PaymentProduct(
        product_id="FEELIT_PRO",
        name="Про",
        duration_days=30,
        prices={
            "XTR": CurrencyPrice(500.0, "XTR"),
            "RUB": CurrencyPrice(500.0, "RUB"),
        },
        recurring=True,
        reward_handler=monthly_reward,
    ),
    "FEELIT_BUSINESS": PaymentProduct(
        product_id="FEELIT_BUSINESS",
        name="Бизнес",
        duration_days=30,
        prices={
            "XTR": CurrencyPrice(1000.0, "XTR"),
            "RUB": CurrencyPrice(1000.0, "RUB"),
        },
        recurring=True,
        reward_handler=monthly_reward,
    ),
}


# ============================================================
# TEST PRODUCTS — только в debug-режиме
# ============================================================
TEST_PRODUCTS = {
    "TEST_ONETIME": PaymentProduct(
        product_id="TEST_ONETIME",
        name="Test One-time Payment",
        duration_days=7,
        prices={"XTR": CurrencyPrice(1.0, "XTR")},
        recurring=False,
    ),
    "TEST_SUBSCRIPTION": PaymentProduct(
        product_id="TEST_SUBSCRIPTION",
        name="Test Subscription",
        duration_days=30,
        prices={"XTR": CurrencyPrice(1.0, "XTR")},
        recurring=True,
        reward_handler=monthly_reward,
    ),
}


# ============================================================
# EXPORTS — что показывать в Mini App, что доступно внутри
# ============================================================

# В Mini App показываем ТОЛЬКО FEEL IT
CURRENT_OFFERS = FEELIT_PRODUCTS

# Внутри — всё (legacy + новые), чтобы найти существующие подписки
ALL_PRODUCTS = {**LEGACY_PRODUCTS, **FEELIT_PRODUCTS}


def get_product(product_id: str) -> PaymentProduct | None:
    """
    Get product by ID, checking both active and legacy products.
    In debug mode, also includes test products.
    """
    if settings.debug:
        all_products = {**ALL_PRODUCTS, **TEST_PRODUCTS}
        return all_products.get(product_id)

    return ALL_PRODUCTS.get(product_id)
