from fastapi import APIRouter

router = APIRouter(prefix="/models", tags=["Models"])

MODELS = [
    {"key": "ic", "label": "Independent Cascade (IC)"},
    {"key": "lt", "label": "Linear Threshold (LT)"},
]

@router.get("")
async def list_models():
    return MODELS
