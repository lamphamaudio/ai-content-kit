from abc import ABC, abstractmethod

from app.schemas.analysis import ProductAnalysisResponse
from app.schemas.generation import GenerateRequest, GeneratedItem


class AIProvider(ABC):
    @abstractmethod
    async def generate(self, generation_type: str, prompt: str, payload: GenerateRequest) -> list[GeneratedItem]:
        raise NotImplementedError

    @abstractmethod
    async def analyze_product(self, prompt: str, payload: GenerateRequest) -> ProductAnalysisResponse:
        raise NotImplementedError
