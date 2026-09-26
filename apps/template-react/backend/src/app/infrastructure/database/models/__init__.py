"""Template application database models."""

from app.infrastructure.database.models.balance import Balance
from app.infrastructure.database.models.channel import Channel, Post
from app.infrastructure.database.models.referral import Referral
from core.infrastructure.database.models import (
    Friendship,
    Group,
    GroupInvite,
    Payment,
    Subscription,
    User,
)

__all__ = [
    # Core models (from core package)
    "User",
    "Payment",
    "Subscription",
    "GroupInvite",
    "Group",
    "Friendship",
    # Template models
    "Balance",
    "Channel",
    "Post",
    "Referral",
]
