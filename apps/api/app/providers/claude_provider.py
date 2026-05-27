from app.providers.base import AIProvider
from app.schemas.analysis import ProductAnalysisResponse
from app.schemas.generation import GenerateRequest, GeneratedItem


class ClaudeProvider(AIProvider):
    async def generate(self, generation_type: str, prompt: str, payload: GenerateRequest) -> list[GeneratedItem]:
        return [GeneratedItem(id="mock-claude-1", kind=generation_type, content=f"[Claude placeholder] {prompt[:120]}")]

    async def analyze_product(self, prompt: str, payload: GenerateRequest) -> ProductAnalysisResponse:
        raise NotImplementedError("Product analysis is only implemented for OpenAIProvider")
