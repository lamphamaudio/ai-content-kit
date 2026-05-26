# AI Content Kit Docs

Bộ file này tách riêng các phần quan trọng để triển khai app AI Content Kit.

## Danh sách file

| File | Nội dung |
|---|---|
| `01-metrics.md` | North Star Metric, acquisition, activation, engagement, retention, revenue |
| `02-pricing.md` | Free, Starter, Pro, Team plan và paywall strategy |
| `03-folder-structure.md` | Cấu trúc monorepo, frontend, backend, Supabase, deploy mapping |
| `04-scaffold-prompt.md` | Prompt để dùng với coding agent hoàn thiện cấu trúc thư mục và scaffold project |

## Tech đã chốt

```text
Monorepo
Frontend: Next.js + TypeScript + Tailwind CSS + shadcn/ui
Backend: Python + FastAPI
Database/Auth: Supabase PostgreSQL + Supabase Auth
AI Provider: Gemini/OpenAI/Claude abstraction
Deploy FE: Vercel
Deploy BE: Render/Fly/Railway
Payment MVP: manual bank transfer
```

## Metric sống còn

```text
Weekly Copied Content Items
```

App chỉ có tín hiệu tốt nếu user generate xong có copy/export content.
