from pydantic import BaseModel

class GraphInfo(BaseModel):
    id: int
    name: str
    nodes: int
    edges: int

class AlgorithmInfo(BaseModel):
    name: str
    time: str
    space: str
    reliability: str
    efficiency: str
    coreIdea: str
