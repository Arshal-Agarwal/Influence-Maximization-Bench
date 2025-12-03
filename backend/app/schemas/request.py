from pydantic import BaseModel, Field
from typing import Literal

GraphId = Literal[1, 2, 3, 4]
ModelType = Literal["ic", "lt"]

class IMRequest(BaseModel):
    graph: GraphId = Field(..., description="Graph type: 1=sparse, 2=dense, 3=scale-free, 4=random")
    model: ModelType
    algorithm: str
    seedSize: int = Field(..., ge=1)
    iterations: int = Field(..., ge=1)
