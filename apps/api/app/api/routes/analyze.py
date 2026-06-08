from fastapi import APIRouter, Depends

from app.api.deps import get_ai_service, get_prompt_service, get_usage_service, get_user_id
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
    user_id: str = Depends(get_user_id),
):
    payload = payload.model_copy(update={"user_id": user_id})
    usage.check_quota(user_id=payload.user_id, generation_type="product_analysis")
    prompt = prompts.build_product_analysis_prompt(payload)
    result = await ai.analyze_product(prompt=prompt, payload=payload)
    usage.record_usage(user_id=payload.user_id, generation_type="product_analysis")
    return result
