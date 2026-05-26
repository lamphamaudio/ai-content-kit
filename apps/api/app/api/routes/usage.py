from fastapi import APIRouter

from app.schemas.usage import UsageResponse

router = APIRouter()


@router.get("/me", response_model=UsageResponse)
def usage():
    return UsageResponse(plan="free", used=0, limit=30)

