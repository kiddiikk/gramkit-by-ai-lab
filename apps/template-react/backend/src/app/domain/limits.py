from typing import TypedDict


class PlanLimits(TypedDict):
    name: str
    channels: int
    posts_per_day: int
    interval_hours: int
    model_120b: bool
    custom_prompt: bool
    moderation: bool
    team_size: int
    analytics: bool
    priority_support: bool


PLAN_LIMITS: dict[str, PlanLimits] = {
    "start": {
        "name": "🚀 Старт",
        "channels": 1,
        "posts_per_day": 5,
        "interval_hours": 4,
        "model_120b": False,
        "custom_prompt": False,
        "moderation": False,
        "team_size": 0,
        "analytics": False,
        "priority_support": False,
    },
    "pro": {
        "name": "💎 Про",
        "channels": 3,
        "posts_per_day": 20,
        "interval_hours": 2,
        "model_120b": True,
        "custom_prompt": True,
        "moderation": True,
        "team_size": 2,
        "analytics": False,
        "priority_support": False,
    },
    "business": {
        "name": "🏢 Бизнес",
        "channels": 10,
        "posts_per_day": 100,
        "interval_hours": 1,
        "model_120b": True,
        "custom_prompt": True,
        "moderation": True,
        "team_size": 5,
        "analytics": True,
        "priority_support": True,
    },
}

PRODUCT_TO_PLAN = {
    "FEELIT_START": "start",
    "FEELIT_PRO": "pro",
    "FEELIT_BUSINESS": "business",
}


def get_limits_for_product(product_id: str | None) -> PlanLimits:
    """Возвращает лимиты для продукта. По умолчанию — start."""
    plan_key = PRODUCT_TO_PLAN.get(product_id or "", "start")
    return PLAN_LIMITS.get(plan_key, PLAN_LIMITS["start"])


def get_limits_for_plan(plan_key: str) -> PlanLimits:
    """Возвращает лимиты по ключу плана."""
    return PLAN_LIMITS.get(plan_key, PLAN_LIMITS["start"])
