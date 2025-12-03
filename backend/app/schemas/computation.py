from pydantic import BaseModel
from typing import List, Dict, Any

class TraceStep(BaseModel):
    iteration: int
    selected: int
    delta: float

class ComputationDetails(BaseModel):
    run_id: str
    log: List[str]
    trace: List[TraceStep]
    runtime: float
    operations: int
    additional: Dict[str, Any] = {}
