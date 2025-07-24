from fastapi import HTTPException, status

from database import AsyncSession

from .models import User
from . import crud, schemas

async def create_user(db: AsyncSession, body: schemas.UserCreateRequest) -> User:
    user = User(**body.model_dump(exclude=["password"]))
    user.set_password()

    return await crud.create_user(db, user)

async def update_user(
    user_id: int, body: schemas.UserChangeRequest, 
    db: AsyncSession
) -> User:
    user = await crud.get_user_by_id(db, user_id)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    updates = body.model_dump(exclude_unset=True)
    return await crud.update_user(db, user, updates)

async def deactivate_user(
    user_id: int, body: schemas.UserDeactivateRequest, 
    db: AsyncSession
) -> User:
    user = await crud.get_user_by_id(db, user_id)
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    updates = {"is_active": body.is_active}
    return await crud.update_user(db, user, updates)

async def change_password(
    user: User, body: schemas.UserChangePasswordRequest,
    db: AsyncSession
) -> bool:
    if not user.check_password(body.old_password):
        return False
    
    user.set_password(body.new_password)
    
    await db.commit()
    await db.refresh(user)
    
    return True

async def get_user_by_identefier(db: AsyncSession, identifier: str):
    return await crud.get_user_by_username_or_email(db, identifier, identifier)