from app.services.usage_service import UsageService


def test_usage_placeholder_allows_demo_user():
    assert UsageService().check_quota("demo")


def test_usage_summary_allows_local_demo_user():
    assert UsageService().get_usage_summary("local-demo-user") == {"plan": "free", "used": 0, "limit": 30}
