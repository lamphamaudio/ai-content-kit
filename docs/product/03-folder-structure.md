# AI Content Kit - Folder Structure

## 1. Repo Strategy

Giai đoạn MVP nên dùng **1 repo dạng monorepo**.

Không nên tách FE và BE thành 2 repo ngay từ đầu vì sẽ tăng overhead:

- Quản lý 2 repo
- Quản lý version API
- Quản lý 2 pipeline CI/CD
- Khó trace bug end-to-end
- Phức tạp khi làm một mình

Chốt:

```text
1 GitHub repo
Frontend: apps/web
Backend: apps/api
Shared packages/docs: packages/, docs/
```

Deploy vẫn tách riêng:

```text
GitHub repo: ai-content-kit
  -> Vercel deploy apps/web
  -> Render/Fly/Railway deploy apps/api
  -> Supabase DB/Auth
```

Một repo không có nghĩa là một app deploy. Code chung repo nhưng FE/BE deploy độc lập.

---

## 2. Root Structure

```text
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
```

Ý nghĩa:

| Folder/File | Mục đích |
|---|---|
| `apps/web` | Next.js frontend |
| `apps/api` | FastAPI backend |
| `packages/shared` | Type/schema dùng chung nếu cần |
| `docs` | Tài liệu sản phẩm, API, metrics, prompt |
| `scripts` | Script hỗ trợ dev/deploy |
| `supabase` | Migration SQL, seed data, RLS policy |
| `docker-compose.yml` | Chạy local service nếu cần |
| `.env.example` | Template biến môi trường |

---

## 3. Frontend Structure

```text
apps/web/
  app/
    page.tsx
    layout.tsx
    globals.css

    login/
      page.tsx

    dashboard/
      page.tsx

    pricing/
      page.tsx

    products/
      new/
        page.tsx
      [id]/
        page.tsx
        generate/
          page.tsx

    settings/
      page.tsx

  components/
    ui/
    product-form.tsx
    output-card.tsx
    copy-button.tsx
    regenerate-button.tsx
    feedback-button.tsx
    quota-badge.tsx
    upgrade-modal.tsx
    pricing-card.tsx

  lib/
    api-client.ts
    supabase-client.ts
    analytics.ts
    auth.ts
    utils.ts

  hooks/
    use-auth.ts
    use-products.ts
    use-generation.ts
    use-copy-event.ts

  types/
    product.ts
    generation.ts
    pricing.ts

  public/

  package.json
  tsconfig.json
  next.config.ts
  tailwind.config.ts
  .env.local
```

### Frontend pages

| Page | Route | Mục đích |
|---|---|---|
| Landing | `/` | Bán value proposition |
| Login | `/login` | Đăng nhập |
| Dashboard | `/dashboard` | Xem project/content |
| New Product | `/products/new` | Nhập sản phẩm |
| Product Detail | `/products/[id]` | Xem content theo sản phẩm |
| Generate | `/products/[id]/generate` | Generate hook/script |
| Pricing | `/pricing` | Gói giá |
| Settings | `/settings` | Plan/quota |

### Frontend components

| Component | Mục đích |
|---|---|
| `ProductForm` | Form nhập sản phẩm |
| `OutputCard` | Hiển thị hook/script/caption |
| `CopyButton` | Copy content và gọi event tracking |
| `RegenerateButton` | Generate lại output |
| `FeedbackButton` | Rating output |
| `QuotaBadge` | Hiển thị quota còn lại |
| `UpgradeModal` | Upsell khi hết quota |
| `PricingCard` | Hiển thị gói giá |

---

## 4. Backend Structure

```text
apps/api/
  app/
    main.py

    core/
      config.py
      security.py
      errors.py

    api/
      deps.py
      routes/
        health.py
        auth.py
        products.py
        generate.py
        feedback.py
        usage.py
        events.py

    services/
      ai_service.py
      prompt_service.py
      usage_service.py
      product_service.py
      analytics_service.py
      policy_check_service.py

    providers/
      base.py
      openai_provider.py
      gemini_provider.py
      claude_provider.py

    prompts/
      hooks.py
      scripts.py
      captions.py
      calendar.py
      safety.py
      versions.py

    models/
      product.py
      generation.py
      generated_item.py
      feedback.py
      profile.py
      usage_limit.py

    schemas/
      product.py
      generation.py
      feedback.py
      usage.py
      events.py

    db/
      session.py
      migrations/

    workers/
      tasks.py

    tests/
      test_generate_hooks.py
      test_usage_limits.py
      test_copy_events.py

  requirements.txt
  pyproject.toml
  .env
```

### Backend services

| Service | Mục đích |
|---|---|
| `AIService` | Điều phối gọi AI provider |
| `PromptService` | Build prompt theo type/version |
| `UsageService` | Check quota và usage |
| `ProductService` | CRUD sản phẩm |
| `AnalyticsService` | Log event |
| `PolicyCheckService` | Check claim rủi ro |

### AI providers

Không hardcode một provider.

```text
providers/
  base.py
  openai_provider.py
  gemini_provider.py
  claude_provider.py
```

Mục tiêu:

- Dễ đổi provider
- Dễ fallback khi lỗi
- Dễ A/B test model
- Dễ tối ưu cost

---

## 5. Supabase Folder

```text
supabase/
  migrations/
    001_create_profiles.sql
    002_create_products.sql
    003_create_generations.sql
    004_create_generated_items.sql
    005_create_copy_events.sql
    006_create_usage_limits.sql
    007_create_feedbacks.sql
    008_rls_policies.sql

  seed/
    categories.sql
    prompt_templates.sql
```

---

## 6. Docs Folder

```text
docs/
  product-plan.md
  metrics.md
  pricing.md
  folder-structure.md
  api-contract.md
  database-schema.md
  prompt-engine.md
  deployment.md
  roadmap.md
```

---

## 7. Environment Files

### Root `.env.example`

```env
# Frontend
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Backend
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=

OPENAI_API_KEY=
GEMINI_API_KEY=
ANTHROPIC_API_KEY=

APP_ENV=development
APP_URL=
```

### Frontend `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

### Backend `.env`

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=

OPENAI_API_KEY=
GEMINI_API_KEY=
ANTHROPIC_API_KEY=

APP_ENV=development
APP_URL=http://localhost:3000
```

---

## 8. Local Development Flow

```text
Terminal 1:
cd apps/api
uvicorn app.main:app --reload --port 8000

Terminal 2:
cd apps/web
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8000
```

FastAPI docs:

```text
http://localhost:8000/docs
```

---

## 9. Deploy Mapping

| Part | Service | Root Directory |
|---|---|---|
| Frontend | Vercel | `apps/web` |
| Backend | Render/Fly/Railway | `apps/api` |
| Database | Supabase | N/A |
| Auth | Supabase Auth | N/A |
| Analytics | PostHog hoặc self-log | N/A |

### Vercel

```text
Root Directory: apps/web
Build Command: npm run build
Output: .next
```

### Render/FastAPI

```text
Root Directory: apps/api
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## 10. Khi nào mới tách repo?

Chỉ tách thành 2 repo khi:

- Có team FE và BE riêng
- Backend thành public API/SDK riêng
- FE/BE release cycle khác nhau nhiều
- Backend dùng cho nhiều sản phẩm
- Repo quá nặng hoặc CI/CD phức tạp
- Có yêu cầu security tách quyền truy cập

Giai đoạn MVP: **không tách**.
