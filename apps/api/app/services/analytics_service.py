from uuid import UUID

import psycopg

from app.core.config import settings
from app.core.security import LOCAL_DEMO_USER_ID


class AnalyticsService:
    def track(self, event_name: str, properties: dict) -> None:
        user_id = properties.get("user_id")
        if not user_id or user_id == LOCAL_DEMO_USER_ID or not settings.database_url:
            return None

        if event_name == "copy_event":
            self._track_copy_event(user_id, properties)
        elif event_name == "feedback":
            self._track_feedback(user_id, properties)
        return None

    def _track_copy_event(self, user_id: str, properties: dict) -> None:
        with psycopg.connect(settings.database_url, autocommit=True) as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    insert into public.copy_events (
                      user_id, product_id, generation_id, generated_item_id, content_type
                    )
                    values (%s, %s, %s, %s, %s)
                    """,
                    (
                        user_id,
                        self._uuid_or_none(properties.get("product_id")),
                        self._uuid_or_none(properties.get("generation_id")),
                        self._uuid_or_none(properties.get("generated_item_id")),
                        properties.get("content_type") or "unknown",
                    ),
                )

    def _track_feedback(self, user_id: str, properties: dict) -> None:
        with psycopg.connect(settings.database_url, autocommit=True) as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    insert into public.feedbacks (
                      user_id, generated_item_id, rating, comment
                    )
                    values (%s, %s, %s, %s)
                    """,
                    (
                        user_id,
                        self._uuid_or_none(properties.get("generated_item_id")),
                        properties.get("rating"),
                        properties.get("comment"),
                    ),
                )

    def _uuid_or_none(self, value: str | None) -> str | None:
        if not value:
            return None
        try:
            return str(UUID(str(value)))
        except ValueError:
            return None
