"""Referral model — таблица referrals из newsbot БД (read-only)."""

from datetime import datetime

from sqlalchemy import BigInteger, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from core.infrastructure.database.models.base import Base, int_pk


class Referral(Base):
    """Referral — таблица referrals из newsbot БД (read-only)."""
    __tablename__ = "referrals"
    __table_args__ = {'extend_existing': True}

    id: Mapped[int_pk]
    inviter_id: Mapped[int] = mapped_column(BigInteger, index=True)
    invited_id: Mapped[int] = mapped_column(BigInteger, unique=True)
    invited_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=False)
