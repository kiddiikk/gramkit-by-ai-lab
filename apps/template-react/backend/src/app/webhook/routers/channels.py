"""Channels API for the Mini App: list, toggle, set interval."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from starlette.requests import Request

from app.schemas.channel import ChannelOut, SetIntervalRequest
from app.services.requests import RequestsService
from app.webhook.auth import get_user
from app.webhook.dependencies.service import get_services
from core.infrastructure.fastapi.rate_limiter import HARD_LIMIT, SOFT_LIMIT, limiter
from core.infrastructure.logging import get_logger
from core.schemas.users import UserSchema

router = APIRouter(prefix="/channels", tags=["channels"])

logger = get_logger(__name__)


@router.get("", response_model=list[ChannelOut])
@limiter.limit(SOFT_LIMIT)
async def list_channels(
    request: Request,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> list[ChannelOut]:
    """List channels owned by the current Telegram user."""
    if user.telegram_id is None:
        return []
    channels = await services.channels.list_for_user(user.telegram_id)
    return [ChannelOut.model_validate(c) for c in channels]


@router.get("/{channel_id}", response_model=ChannelOut)
@limiter.limit(SOFT_LIMIT)
async def get_channel(
    request: Request,
    channel_id: int,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> ChannelOut:
    """Get a single channel owned by the current user."""
    if user.telegram_id is None:
        raise HTTPException(status_code=403, detail="Telegram authentication required")
    channel = await services.channels.get_one(channel_id, user.telegram_id)
    if channel is None:
        raise HTTPException(status_code=404, detail="Channel not found")
    return ChannelOut.model_validate(channel)


@router.post("/{channel_id}/toggle", response_model=ChannelOut)
@limiter.limit(HARD_LIMIT)
async def toggle_channel(
    request: Request,
    channel_id: int,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> ChannelOut:
    """Pause/resume the channel (flip is_active)."""
    if user.telegram_id is None:
        raise HTTPException(status_code=403, detail="Telegram authentication required")
    channel = await services.channels.toggle(channel_id, user.telegram_id)
    if channel is None:
        raise HTTPException(status_code=404, detail="Channel not found")
    logger.info(f"User tg={user.telegram_id} toggled channel {channel_id} -> is_active={channel.is_active}")
    return ChannelOut.model_validate(channel)


@router.post("/{channel_id}/interval", response_model=ChannelOut)
@limiter.limit(HARD_LIMIT)
async def set_interval(
    request: Request,
    channel_id: int,
    body: SetIntervalRequest,
    services: RequestsService = Depends(get_services),
    user: UserSchema = Depends(get_user),
) -> ChannelOut:
    """Set the post interval (in seconds) for the channel."""
    if user.telegram_id is None:
        raise HTTPException(status_code=403, detail="Telegram authentication required")
    try:
        channel = await services.channels.set_interval(channel_id, user.telegram_id, body.interval)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if channel is None:
        raise HTTPException(status_code=404, detail="Channel not found")
    logger.info(f"User tg={user.telegram_id} set interval={body.interval} for channel {channel_id}")
    return ChannelOut.model_validate(channel)
