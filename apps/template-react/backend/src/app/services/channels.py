"""Channels service — business logic for Mini App channels API."""

from __future__ import annotations

from app.infrastructure.database.models.channel import Channel, Post
from app.services.base import BaseService


ALLOWED_INTERVALS = {3600, 7200, 14400, 28800, 86400}  # 1h, 2h, 4h, 8h, 24h


class ChannelsService(BaseService):
    """Service for managing channels from the Mini App.

    ⚠️ Uses owner_id = Telegram ID, NOT users.id (UUID).
    """

    async def list_for_user(self, telegram_id: int) -> list[Channel]:
        """All channels of the given Telegram user."""
        return await self.repo.channels.list_by_owner(telegram_id)

    async def get_one(self, channel_id: int, telegram_id: int) -> Channel | None:
        """Channel by id, only if it belongs to the given user."""
        return await self.repo.channels.get_by_id_and_owner(channel_id, telegram_id)

    async def toggle(self, channel_id: int, telegram_id: int) -> Channel | None:
        """Flip is_active. Returns updated channel or None if not found/not owned."""
        channel = await self.repo.channels.get_by_id_and_owner(channel_id, telegram_id)
        if channel is None:
            return None
        channel.is_active = not channel.is_active
        await self.repo.session.flush()
        await self.repo.session.refresh(channel)
        return channel

    async def set_interval(self, channel_id: int, telegram_id: int, interval: int) -> Channel | None:
        """Set post_interval in seconds. Raises ValueError on invalid value."""
        if interval not in ALLOWED_INTERVALS:
            raise ValueError(f"interval must be one of {sorted(ALLOWED_INTERVALS)}")
        channel = await self.repo.channels.get_by_id_and_owner(channel_id, telegram_id)
        if channel is None:
            return None
        channel.post_interval = interval
        await self.repo.session.flush()
        await self.repo.session.refresh(channel)
        return channel

    async def list_pending_posts(self, channel_id: int, telegram_id: int, limit: int = 50) -> list[Post]:
        """Pending posts for a channel, only if owned by the given user (bonus, later)."""
        channel = await self.repo.channels.get_by_id_and_owner(channel_id, telegram_id)
        if channel is None:
            return []
        return await self.repo.channels.list_pending_posts(channel_id, limit)
