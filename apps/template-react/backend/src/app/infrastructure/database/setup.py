from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from core.infrastructure.config import DatabaseSettings, settings


def create_engine(db: DatabaseSettings, echo=False):
    engine = create_async_engine(
        db.url,
        query_cache_size=1200,
        pool_size=20,
        max_overflow=200,
        pool_timeout=30,
        pool_recycle=1800,
        pool_pre_ping=True,
        future=True,
        echo=echo,
    )
    return engine


def create_session_pool(engine):
    session_pool = async_sessionmaker(bind=engine, expire_on_commit=False)
    return session_pool


# 👇 Engine для newsbot БД (read-only — referrals)
newsbot_engine = create_engine(settings.newsbot_db, echo=False)
newsbot_session_pool = create_session_pool(newsbot_engine)
