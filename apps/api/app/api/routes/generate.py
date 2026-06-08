from fastapi import APIRouter, Depends

from app.api.deps import get_ai_service, get_prompt_service, get_usage_service, get_user_id
from app.schemas.generation import ContentKitRequest, ContentKitResponse, GenerateRequest, GenerateResponse
from app.schemas.video_prompt import VideoPromptRequest, VideoPromptResponse
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
    usage.check_quota(user_id=payload.user_id, generation_type=generation_type)
    prompt = prompts.build_prompt(generation_type, payload)
    output = await ai.generate(generation_type=generation_type, prompt=prompt, payload=payload)
    usage.record_usage(user_id=payload.user_id, generation_type=generation_type)
    return GenerateResponse(type=generation_type, prompt_version=prompts.version, items=output)


@router.post("/hooks", response_model=GenerateResponse)
async def hooks(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service), user_id: str = Depends(get_user_id)):
    payload = payload.model_copy(update={"user_id": user_id})
    return await run_generation("hooks", payload, ai, prompts, usage)


@router.post("/scripts", response_model=GenerateResponse)
async def scripts(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service), user_id: str = Depends(get_user_id)):
    payload = payload.model_copy(update={"user_id": user_id})
    return await run_generation("scripts", payload, ai, prompts, usage)


@router.post("/captions", response_model=GenerateResponse)
async def captions(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service), user_id: str = Depends(get_user_id)):
    payload = payload.model_copy(update={"user_id": user_id})
    return await run_generation("captions", payload, ai, prompts, usage)


@router.post("/calendar", response_model=GenerateResponse)
async def calendar(payload: GenerateRequest, ai: AIService = Depends(get_ai_service), prompts: PromptService = Depends(get_prompt_service), usage: UsageService = Depends(get_usage_service), user_id: str = Depends(get_user_id)):
    payload = payload.model_copy(update={"user_id": user_id})
    return await run_generation("calendar", payload, ai, prompts, usage)


@router.post("/content-kit", response_model=ContentKitResponse)
async def content_kit(
    payload: ContentKitRequest,
    ai: AIService = Depends(get_ai_service),
    prompts: PromptService = Depends(get_prompt_service),
    usage: UsageService = Depends(get_usage_service),
    user_id: str = Depends(get_user_id),
):
    payload = payload.model_copy(update={"user_id": user_id})
    usage.check_quota(user_id=payload.user_id, generation_type="content_kit")
    analysis_prompt = prompts.build_product_analysis_prompt(payload)
    analysis = await ai.analyze_product(prompt=analysis_prompt, payload=payload)
    prompt = prompts.build_content_kit_prompt(payload, analysis)
    content_kit = await ai.generate_content_kit(prompt=prompt, payload=payload, prompt_version=prompts.version)
    content_kit.analysis = analysis
    usage.record_usage(user_id=payload.user_id, generation_type="content_kit")
    return content_kit


@router.post("/video-prompts", response_model=VideoPromptResponse)
async def video_prompts(
    payload: VideoPromptRequest,
    ai: AIService = Depends(get_ai_service),
    prompts: PromptService = Depends(get_prompt_service),
    usage: UsageService = Depends(get_usage_service),
    user_id: str = Depends(get_user_id),
):
    payload = payload.model_copy(update={"user_id": user_id})
    usage.check_quota(user_id=payload.user_id, generation_type="video_prompt")
    analysis_prompt = prompts.build_product_analysis_prompt(payload)
    analysis = await ai.analyze_product(prompt=analysis_prompt, payload=payload)
    video_prompt = prompts.build_video_prompt_kit_prompt(payload, analysis)
    result = await ai.generate_video_prompts(
        prompt=video_prompt,
        payload=payload,
        prompt_version=prompts.version,
    )
    result.analysis = analysis
    usage.record_usage(user_id=payload.user_id, generation_type="video_prompt")
    return result
