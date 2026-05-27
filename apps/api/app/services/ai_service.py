from app.core.config import settings
from app.providers.openai_provider import OpenAIProvider
from app.schemas.analysis import ProductAnalysisResponse
from app.schemas.generation import ContentKitResponse, GenerateRequest, GeneratedItem


class AIService:
    def __init__(self) -> None:
        self.provider = self._provider()

    def _provider(self):
        if settings.ai_provider == "openai" and settings.openai_api_key:
            return OpenAIProvider()
        raise RuntimeError("No real AI provider configured. Set AI_PROVIDER=openai and OPENAI_API_KEY.")

    async def generate(self, generation_type: str, prompt: str, payload: GenerateRequest) -> list[GeneratedItem]:
        return await self.provider.generate(generation_type, prompt, payload)

    async def generate_content_kit(self, prompt: str, payload: GenerateRequest, prompt_version: str) -> ContentKitResponse:
        return await self.provider.generate_content_kit(prompt, payload, prompt_version)

    async def analyze_product(self, prompt: str, payload: GenerateRequest) -> ProductAnalysisResponse:
        return await self.provider.analyze_product(prompt, payload)
