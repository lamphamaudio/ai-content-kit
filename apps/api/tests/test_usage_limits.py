from app.services.usage_service import UsageService


def test_usage_placeholder_allows_demo_user():
    assert UsageService().check_quota("demo")

