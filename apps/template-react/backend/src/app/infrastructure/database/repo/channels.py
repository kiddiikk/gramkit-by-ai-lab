"""Channel repository — CRUD on channels table owned by newsbot."""

from __future__ import annotations

from sqlalchemy import select

from app.infrastructure.database.models.channel import Channel, Post
from core.infrastructure.database.repo.base import BaseRepo


class ChannelRepo(BaseRepo[Channel]):
    """Repository for Channel operations."""

    model = Channel

    async def list_by_owner(self, telegram_id: int) -> list[Channel]:
        """All channels of the given Telegram user."""
        stmt = select(Channel).where(Channel.owner_id == telegram_id).order_by(Channel.id)
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id_and_owner(self, channel_id: int, telegram_id: int) -> Channel | None:
        """Channel by id, but only if it belongs to the given Telegram user."""
        stmt = select(Channel).where(Channel.id == channel_id, Channel.owner_id == telegram_id)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_pending_posts(self, channel_id: int, limit: int = 50) -> list[Post]:
        """Queue of pending posts for a channel (bonus endpoint, later)."""
        stmt = (
            select(Post)
            .where(Post.channel_id == channel_id, Post.status == "pending")
            .order_by(Post.scheduled_time)
            .limit(limit)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())
