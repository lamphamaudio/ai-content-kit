# AI Content Kit

Monorepo MVP for TikTok Shop and affiliate content generation.

## Structure

- `apps/web`: Next.js App Router frontend.
- `apps/api`: FastAPI backend.
- `supabase`: database migrations and seed data.
- `packages/shared`: shared placeholder package.
- `docs`: product and engineering notes.

## Run Frontend

```bash
cd apps/web
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run Backend

```bash
python -m venv apps/api/.venv
.\apps\api\.venv\Scripts\activate
pip install -r apps/api/requirements.txt
uvicorn app.main:app --app-dir apps/api --reload --port 8000
```

Health check: `http://localhost:8000/health`.

## Environment

Copy `.env.example` to `.env` and fill Supabase plus provider keys when available.
The API currently expects a real OpenAI provider for generation endpoints:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini
```

Backend tests mock the AI service and do not call OpenAI.

## Phase 2 Product Analysis

Phase 2 adds product analysis before full content-kit generation. See `docs/PHASE_2_TEST.md` for sample payloads, expected response shapes, and manual test commands.
