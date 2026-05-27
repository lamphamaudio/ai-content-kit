from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import analyze, events, feedback, generate, health, products, usage
from app.core.config import settings

app = FastAPI(title="AI Content Kit API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(analyze.router, prefix="/api/analyze", tags=["analyze"])
app.include_router(generate.router, prefix="/api/generate", tags=["generate"])
app.include_router(events.router, prefix="/api/events", tags=["events"])
app.include_router(feedback.router, prefix="/api/feedback", tags=["feedback"])
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(usage.router, prefix="/api/usage", tags=["usage"])
