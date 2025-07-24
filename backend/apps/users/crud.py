from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_

from .models import User

async def get_all_users(db: AsyncSession):
    return (
        await db.execute(
            select(User)
        )
    ).scalars().all()

async def get_user_by_id(db: AsyncSession, user_id: int):
    return (
        await db.execute(
            select(User).filter(User.id == user_id)
        )
    ).scalar_one_or_none()

async def get_user_by_username_or_email(db: AsyncSession, username: str, email: str):
    return (
        await db.execute(
            select(User).filter(
                or_(User.username == username, User.email == email)
        )
    )).scalar_one_or_none()

async def create_user(db: AsyncSession, user: User):
    db.add(user)

    await db.commit()
    await db.refresh(user)

    return user

async def update_user(db: AsyncSession, user: User, updates: dict):
    for field, value in updates.items():
        setattr(user, field, value)

    await db.commit()
    await db.refresh(user)

    return user

async def delete_user(db: AsyncSession, user_id: int):
    user = await get_user_by_id(db, user_id)

    if user:
        await db.delete(user)
        await db.commit()
