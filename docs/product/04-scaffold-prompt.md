# Prompt để AI/code agent hoàn thiện cấu trúc thư mục

Dùng prompt này với Cursor, Windsurf, Claude Code, Codex hoặc một coding agent khác để scaffold project.

---

## Prompt chính

```text
Bạn là senior full-stack engineer. Hãy tạo cấu trúc project monorepo cho app "AI Content Kit cho TikTok Shop & Affiliate Việt Nam".

Mục tiêu sản phẩm:
- Web app giúp seller/affiliate TikTok Shop tạo hook, script, caption, hashtag và lịch đăng từ một sản phẩm.
- MVP tập trung vào: product input, generate hook, generate script, generate caption, calendar 7 ngày, save project, copy tracking, feedback, quota.
- North Star Metric: Weekly Copied Content Items.

Tech stack bắt buộc:
- Monorepo 1 repo.
- Frontend: Next.js + TypeScript + Tailwind CSS + shadcn/ui.
- Backend: Python + FastAPI.
- Database/Auth: Supabase PostgreSQL + Supabase Auth.
- AI Provider: tạo abstraction để hỗ trợ Gemini/OpenAI/Claude, chưa hardcode chặt một provider.
- Deploy mapping:
  - apps/web deploy Vercel.
  - apps/api deploy Render/Fly/Railway.
  - Supabase quản lý DB/Auth.

Hãy tạo cấu trúc thư mục như sau:

ai-content-kit/
  apps/
    web/
    api/
  packages/
    shared/
  docs/
  scripts/
  supabase/
  docker-compose.yml
  README.md
  .gitignore
  .env.example

Frontend apps/web cần có:
- Next.js App Router.
- Các route:
  - /
  - /login
  - /dashboard
  - /pricing
  - /products/new
  - /products/[id]
  - /products/[id]/generate
  - /settings
- Components:
  - product-form.tsx
  - output-card.tsx
  - copy-button.tsx
  - regenerate-button.tsx
  - feedback-button.tsx
  - quota-badge.tsx
  - upgrade-modal.tsx
  - pricing-card.tsx
- Lib:
  - api-client.ts
  - supabase-client.ts
  - analytics.ts
  - auth.ts
  - utils.ts
- Hooks:
  - use-auth.ts
  - use-products.ts
  - use-generation.ts
  - use-copy-event.ts
- Types:
  - product.ts
  - generation.ts
  - pricing.ts

Backend apps/api cần có:
- FastAPI app.
- app/main.py
- core:
  - config.py
  - security.py
  - errors.py
- api:
  - deps.py
  - routes/health.py
  - routes/auth.py
  - routes/products.py
  - routes/generate.py
  - routes/feedback.py
  - routes/usage.py
  - routes/events.py
- services:
  - ai_service.py
  - prompt_service.py
  - usage_service.py
  - product_service.py
  - analytics_service.py
  - policy_check_service.py
- providers:
  - base.py
  - openai_provider.py
  - gemini_provider.py
  - claude_provider.py
- prompts:
  - hooks.py
  - scripts.py
  - captions.py
  - calendar.py
  - safety.py
  - versions.py
- models:
  - product.py
  - generation.py
  - generated_item.py
  - feedback.py
  - profile.py
  - usage_limit.py
- schemas:
  - product.py
  - generation.py
  - feedback.py
  - usage.py
  - events.py
- db:
  - session.py
  - migrations/
- workers:
  - tasks.py
- tests:
  - test_generate_hooks.py
  - test_usage_limits.py
  - test_copy_events.py

Supabase folder cần có:
- migrations:
  - 001_create_profiles.sql
  - 002_create_products.sql
  - 003_create_generations.sql
  - 004_create_generated_items.sql
  - 005_create_copy_events.sql
  - 006_create_usage_limits.sql
  - 007_create_feedbacks.sql
  - 008_rls_policies.sql
- seed:
  - categories.sql
  - prompt_templates.sql

Yêu cầu backend:
1. Tạo endpoint health check: GET /health.
2. Tạo endpoint generate hooks: POST /api/generate/hooks.
3. Tạo endpoint generate scripts: POST /api/generate/scripts.
4. Tạo endpoint generate captions: POST /api/generate/captions.
5. Tạo endpoint generate calendar: POST /api/generate/calendar.
6. Tạo endpoint track copy event: POST /api/events/copy.
7. Tạo endpoint submit feedback: POST /api/feedback.
8. Dùng Pydantic schemas cho request/response.
9. Có service AIProvider abstraction.
10. Có placeholder provider cho Gemini/OpenAI/Claude.
11. Có UsageService để check quota placeholder.
12. Có PromptService để build prompt theo prompt_version.
13. Có AnalyticsService để log event placeholder.

Yêu cầu frontend:
1. Landing page có form demo nhập sản phẩm.
2. ProductForm component nhận:
   - productName
   - category
   - price
   - targetAudience
   - keyBenefits
   - tone
3. OutputCard hiển thị content generated, có nút copy, save, feedback.
4. CopyButton khi click phải gọi API /api/events/copy.
5. Pricing page hiển thị 4 gói:
   - Free
   - Starter
   - Pro
   - Team
6. Dashboard hiển thị placeholder:
   - projects
   - quota
   - recent generations
7. Dùng api-client.ts để gọi FastAPI backend.
8. Dùng supabase-client.ts cho Supabase Auth placeholder.

Yêu cầu database:
Tạo SQL migrations cho các bảng:
- profiles
- products
- generations
- generated_items
- copy_events
- usage_limits
- feedbacks

Bảng copy_events rất quan trọng vì North Star Metric là Weekly Copied Content Items.

Yêu cầu docs:
Tạo docs:
- docs/metrics.md
- docs/pricing.md
- docs/folder-structure.md
- docs/api-contract.md
- docs/database-schema.md
- docs/prompt-engine.md
- docs/deployment.md
- docs/roadmap.md

Yêu cầu chất lượng:
- Code rõ ràng, dễ mở rộng.
- Không hardcode API key.
- Tạo .env.example ở root.
- Không implement payment thật ở MVP, chỉ để placeholder manual payment.
- Không cần làm UI quá đẹp, nhưng phải có layout sạch bằng Tailwind.
- Không cần gọi AI thật ngay nếu thiếu API key, có thể tạo mock output fallback.
- Nhưng cấu trúc phải sẵn sàng để cắm API key thật.

Sau khi scaffold xong, hãy in ra:
1. Cây thư mục đã tạo.
2. Cách chạy frontend local.
3. Cách chạy backend local.
4. Các biến môi trường cần điền.
5. Next steps để kết nối Supabase và AI provider thật.
```

---

## Prompt bổ sung: tạo database migrations

Dùng prompt này nếu muốn agent chỉ tập trung tạo SQL.

```text
Hãy tạo toàn bộ Supabase/PostgreSQL migration SQL cho app AI Content Kit.

Các bảng cần có:
1. profiles
2. products
3. generations
4. generated_items
5. copy_events
6. usage_limits
7. feedbacks

Yêu cầu:
- Dùng uuid primary key default gen_random_uuid() cho các bảng nghiệp vụ.
- user_id references auth.users(id).
- Bật Row Level Security cho các bảng có user_id.
- Tạo policy để user chỉ đọc/ghi dữ liệu của chính họ.
- Bảng profiles id references auth.users(id).
- Bảng generations lưu:
  - type
  - prompt_version
  - input jsonb
  - output jsonb
  - model
  - token_input
  - token_output
  - cost_usd
- Bảng generated_items lưu từng hook/script/caption riêng để track copy/save.
- Bảng copy_events dùng để đo Weekly Copied Content Items.
- Tạo index cho user_id, product_id, created_at.
- Tạo file 008_rls_policies.sql riêng cho RLS policies.
```

---

## Prompt bổ sung: tạo FastAPI backend skeleton

```text
Hãy tạo backend FastAPI skeleton cho app AI Content Kit.

Yêu cầu:
- app/main.py khởi tạo FastAPI app.
- Có CORS config cho frontend localhost:3000.
- Có route GET /health.
- Có router /api/generate với endpoints:
  - POST /hooks
  - POST /scripts
  - POST /captions
  - POST /calendar
- Có router /api/events với endpoint:
  - POST /copy
- Có router /api/feedback với endpoint:
  - POST /
- Dùng Pydantic schemas.
- Tạo AIProvider abstract base class.
- Tạo GeminiProvider, OpenAIProvider, ClaudeProvider dạng placeholder.
- Tạo AIService điều phối provider.
- Tạo PromptService build prompt theo type.
- Tạo UsageService check quota placeholder.
- Tạo AnalyticsService log event placeholder.
- Nếu chưa có API key, trả mock output để frontend test được.
```

---

## Prompt bổ sung: tạo Next.js frontend skeleton

```text
Hãy tạo frontend Next.js App Router cho app AI Content Kit.

Yêu cầu:
- TypeScript.
- Tailwind CSS.
- shadcn/ui nếu có thể.
- Routes:
  - /
  - /login
  - /dashboard
  - /pricing
  - /products/new
  - /products/[id]
  - /products/[id]/generate
  - /settings
- Components:
  - ProductForm
  - OutputCard
  - CopyButton
  - RegenerateButton
  - FeedbackButton
  - QuotaBadge
  - UpgradeModal
  - PricingCard
- Landing page có hero:
  "Biến 1 sản phẩm thành 30 ý tưởng video TikTok Shop trong 60 giây"
- ProductForm gọi FastAPI endpoint /api/generate/hooks.
- OutputCard có nút copy.
- CopyButton gọi /api/events/copy.
- Pricing page có 4 gói: Free, Starter, Pro, Team.
- Dùng api-client.ts để gọi backend.
- Dùng supabase-client.ts placeholder cho auth.
```
