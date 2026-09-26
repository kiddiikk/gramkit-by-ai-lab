"""Referrals route — читает из newsbot БД через отдельный engine."""

from fastapi import APIRouter, Depends, Request

from app.infrastructure.database.repo.referrals import ReferralRepo
from app.infrastructure.database.setup import newsbot_session_pool
from app.webhook.auth import get_user
from core.infrastructure.fastapi.rate_limiter import SOFT_LIMIT, limiter
from core.infrastructure.logging import get_logger
from core.schemas.users import UserSchema

logger = get_logger(__name__)

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me/referrals")
@limiter.limit(SOFT_LIMIT)
async def get_my_referrals(
    request: Request,
    user: UserSchema = Depends(get_user),
) -> dict:
    """Возвращает рефералов текущего юзера."""
    if not user.telegram_id:
        return {"link": None, "total": 0, "active": 0, "referrals": []}

    async with newsbot_session_pool() as session:
        repo = ReferralRepo(session)
        refs = await repo.list_by_inviter(user.telegram_id)

    total = len(refs)
    active = sum(1 for r in refs if r.is_active)

    link = f"https://t.me/feelit_ailab_bot?start=ref_{user.telegram_id}"

    return {
        "link": link,
        "total": total,
        "active": active,
        "referrals": [
            {
                "invited_at": r.invited_at.isoformat() if r.invited_at else None,
                "is_active": r.is_active,
            }
            for r in refs[:50]
        ],
    }
