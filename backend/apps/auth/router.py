from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags="auth")

@router.post("/obtain")
async def obtain_pair(): ...

@router.post("/refresh")
async def refresh_pair(): ...

@router.post("/blacklist")
async def blacklist_token(): ...

@router.get("/protected")
async def test(): ...
