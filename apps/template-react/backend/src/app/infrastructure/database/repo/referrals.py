"""Referral repo — читает из newsbot БД."""

from sqlalchemy import select

from app.infrastructure.database.models.referral import Referral


class ReferralRepo:
    """Read-only репозиторий для referrals из newsbot БД."""

    def __init__(self, session):
        self.session = session

    async def list_by_inviter(self, inviter_id: int) -> list[Referral]:
        stmt = select(Referral).where(Referral.inviter_id == inviter_id)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def count_by_inviter(self, inviter_id: int) -> dict:
        refs = await self.list_by_inviter(inviter_id)
        total = len(refs)
        active = sum(1 for r in refs if r.is_active)
        return {"total": total, "active": active}
