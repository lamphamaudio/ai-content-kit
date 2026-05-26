from app.core.security import get_current_user_id
from app.services.ai_service import AIService
from app.services.analytics_service import AnalyticsService
from app.services.prompt_service import PromptService
from app.services.usage_service import UsageService


def get_user_id() -> str:
    return get_current_user_id()


def get_ai_service() -> AIService:
    return AIService()


def get_prompt_service() -> PromptService:
    return PromptService()


def get_usage_service() -> UsageService:
    return UsageService()


def get_analytics_service() -> AnalyticsService:
    return AnalyticsService()

