# Supabase Auth

## Mục Tiêu

Dùng Supabase Auth làm nguồn user identity cho app.

## Scope Đã Làm

- Frontend đã có Supabase client placeholder.
- Migrations hiện dùng `auth.users(id)` cho user-owned tables.
- Backend có optional Supabase auth dependency.
- Có Bearer token thì backend verify session qua Supabase Auth `/auth/v1/user`.
- Không có token thì backend dùng local demo user để giữ MVP/demo flow.
- Frontend API client tự gắn access token từ Supabase session.
- `/login` hỗ trợ email OTP bằng Supabase Auth.

## Files/API/Schema Đã Thay Đổi

- `profiles`
- `projects`
- `assets`
- `video_generations`

## Payload Và Response Mẫu

Không có API auth custom.

## Cách Test Thủ Công

1. Set Supabase env vars ở frontend và backend.
2. Vào `/login`, nhập email và dùng magic link.
3. Tạo Content Kit hoặc Video Prompt.
4. Kiểm tra backend nhận Bearer token và ghi usage cho user thật.
5. Verify user chỉ xem dữ liệu của mình sau khi migration/RLS được apply.

## Test Tự Động Đã Chạy

- `test_usage_endpoint_allows_local_demo_without_authorization`
- `test_usage_endpoint_rejects_bearer_token_when_supabase_auth_is_not_configured`

## Quyết Định Kỹ Thuật

- Không dùng `user_metadata` cho authorization.
- RLS dùng `auth.uid()`.
- Backend verify Bearer token qua Supabase Auth API thay vì tự decode thiếu kiểm chứng.
- Local demo fallback chỉ áp dụng khi không có Authorization header.

## Rủi Ro Và Việc Còn Lại

- Cần integration test với Supabase project thật hoặc local Supabase.
- Cần dashboard authenticated state.
