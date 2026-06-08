from fastapi import APIRouter, Depends

from app.api.deps import get_usage_service, get_user_id
from app.schemas.usage import UsageResponse
from app.services.usage_service import UsageService

router = APIRouter()


@router.get("/me", response_model=UsageResponse)
def usage(
    user_id: str = Depends(get_user_id),
    usage_service: UsageService = Depends(get_usage_service),
):
    return UsageResponse(**usage_service.get_usage_summary(user_id))
