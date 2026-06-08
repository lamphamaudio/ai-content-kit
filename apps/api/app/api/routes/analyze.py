from fastapi import APIRouter, Depends

from app.api.deps import get_ai_service, get_prompt_service, get_usage_service
from app.schemas.analysis import ProductAnalysisRequest, ProductAnalysisResponse
from app.services.ai_service import AIService
from app.services.prompt_service import PromptService
from app.services.usage_service import UsageService

router = APIRouter()


@router.post("/product", response_model=ProductAnalysisResponse)
async def analyze_product(
    payload: ProductAnalysisRequest,
    ai: AIService = Depends(get_ai_service),
    prompts: PromptService = Depends(get_prompt_service),
    usage: UsageService = Depends(get_usage_service),
):
    usage.check_quota(user_id=payload.user_id)
    prompt = prompts.build_product_analysis_prompt(payload)
    return await ai.analyze_product(prompt=prompt, payload=payload)
