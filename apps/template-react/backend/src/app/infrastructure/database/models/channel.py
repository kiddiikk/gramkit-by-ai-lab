"""Channel and Post models — read/write to tables owned by newsbot.

owner_id stores the OWNER'S TELEGRAM ID (BigInteger), NOT users.id (UUID).
Uses extend_existing=True because tables are already created by newsbot.
"""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import JSON, BigInteger, Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from core.infrastructure.database.models.base import Base, CreatedAtMixin, TableNameMixin


class Channel(Base, CreatedAtMixin, TableNameMixin):
    """Telegram channel managed by the newsbot service.

    ⚠️ owner_id = user's Telegram ID (BigInteger), NOT users.id (UUID).
    """

    __table_args__ = {"extend_existing": True}

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    channel_id: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    channel_name: Mapped[str | None] = mapped_column(String)
    topic: Mapped[str | None] = mapped_column(String)
    owner_id: Mapped[int] = mapped_column(BigInteger, index=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    post_interval: Mapped[int] = mapped_column(Integer, default=7200)
    moderation_mode: Mapped[bool] = mapped_column(Boolean, default=False)
    ai_model: Mapped[str | None] = mapped_column(String)
    ai_prompt: Mapped[str | None] = mapped_column(Text)
    settings: Mapped[dict | None] = mapped_column(JSON, default=dict)
    trial_until: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    trial_notified: Mapped[bool] = mapped_column(Boolean, default=False)

    def __repr__(self) -> str:
        return f"<Channel id={self.id} name={self.channel_name!r} owner_id={self.owner_id}>"


class Post(Base, CreatedAtMixin, TableNameMixin):
    """Post scheduled by newsbot. Read-only for the Mini App."""

    __table_args__ = {"extend_existing": True}

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    channel_id: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
    source_url: Mapped[str | None] = mapped_column(String)
    original_title: Mapped[str | None] = mapped_column(String)
    original_content: Mapped[str | None] = mapped_column(Text)
    processed_content: Mapped[str | None] = mapped_column(Text)
    media_urls: Mapped[list | None] = mapped_column(JSON, default=list)
    status: Mapped[str] = mapped_column(String, default="pending")
    scheduled_time: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    published_time: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    message_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    hash: Mapped[str | None] = mapped_column(String, index=True, nullable=True)

    def __repr__(self) -> str:
        return f"<Post id={self.id} channel_id={self.channel_id} status={self.status}>"
