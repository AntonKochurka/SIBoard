from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse

from database import AsyncSession, get_async_session
from .schemas import ObtainPairRequest, BlacklistTokenRequest, Payload
from . import services, crud

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/obtain", status_code=status.HTTP_200_OK)
async def obtain_pair(body: ObtainPairRequest):
    user_id = await services.authenticate_user(body.identifier, body.password)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    refresh, exp = services.generate_token(Payload(sub=str(user_id), token_type="refresh"))
    access, _ = services.generate_token(Payload(sub=str(user_id), token_type="access"))

    response = JSONResponse(
        content={"refresh": refresh, "access": access},
        status_code=status.HTTP_200_OK
    )
    response.set_cookie(
        key="refresh",
        value=refresh,
        max_age=int(exp),
        httponly=True,
        secure=True,
        samesite="strict"
    )
    
    return response

@router.post("/refresh")
async def refresh_pair(): ...


@router.post("/blacklist", status_code=status.HTTP_204_NO_CONTENT)
async def blacklist_token(
    body: BlacklistTokenRequest,
    session: AsyncSession = Depends(get_async_session)
):
    if not body.access and not body.refresh:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No tokens provided")

    if body.access:
        await services.blacklist_token(token=body.access, token_type="access", session=session)

    response = JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    if body.refresh:
        await services.blacklist_token(token=body.refresh, token_type="refresh", session=session)
        response.delete_cookie("refresh")

    return response

@router.get("/protected")
async def test(): ...