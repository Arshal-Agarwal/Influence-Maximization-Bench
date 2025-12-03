from fastapi import APIRouter

router = APIRouter(prefix="/graphs", tags=["Graphs"])

GRAPH_TYPES = [
    {"id": 1, "key": "sparse", "label": "Sparse Graph"},
    {"id": 2, "key": "dense", "label": "Dense Graph"},
    {"id": 3, "key": "scale-free", "label": "Scale-Free Graph"},
    {"id": 4, "key": "random", "label": "Random Graph"},
]

@router.get("")
async def list_graphs():
    return GRAPH_TYPES
