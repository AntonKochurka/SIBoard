from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyCookie, HTTPBearer, HTTPAuthorizationCredentials

from database import AsyncSession, get_async_session
from . import services, crud

bearer_scheme = HTTPBearer(name="access", scheme_name="access", auto_error=False)
refresh_cookie = APIKeyCookie(name="refresh", scheme_name="refresh", auto_error=False)


async def get_current_user(
    bearer: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    session: AsyncSession = Depends(get_async_session)
):
    if not bearer:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing access token")

    try:
        payload = services.decode_token(bearer.credentials)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    jti = payload.get("jti")
    if not jti or await crud.is_jti_blacklisted(jti, session):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token blacklisted")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

    return user_id