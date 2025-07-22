from typing import Literal, Optional
from pydantic import BaseModel, field_validator
from fastapi import Cookie

class ObtainPairRequest(BaseModel): 
    identifier: str
    password: str

class RefreshPairRequest(BaseModel): 
    refresh: Optional[str] = Cookie(default=None)

class BlacklistTokenRequest(BaseModel): 
    access: Optional[str] = None
    refresh: Optional[str] = None

class Payload(BaseModel):
    sub: str
    jti: Optional[str] = None
    exp: Optional[float] = None
    token_type: Literal["access", "refresh"]
    
    @field_validator("sub", mode="before")
    @classmethod
    def convert_sub_to_str(cls, v):
        return str(v)
