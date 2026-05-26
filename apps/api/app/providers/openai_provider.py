import json

from openai import AsyncOpenAI

from app.core.config import settings
from app.providers.base import AIProvider
from app.schemas.generation import ContentKitResponse, GenerateRequest, GeneratedItem


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
        data = json.loads(text)
        return ContentKitResponse(prompt_version=prompt_version, **data)
