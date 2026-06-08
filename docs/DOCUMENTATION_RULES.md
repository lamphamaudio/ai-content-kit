# Documentation Rules

File này định nghĩa cách ghi tài liệu sau mỗi phase hoặc feature đáng kể của `ai-content-kit`.

## Luật chính

Mỗi khi hoàn thành một phase hoặc một phần đáng kể, bắt buộc tạo file Markdown riêng trong `docs/`. Roadmap chỉ giữ định hướng và thứ tự ưu tiên, không chứa toàn bộ chi tiết triển khai.

## Cấu trúc file

Phase-level docs:

```text
docs/phases/phase-01-content-kit.md
docs/phases/phase-02-product-analysis-compliance.md
docs/phases/phase-03-supabase-foundation.md
docs/phases/phase-04-asset-upload.md
docs/phases/phase-05-video-prompt-kit.md
docs/phases/phase-06-video-generation-pilot.md
docs/phases/phase-07-monetization-scale.md
```

Feature-level docs:

```text
docs/features/supabase-auth.md
docs/features/usage-quota.md
docs/features/openai-structured-outputs.md
docs/features/video-prompt-schema.md
docs/features/compliance-agent.md
```

## Template

Mỗi file hoàn thành nên có các section sau:

```md
# Title

## Mục Tiêu

## Scope Đã Làm

## Files/API/Schema Đã Thay Đổi

## Payload Và Response Mẫu

## Cách Test Thủ Công

## Test Tự Động Đã Chạy

## Quyết Định Kỹ Thuật

## Rủi Ro Và Việc Còn Lại
```

## Khi Nào Cần Viết File Riêng

```text
- Hoàn thành một phase.
- Hoàn thành một endpoint quan trọng.
- Thêm hoặc đổi schema database.
- Thêm prompt/schema AI mới.
- Thêm flow frontend mới.
- Thêm Supabase Auth/Storage/RLS.
- Thêm compliance logic.
- Thêm video prompt hoặc video generation workflow.
```

## Nguyên Tắc

```text
- Viết ngắn, rõ, có ví dụ payload/response khi liên quan API.
- Ghi rõ test đã chạy, không ghi chung chung là "đã test".
- Ghi rõ rủi ro còn lại để phase sau không phải đoán.
- Không trộn nhiều phase lớn vào một file.
```
