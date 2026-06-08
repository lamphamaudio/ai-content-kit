# Usage Quota

## Mục Tiêu

Enforce quota theo user và generation type trước khi gọi AI/video provider.

## Scope Đã Làm

- Existing `usage_limits` hỗ trợ copy quota placeholder.
- Migration mới thêm `usage_quotas` theo `generation_type`.
- `UsageService` có runtime đọc/ghi `usage_quotas` cho authenticated Supabase users.
- Local demo/non-UUID users vẫn được phép chạy không chạm database.
- `check_quota` chạy trước generation.
- `record_usage` chạy sau generation thành công.
- `/api/usage/me` trả summary từ database nếu có user thật.

## Files/API/Schema Đã Thay Đổi

- `usage_limits`
- `usage_quotas`

## Payload Và Response Mẫu

Không có API mới.

## Cách Test Thủ Công

1. Apply migration `usage_quotas`.
2. Login bằng Supabase user.
3. Tạo Content Kit hoặc Video Prompt.
4. Gọi `/api/usage/me` và verify used count tăng.
5. Tạo quota thấp và verify request vượt quota bị chặn bằng HTTP 429.

## Test Tự Động Đã Chạy

- `test_usage_placeholder_allows_demo_user`
- `test_usage_summary_allows_local_demo_user`
- Backend suite: `pytest apps/api/tests`

## Quyết Định Kỹ Thuật

- Quota phải chạy trước AI/video provider calls.
- Demo local không được phụ thuộc bảng remote.

## Rủi Ro Và Việc Còn Lại

- Cần transactional hardening để tránh race condition khi có nhiều request song song.
- Cần plan-based quota seed/update logic.
