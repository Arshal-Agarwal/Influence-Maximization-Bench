from fastapi import APIRouter
from app.schemas.run import RunRequest, RunResponse
from app.services.compute_service import ComputeService

router = APIRouter(prefix="/run", tags=["Run"])

@router.post("", response_model=RunResponse)
async def run_algorithm(payload: RunRequest):
    result = await ComputeService.run_im(payload)
    return result
