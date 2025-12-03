from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/algorithms", tags=["Algorithms"])

ALGO_MAP = {
    "ic": [
        {"key": "bruteforce", "label": "Bruteforce"},
        {"key": "greedy", "label": "Greedy"},
        {"key": "greedy_dp", "label": "Greedy (DP)"},
        {"key": "heuristic", "label": "Heuristic"},
        {"key": "degree_discount", "label": "Degree Discount"},
    ],
    "lt": [
        {"key": "bruteforce", "label": "Bruteforce"},
        {"key": "naive_greedy", "label": "Naive Greedy"},
        {"key": "greedy_storage", "label": "Greedy + Storage"},
        {"key": "local_dag", "label": "Local DAG"},
    ],
}

@router.get("/{model}")
async def algorithms_for_model(model: str):
    model = model.lower()
    if model not in ALGO_MAP:
        raise HTTPException(status_code=404, detail="Model not found")
    return ALGO_MAP[model]
