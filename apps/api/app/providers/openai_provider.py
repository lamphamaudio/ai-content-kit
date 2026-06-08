import json

from openai import AsyncOpenAI

from app.core.config import settings
from app.providers.base import AIProvider
from app.schemas.analysis import ProductAnalysisRequest, ProductAnalysisResponse
from app.schemas.generation import ContentKitResponse, GenerateRequest, GeneratedItem
from app.schemas.video_prompt import VideoPromptResponse


class OpenAIProvider(AIProvider):
    def __init__(self) -> None:
        if not settings.openai_api_key:
            raise RuntimeError("OPENAI_API_KEY is missing")
        self.client = AsyncOpenAI(api_key=settings.openai_api_key)

    async def generate(self, generation_type: str, prompt: str, payload: GenerateRequest) -> list[GeneratedItem]:
        response = await self.client.responses.create(
            model=settings.openai_model,
            instructions=(
                "You are a Vietnamese TikTok Shop content strategist. "
                "Return only valid JSON with an 'items' array of strings. "
                "Do not include markdown fences."
            ),
            input=prompt,
        )
        text = response.output_text.strip()
        try:
            data = json.loads(text)
            raw_items = data["items"]
        except (json.JSONDecodeError, KeyError, TypeError):
            raw_items = [text]

        return [
            GeneratedItem(id=f"openai-{generation_type}-{index}", kind=generation_type, content=str(content))
            for index, content in enumerate(raw_items, start=1)
        ]

    async def generate_content_kit(self, prompt: str, payload: GenerateRequest, prompt_version: str) -> ContentKitResponse:
        response = await self.client.responses.create(
            model=settings.openai_model,
            instructions=(
                "You are a senior Vietnamese TikTok Shop content strategist. "
                "Return only valid JSON matching the requested schema. "
                "Do not include markdown fences, comments, or extra prose."
            ),
            input=prompt,
            text={"format": {"type": "json_object"}},
        )
        text = response.output_text.strip()
        try:
            data = json.loads(text)
        except json.JSONDecodeError as exc:
            raise RuntimeError("OpenAI returned invalid JSON for content kit") from exc
        data = self._normalize_content_kit(data)
        return ContentKitResponse(prompt_version=prompt_version, **data)

    async def generate_video_prompts(
        self,
        prompt: str,
        payload: GenerateRequest,
        prompt_version: str,
    ) -> VideoPromptResponse:
        response = await self.client.responses.create(
            model=settings.openai_model,
            instructions=(
                "You are a senior Vietnamese TikTok Shop affiliate video strategist "
                "and AI video prompt engineer. Return only valid JSON matching the "
                "requested video prompt schema. Do not include markdown fences, "
                "comments, or extra prose."
            ),
            input=prompt,
            text={"format": {"type": "json_object"}},
        )
        text = response.output_text.strip()
        try:
            data = json.loads(text)
        except json.JSONDecodeError as exc:
            raise RuntimeError("OpenAI returned invalid JSON for video prompts") from exc

        data = self._normalize_video_prompts(data, payload)
        return VideoPromptResponse(prompt_version=prompt_version, **data)

    async def analyze_product(self, prompt: str, payload: ProductAnalysisRequest | GenerateRequest) -> ProductAnalysisResponse:
        response = await self.client.responses.create(
            model=settings.openai_model,
            instructions=(
                "You are a Vietnamese TikTok Shop affiliate strategist. "
                "Return only valid JSON matching the requested product analysis schema. "
                "Do not include markdown fences, comments, or extra prose."
            ),
            input=prompt,
            text={"format": {"type": "json_object"}},
        )
        text = response.output_text.strip()
        try:
            data = json.loads(text)
        except json.JSONDecodeError as exc:
            raise RuntimeError("OpenAI returned invalid JSON for product analysis") from exc
        data = self._normalize_product_analysis(data)
        return ProductAnalysisResponse(**data)

    def _normalize_product_analysis(self, data: dict) -> dict:
        list_fields = [
            "main_pain_points",
            "buying_triggers",
            "content_angles",
            "risk_claims",
            "recommended_video_styles",
            "compliance_notes",
        ]
        for key in list_fields:
            value = data.get(key)
            if value is None:
                data[key] = []
            elif isinstance(value, list):
                data[key] = [str(item) for item in value if item is not None]
            else:
                data[key] = [str(value)]
        return data

    def _normalize_content_kit(self, data: dict) -> dict:
        id_prefixes = {
            "angles": "angle",
            "hooks": "hook",
            "scripts": "script",
            "captions": "caption",
            "calendar": "day",
        }
        for key, prefix in id_prefixes.items():
            items = data.get(key) or []
            if not isinstance(items, list):
                data[key] = []
                continue
            for index, item in enumerate(items, start=1):
                if isinstance(item, dict) and not item.get("id"):
                    item["id"] = f"{prefix}-{index}"
        return data

    def _normalize_video_prompts(self, data: dict, payload: GenerateRequest | None = None) -> dict:
        if not isinstance(data, dict):
            data = {}

        video_brief = data.get("video_brief")
        if not isinstance(video_brief, dict):
            video_brief = {}

        duration = video_brief.get("duration_seconds")
        if duration is None and payload is not None:
            duration = payload.duration_seconds
        try:
            duration_seconds = int(duration or 30)
        except (TypeError, ValueError):
            duration_seconds = 30

        data["video_brief"] = {
            "goal": str(video_brief.get("goal") or "affiliate conversion"),
            "platform": str(video_brief.get("platform") or getattr(payload, "platform", None) or "tiktok"),
            "duration_seconds": duration_seconds,
            "style": str(video_brief.get("style") or getattr(payload, "video_style", None) or "UGC review"),
            "aspect_ratio": str(video_brief.get("aspect_ratio") or getattr(payload, "aspect_ratio", None) or "9:16"),
        }

        list_fields = ["text_overlays", "hashtags", "compliance_warnings"]
        for key in list_fields:
            value = data.get(key)
            if isinstance(value, list):
                data[key] = [str(item) for item in value if item is not None]
            elif value is None:
                data[key] = []
            else:
                data[key] = [str(value)]

        shot_list = data.get("shot_list")
        if not isinstance(shot_list, list):
            data["shot_list"] = []
        else:
            normalized_shots = []
            for item in shot_list:
                if not isinstance(item, dict):
                    continue
                normalized_shots.append(
                    {
                        "time": str(item.get("time") or ""),
                        "scene": str(item.get("scene") or ""),
                        "camera": str(item.get("camera") or ""),
                        "motion": str(item.get("motion") or ""),
                        "text_overlay": str(item.get("text_overlay") or ""),
                        "visual_notes": str(item.get("visual_notes") or ""),
                    }
                )
            data["shot_list"] = normalized_shots

        string_fields = [
            "voiceover",
            "kling_prompt",
            "pika_prompt",
            "runway_prompt",
            "capcut_brief",
            "negative_prompt",
            "caption",
        ]
        for key in string_fields:
            data[key] = str(data.get(key) or "")

        return data
