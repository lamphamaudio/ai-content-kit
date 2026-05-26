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
cd apps/api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Health check: `http://localhost:8000/health`.

## Environment

Copy `.env.example` to `.env` and fill Supabase plus provider keys when available.
The default `AI_PROVIDER=mock` returns local mock output.

