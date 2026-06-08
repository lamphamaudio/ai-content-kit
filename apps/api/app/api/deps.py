from fastapi import Request

from app.core.security import UserContext, get_current_user, get_current_user_id
from app.services.ai_service import AIService
from app.services.analytics_service import AnalyticsService
from app.services.prompt_service import PromptService
from app.services.usage_service import UsageService


async def get_user(request: Request) -> UserContext:
    return await get_current_user(request)


async def get_user_id(request: Request) -> str:
    return await get_current_user_id(request)


def get_ai_service() -> AIService:
    return AIService()


def get_prompt_service() -> PromptService:
    return PromptService()


def get_usage_service() -> UsageService:
    return UsageService()


def get_analytics_service() -> AnalyticsService:
    return AnalyticsService()
