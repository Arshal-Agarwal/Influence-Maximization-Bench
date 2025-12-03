from pydantic import BaseModel, Field
from typing import List, Optional


class RunRequest(BaseModel):
    graph: int = Field(..., description="Graph type: sparse, dense, scale-free, random")
    model: str = Field(..., description="Diffusion model: ic or lt")
    algorithm: str = Field(..., description="Algorithm name")
    seedSize: int = Field(..., gt=0, description="Number of seed nodes (k)")
    iterations: int = Field(..., gt=0, description="Monte Carlo iterations")


class GraphInfo(BaseModel):
    nodes: int
    edges: int


class RunResponse(BaseModel):
    run_id: str
    seed_set: List[int]
    spread: float
    variance: float
    runtime: float
    operations: int
    graph: GraphInfo
