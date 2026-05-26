from app.providers.base import AIProvider
from app.schemas.generation import GenerateRequest, GeneratedItem


class GeminiProvider(AIProvider):
    async def generate(self, generation_type: str, prompt: str, payload: GenerateRequest) -> list[GeneratedItem]:
        return [GeneratedItem(id="mock-gemini-1", kind=generation_type, content=f"[Gemini placeholder] {prompt[:120]}")]

