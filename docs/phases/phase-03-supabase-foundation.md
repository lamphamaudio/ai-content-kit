# Phase 3 - Supabase Foundation

## Mục Tiêu

Dùng Supabase Auth + Postgres + RLS làm nền tảng cho user, project history, generation history và quota.

## Scope Đã Làm

- Repo đã có migrations cho profiles, products, generations, generated_items, copy_events, usage_limits, feedbacks và RLS policies.
- Đã thêm migration mới chuẩn bị `projects`, `usage_quotas`, `assets`, `video_generations`, bucket `product-assets` và storage policies.
- Chưa apply migration mới lên database thật.

## Files/API/Schema Đã Thay Đổi

- `supabase/migrations/20260608032001_phase_foundation_assets_video_jobs.sql`
- `projects`
- `usage_quotas`
- `assets`
- `video_generations`

## Payload Và Response Mẫu

Không có API public mới trong phase scaffold này.

## Cách Test Thủ Công

1. Xác nhận `DATABASE_URL` trỏ đúng project Supabase.
2. Review migration SQL.
3. Apply migration trong môi trường đã xác nhận.
4. Test RLS bằng hai user khác nhau.

## Test Tự Động Đã Chạy

- `pytest apps/api/tests`
- `npm --workspace apps/web run build`

## Quyết Định Kỹ Thuật

- Supabase Postgres là DB chính.
- RLS policy dùng `auth.uid()`, không dùng `user_metadata`.
- Storage path dùng `users/{user_id}/projects/{project_id}/{asset_id}-{file_name}`.

## Rủi Ro Và Việc Còn Lại

- `UsageService` vẫn cần đọc quota thật từ Postgres.
- Backend auth dependency vẫn cần xác thực JWT Supabase ở Phase 3 implementation tiếp theo.
