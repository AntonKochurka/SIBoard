from fastapi import APIRouter
from fastapi.responses import JSONResponse

from .schemas import ObtainPairRequest

router = APIRouter(prefix="/auth", tags="auth")

@router.post("/obtain")
async def obtain_pair(body: ObtainPairRequest): 
    response = JSONResponse({})

    return response

@router.post("/refresh")
async def refresh_pair(): ...

@router.post("/blacklist")
async def blacklist_token(): ...

@router.get("/protected")
async def test(): ...
