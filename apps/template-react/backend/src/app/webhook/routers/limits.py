"""Feel It — AI Lab: эндпоинт лимитов тарифа."""

from typing import Any

from fastapi import APIRouter, Depends, Request

from app.domain.limits import get_limits_for_product
from app.infrastructure.database.repo.requests import RequestsRepo
from app.webhook.auth import get_user
from app.webhook.dependencies.service import get_services
from core.infrastructure.fastapi.rate_limiter import SOFT_LIMIT, limiter
from core.infrastructure.logging import get_logger
from core.schemas.users import UserSchema

logger = get_logger(__name__)

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me/limits")
@limiter.limit(SOFT_LIMIT)
async def get_my_limits(
    request: Request,
    services=Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> dict[str, Any]:
    """
    Возвращает лимиты тарифа текущего юзера + использование.

    Если нет активной подписки — лимиты 'start'.
    """
    # Получаем активную подписку юзера
    subscription = None
    try:
        subscription = await services.repo.subscriptions.get_active_by_user_id(user.id)
    except Exception as e:
        logger.warning(f"Ошибка получения подписки для {user.id}: {e}")

    product_id = subscription.product_id if subscription else None
    plan_key, limits = get_limits_for_product(product_id)

    # Считаем использование: каналы
    channels_count = 0
    try:
        if user.telegram_id:
            channels = await services.repo.channels.list_by_owner(user.telegram_id)
            channels_count = len(channels)
    except Exception as e:
        logger.warning(f"Ошибка подсчёта каналов для {user.id}: {e}")
        
    return {
        "plan_key": plan_key,
        "product_id": product_id,
        "limits": limits,
        "usage": {
            "channels": channels_count,
            "posts_today": 0,  # TODO: считать посты за сегодня
        },
    }
