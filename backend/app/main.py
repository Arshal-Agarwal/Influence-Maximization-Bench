from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api_router import api_router

app = FastAPI(title="Influence Maximization API", version="1.0")

# Allow frontend (adjust in prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow all during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach all routers here
app.include_router(api_router, prefix="/api")

@app.get("/health")
async def health():
    return {"status": "ok"}
