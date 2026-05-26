from fastapi.testclient import TestClient

from app.main import app


def test_copy_event():
    client = TestClient(app)
    response = client.post(
        "/api/events/copy",
        json={"generated_item_id": "item-1", "content_type": "hook"},
    )
    assert response.status_code == 200
    assert response.json() == {"ok": True}

