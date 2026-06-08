# Usage Quota

## Mục Tiêu

Enforce quota theo user và generation type trước khi gọi AI/video provider.

## Scope Đã Làm

- Existing `usage_limits` hỗ trợ copy quota placeholder.
- Migration mới thêm `usage_quotas` theo `generation_type`.
- `UsageService` runtime vẫn là placeholder.

## Files/API/Schema Đã Thay Đổi

- `usage_limits`
- `usage_quotas`

## Payload Và Response Mẫu

Không có API mới.

## Cách Test Thủ Công

Sau khi implement runtime, tạo quota thấp và verify request vượt quota bị chặn.

## Test Tự Động Đã Chạy

- Existing `test_usage_limits.py` chỉ cover placeholder.

## Quyết Định Kỹ Thuật

- Quota phải chạy trước AI/video provider calls.

## Rủi Ro Và Việc Còn Lại

- Cần transactional increment để tránh race condition khi có nhiều request.
