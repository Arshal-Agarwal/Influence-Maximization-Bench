from pydantic import BaseModel
from typing import List, Dict

class IMResponse(BaseModel):
    run_id: str
    seed_set: List[int]
    spread: float
    variance: float
    runtime: float
    operations: int
    graph: Dict[str, int]  # {nodes, edges}
