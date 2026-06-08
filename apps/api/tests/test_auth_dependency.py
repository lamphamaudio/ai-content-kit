from fastapi.testclient import TestClient

from app.core.config import settings
from app.main import app


def test_usage_endpoint_allows_local_demo_without_authorization():
    client = TestClient(app)
    response = client.get("/api/usage/me")

    assert response.status_code == 200
    assert response.json() == {"plan": "free", "used": 0, "limit": 30}


def test_usage_endpoint_rejects_bearer_token_when_supabase_auth_is_not_configured(monkeypatch):
    monkeypatch.setattr(settings, "supabase_url", None)
    monkeypatch.setattr(settings, "supabase_anon_key", None)
    monkeypatch.setattr(settings, "next_public_supabase_url", None)
    monkeypatch.setattr(settings, "next_public_supabase_anon_key", None)

    client = TestClient(app)
    response = client.get("/api/usage/me", headers={"Authorization": "Bearer fake-token"})

    assert response.status_code == 401
