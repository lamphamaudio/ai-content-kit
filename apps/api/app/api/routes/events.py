from fastapi import APIRouter, Depends

from app.api.deps import get_analytics_service, get_user_id
from app.schemas.events import CopyEventRequest, EventResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter()


@router.post("/copy", response_model=EventResponse)
def copy_event(
    payload: CopyEventRequest,
    analytics: AnalyticsService = Depends(get_analytics_service),
    user_id: str = Depends(get_user_id),
):
    analytics.track("copy_event", {**payload.model_dump(), "user_id": user_id})
    return EventResponse(ok=True)
