from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_superuser: bool

    class Config:
        orm_mode = True

class UserAdminResponse(UserBase):
    id: int
    email: EmailStr
    is_active: bool
    is_superuser: bool

    class Config:
        orm_mode = True

class UserCreateRequest(UserBase):
    email: EmailStr
    password: str

class UserChangeRequest(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None

class UserDeactivateRequest(BaseModel):
    is_active: bool

class UserChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

class UserAdminUpdateRequest(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_superuser: Optional[bool] = None
