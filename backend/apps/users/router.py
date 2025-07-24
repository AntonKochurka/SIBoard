from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse

from sqlalchemy.ext.asyncio import AsyncSession

from database import get_async_session
from . import services, crud
from .schemas import (
    UserResponse,
    UserCreateRequest,
    UserChangeRequest,
    UserDeactivateRequest,
    UserChangePasswordRequest
)

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=list[UserResponse])
async def get_users(
    db: AsyncSession = Depends(get_async_session)
): ...


@router.get("/{pk:int}", response_model=UserResponse)
async def get_single_user(
    pk: int, 
    db: AsyncSession = Depends(get_async_session)
): ...

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    body: UserCreateRequest, 
    db: AsyncSession = Depends(get_async_session)
): 
    identifier_test = await crud.get_user_by_username_or_email(db, body.username, body.email)
    if identifier_test:
        raise HTTPException(status.HTTP_409_CONFLICT, detail="Identifier already taken")

    user = await services.create_user(body, db)
    return JSONResponse(user)

@router.patch("/{pk:int}", response_model=UserResponse)
async def update_user(
    pk: int, body: UserChangeRequest, 
    db: AsyncSession = Depends(get_async_session)
): ...


@router.patch("/{pk:int}/deactivate", response_model=UserResponse)
async def deactivate_user(
    pk: int, body: UserDeactivateRequest, 
    db: AsyncSession = Depends(get_async_session)
): ...

@router.patch("/{pk:int}/password")
async def change_password(
    pk: int, body: UserChangePasswordRequest, 
    db: AsyncSession = Depends(get_async_session)
): ...

@router.delete("/{pk:int}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    pk: int, 
    db: AsyncSession = Depends(get_async_session)
): ...