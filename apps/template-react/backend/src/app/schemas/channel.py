"""Pydantic schemas for the channels API."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ChannelOut(BaseModel):
    """Channel as returned to the Mini App."""

    id: int
    channel_id: str
    channel_name: str | None = None
    topic: str | None = None
    is_active: bool
    post_interval: int
    moderation_mode: bool
    ai_model: str | None = None
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class SetIntervalRequest(BaseModel):
    """Request body for setting post interval (in seconds)."""

    interval: int = Field(..., description="Interval in seconds: 3600, 7200, 14400, 28800 or 86400")
