# Phase 3 - Supabase Foundation

## Mục Tiêu

Dùng Supabase Auth + Postgres + RLS làm nền tảng cho user, project history, generation history và quota.

## Scope Đã Làm

- Repo đã có migrations cho profiles, products, generations, generated_items, copy_events, usage_limits, feedbacks và RLS policies.
- Đã thêm migration mới chuẩn bị `projects`, `usage_quotas`, `assets`, `video_generations`, bucket `product-assets` và storage policies.
- Backend có optional Supabase Auth dependency: không có token thì dùng local demo, có Bearer token thì verify qua Supabase Auth `/auth/v1/user`.
- Frontend API client tự gắn Bearer token từ Supabase session nếu user đã đăng nhập.
- Login page hỗ trợ Supabase email OTP.
- `UsageService` đọc/ghi `usage_quotas` cho authenticated Supabase users và fallback local demo khi chưa login.
- Copy events và feedback có thể ghi vào Postgres cho authenticated Supabase users.
- Chưa apply migration mới lên database thật.

## Files/API/Schema Đã Thay Đổi

- `supabase/migrations/20260608032001_phase_foundation_assets_video_jobs.sql`
- `.env.example` thêm `SUPABASE_URL` và `SUPABASE_ANON_KEY` cho backend auth verification.
- `GET /api/usage/me`
- `POST /api/events/copy`
- `POST /api/feedback`
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
5. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
6. Login bằng email OTP ở `/login`.
7. Gọi Content Kit hoặc Video Prompt và kiểm tra API request có Bearer token.
8. Gọi `/api/usage/me` để kiểm tra quota user thật.

## Test Tự Động Đã Chạy

- `pytest apps/api/tests`
- `npm --workspace apps/web run build`
- Auth dependency tests cho local fallback và missing Supabase config.

## Quyết Định Kỹ Thuật

- Supabase Postgres là DB chính.
- RLS policy dùng `auth.uid()`, không dùng `user_metadata`.
- Storage path dùng `users/{user_id}/projects/{project_id}/{asset_id}-{file_name}`.
- Backend không tự tin token bằng decode local; token có Bearer sẽ được verify qua Supabase Auth API.
- Local demo mode vẫn hoạt động khi không có Authorization header.

## Rủi Ro Và Việc Còn Lại

- Migration mới chưa apply vào remote DB.
- Dashboard project/history vẫn là UI placeholder.
- `UsageService` cần transactional hardening nếu traffic song song cao.
