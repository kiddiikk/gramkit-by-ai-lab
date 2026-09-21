from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from starlette.requests import Request

from app.exceptions import UserNotFoundException
from app.services.requests import RequestsService
from app.webhook.auth import get_user
from app.webhook.dependencies.service import get_services
from core.infrastructure.fastapi.rate_limiter import HARD_LIMIT, SOFT_LIMIT, limiter
from core.infrastructure.logging import get_logger
from core.schemas.start import StartData, StartParamsRequest
from core.schemas.users import UserSchema

router = APIRouter()

logger = get_logger(__name__)


@router.get("/friends")
@limiter.limit(SOFT_LIMIT)
async def get_friends(
    request: Request,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> list[UserSchema]:
    friends = await services.users.get_friends(user.id)
    return friends


@router.post("/add_friend")
@limiter.limit(HARD_LIMIT)
async def add_friend(
    request: Request,
    friend_id: UUID,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
):
    try:
        await services.users.add_friend(user.id, friend_id)
        logger.info(f"User {user.id} added friend {friend_id}")
        return {"status": "success"}
    except UserNotFoundException:
        raise HTTPException(status_code=404, detail="Friend not found")


@router.get("/create_invite")
@limiter.limit(HARD_LIMIT)
async def create_invite(
    request: Request,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> str:
    return await services.invites.create_invite(user.id)


@router.post("/process_start")
@limiter.limit(SOFT_LIMIT)
async def process_start(
    request: Request,
    start_params: StartParamsRequest,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> StartData:
    return await services.start.process_start(user, start_params)
# ============================================================
# ТЕСТОВЫЙ ЭНДПОИНТ — СИМУЛЯЦИЯ ОПЛАТЫ (удалить перед продакшеном!)
# ============================================================

from datetime import datetime, timedelta, UTC
from core.infrastructure.database.models.enums import PaymentProvider, SubscriptionStatus
from uuid import uuid4


@router.post("/test/grant-subscription")
async def test_grant_subscription(
    request: Request,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> dict:
    """
    ⚠️ ТЕСТОВЫЙ ЭНДПОИНТ. Симулирует успешную оплату Stars.
    Удалить перед продакшеном!
    """
    # Мапинг product_id → длительность
    products = {
        "FEELIT_START": 30,
        "FEELIT_PRO": 30,
        "FEELIT_BUSINESS": 30,
    }
    
    product_id = "FEELIT_START"  # по умолчанию Старт
    days = products.get(product_id, 30)
    
    now = datetime.now(UTC)
    end_date = now + timedelta(days=days)
    
    # 1. Создаём subscription
    await services.repo.subscriptions.create({
        "id": uuid4(),
        "user_id": user.id,
        "product_id": product_id,
        "provider_id": PaymentProvider.GIFT,
        "currency": "XTR",
        "status": SubscriptionStatus.ACTIVE,
        "start_date": now,
        "end_date": end_date,
        "recurring_details": {},
    })
    
    # 2. Обновляем users.subscription_until (для синхронизации с newsbot)
    await services.repo.users.update_user(user.id, {
        "subscription_until": end_date,
        "subscription_plan": "start",
    })
    
    return {
        "status": "ok",
        "message": f"Тестовая подписка активирована до {end_date}",
        "product_id": product_id,
        "end_date": end_date.isoformat(),
    }
