from fastapi import APIRouter, HTTPException
from app.storage.run_cache import RunCache
from app.storage.result_store import ResultStore

router = APIRouter(prefix="/details", tags=["Details"])

run_cache = RunCache()
result_store = ResultStore()

@router.get("/{run_id}")
async def get_details(run_id: str):
    result = run_cache.get(run_id)
    if not result:
        raise HTTPException(status_code=404, detail="Run not found")

    logs = result_store.get_logs(run_id)
    meta = result_store.get_meta(run_id)

    return {
        "run_id": run_id,
        "result": result,
        "logs": logs or [],
        "meta": meta or {},
    }
