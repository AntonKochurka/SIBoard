from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from .models import BlacklistedToken

async def is_jti_blacklisted(jti: str, session: AsyncSession) -> bool:
    result = await session.execute(
        select(BlacklistedToken).where(BlacklistedToken.jti == jti)
    )

    return result.scalar_one_or_none() is not None

async def blacklist_jti(*, jti: str, token_type: str, session: AsyncSession) -> BlacklistedToken:
    if await is_jti_blacklisted(jti, session):
        return await session.scalar(
            select(BlacklistedToken)
                .where(BlacklistedToken.jti == jti)
        )
    
    token = BlacklistedToken(jti=jti, token_type=token_type)
    
    session.add(token)
    
    await session.commit()
    await session.refresh(token)

    return token
