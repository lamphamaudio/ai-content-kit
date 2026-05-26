from fastapi import APIRouter, Depends

from app.api.deps import get_analytics_service
from app.schemas.feedback import FeedbackRequest, FeedbackResponse
from app.services.analytics_service import AnalyticsService

router = APIRouter()


@router.post("", response_model=FeedbackResponse)
@router.post("/", response_model=FeedbackResponse)
def submit_feedback(payload: FeedbackRequest, analytics: AnalyticsService = Depends(get_analytics_service)):
    analytics.track("feedback", payload.model_dump())
    return FeedbackResponse(ok=True)

