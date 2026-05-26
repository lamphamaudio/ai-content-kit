from fastapi.testclient import TestClient

from app.api.deps import get_ai_service
from app.main import app
from app.schemas.generation import GeneratedItem


class FakeAIService:
    async def generate(self, generation_type, prompt, payload):
        return [GeneratedItem(id="test-item-1", kind=generation_type, content="Test hook")]


def test_generate_hooks_returns_items():
    app.dependency_overrides[get_ai_service] = lambda: FakeAIService()
    client = TestClient(app)
    response = client.post(
        "/api/generate/hooks",
        json={"product_name": "Serum vitamin C", "category": "beauty"},
    )
    app.dependency_overrides.clear()
    assert response.status_code == 200
    assert response.json()["items"]
