from fastapi import APIRouter, Depends

from app.api.deps import get_ai_service, get_prompt_service, get_usage_service
from app.schemas.generation import ContentKitRequest, ContentKitResponse, GenerateRequest, GenerateResponse
from app.services.ai_service import AIService
from app.services.prompt_service import PromptService
from app.services.usage_service import UsageService

router = APIRouter()


async def run_generation(
    generation_type: str,
    payload: GenerateRequest,
    ai: AIService,
    prompts: PromptService,
    usage: UsageService,
) -> GenerateResponse:
    usage.check_quota(user_id=payload.user_id)
    prompt = prompts.build_prompt(generation_type, payload)
    output = await ai.generate(generation_type=generation_type, prompt=prompt, payload=payload)
    return GenerateResponse(type=generation_type, prompt_version=prompts.version, items=output)


@router.post("/hooks", response_model=GenerateResponse)
async def hooks(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service)):
    return await run_generation("hooks", payload, ai, prompts, usage)


@router.post("/scripts", response_model=GenerateResponse)
async def scripts(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service)):
    return await run_generation("scripts", payload, ai, prompts, usage)


@router.post("/captions", response_model=GenerateResponse)
async def captions(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service)):
    return await run_generation("captions", payload, ai, prompts, usage)


@router.post("/calendar", response_model=GenerateResponse)
async def calendar(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service)):
    return await run_generation("calendar", payload, ai, prompts, usage)


@router.post("/content-kit", response_model=ContentKitResponse)
async def content_kit(
    payload: ContentKitRequest,
    ai: AIService = Depends(get_ai_service),
    prompts: PromptService = Depends(get_prompt_service),
    usage: UsageService = Depends(get_usage_service),
):
    usage.check_quota(user_id=payload.user_id)
    analysis_prompt = prompts.build_product_analysis_prompt(payload)
    analysis = await ai.analyze_product(prompt=analysis_prompt, payload=payload)
    prompt = prompts.build_content_kit_prompt(payload, analysis)
    content_kit = await ai.generate_content_kit(prompt=prompt, payload=payload, prompt_version=prompts.version)
    content_kit.analysis = analysis
    return content_kit
