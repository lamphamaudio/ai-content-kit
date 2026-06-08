from dataclasses import dataclass

import httpx
from fastapi import HTTPException, Request, status

from app.core.config import settings


LOCAL_DEMO_USER_ID = "local-demo-user"


@dataclass(frozen=True)
class UserContext:
    user_id: str
    email: str | None = None
    is_authenticated: bool = False
    access_token: str | None = None


async def get_current_user(request: Request) -> UserContext:
    authorization = request.headers.get("authorization")
    if not authorization:
        return UserContext(user_id=LOCAL_DEMO_USER_ID)

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header")

    supabase_url = settings.resolved_supabase_url
    anon_key = settings.resolved_supabase_anon_key
    if not supabase_url or not anon_key:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Supabase Auth is not configured")

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(
                f"{supabase_url.rstrip('/')}/auth/v1/user",
                headers={
                    "apikey": anon_key,
                    "authorization": f"Bearer {token}",
                },
            )
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not verify Supabase session") from exc

    if response.status_code != 200:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Supabase session")

    data = response.json()
    user_id = data.get("id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Supabase session has no user id")

    return UserContext(
        user_id=str(user_id),
        email=data.get("email"),
        is_authenticated=True,
        access_token=token,
    )


async def get_current_user_id(request: Request) -> str:
    return (await get_current_user(request)).user_id
