from fastapi import APIRouter, Depends

from app.api.deps import get_analytics_service, get_user_id
from app.schemas.feedback import FeedbackRequest, FeedbackResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter()


@router.post("", response_model=FeedbackResponse)
@router.post("/", response_model=FeedbackResponse)
def submit_feedback(
    payload: FeedbackRequest,
    analytics: AnalyticsService = Depends(get_analytics_service),
    user_id: str = Depends(get_user_id),
):
    analytics.track("feedback", {**payload.model_dump(), "user_id": user_id})
    return FeedbackResponse(ok=True)
