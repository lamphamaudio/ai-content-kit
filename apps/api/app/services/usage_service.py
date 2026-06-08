from datetime import date
from uuid import UUID

import psycopg
from fastapi import HTTPException, status

from app.core.config import settings
from app.core.security import LOCAL_DEMO_USER_ID


DEFAULT_LIMITS = {
    "product_analysis": 20,
    "content_kit": 20,
    "video_prompt": 10,
    "hooks": 20,
    "scripts": 20,
    "captions": 20,
    "calendar": 20,
}


class UsageService:
    def check_quota(self, user_id: str, generation_type: str = "content_kit") -> bool:
        if self._should_skip_database(user_id):
            return True

        quota = self._get_or_create_quota(user_id, generation_type)
        if quota["used_count"] >= quota["limit_count"]:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Quota exceeded for {generation_type}",
            )
        return True

    def record_usage(self, user_id: str, generation_type: str = "content_kit") -> None:
        if self._should_skip_database(user_id):
            return

        period_start, period_end = self._current_period()
        with psycopg.connect(settings.database_url, autocommit=True) as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    insert into public.usage_quotas (
                      user_id, plan, generation_type, period_start, period_end, limit_count, used_count
                    )
                    values (%s, 'free', %s, %s, %s, %s, 1)
                    on conflict (user_id, generation_type, period_start, period_end)
                    do update set
                      used_count = public.usage_quotas.used_count + 1,
                      updated_at = now()
                    """,
                    (user_id, generation_type, period_start, period_end, self._default_limit(generation_type)),
                )

    def get_usage_summary(self, user_id: str) -> dict:
        if self._should_skip_database(user_id):
            return {"plan": "free", "used": 0, "limit": 30}

        period_start, period_end = self._current_period()
        with psycopg.connect(settings.database_url) as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    select
                      coalesce(max(plan), 'free') as plan,
                      coalesce(sum(used_count), 0)::int as used,
                      coalesce(sum(limit_count), 0)::int as limit
                    from public.usage_quotas
                    where user_id = %s
                      and period_start = %s
                      and period_end = %s
                    """,
                    (user_id, period_start, period_end),
                )
                plan, used, limit = cursor.fetchone()
        return {"plan": plan, "used": used, "limit": limit or sum(DEFAULT_LIMITS.values())}

    def _get_or_create_quota(self, user_id: str, generation_type: str) -> dict:
        period_start, period_end = self._current_period()
        default_limit = self._default_limit(generation_type)
        with psycopg.connect(settings.database_url, autocommit=True) as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    insert into public.usage_quotas (
                      user_id, plan, generation_type, period_start, period_end, limit_count, used_count
                    )
                    values (%s, 'free', %s, %s, %s, %s, 0)
                    on conflict (user_id, generation_type, period_start, period_end)
                    do nothing
                    """,
                    (user_id, generation_type, period_start, period_end, default_limit),
                )
                cursor.execute(
                    """
                    select used_count, limit_count
                    from public.usage_quotas
                    where user_id = %s
                      and generation_type = %s
                      and period_start = %s
                      and period_end = %s
                    """,
                    (user_id, generation_type, period_start, period_end),
                )
                row = cursor.fetchone()
        return {"used_count": int(row[0]), "limit_count": int(row[1])}

    def _should_skip_database(self, user_id: str) -> bool:
        return user_id == LOCAL_DEMO_USER_ID or not settings.database_url or not self._is_uuid(user_id)

    def _default_limit(self, generation_type: str) -> int:
        return DEFAULT_LIMITS.get(generation_type, 20)

    def _current_period(self) -> tuple[date, date]:
        today = date.today()
        period_start = today.replace(day=1)
        if today.month == 12:
            period_end = today.replace(year=today.year + 1, month=1, day=1)
        else:
            period_end = today.replace(month=today.month + 1, day=1)
        return period_start, period_end

    def _is_uuid(self, value: str) -> bool:
        try:
            UUID(str(value))
        except ValueError:
            return False
        return True
