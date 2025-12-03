from fastapi import HTTPException

class InvalidGraphError(HTTPException):
    def __init__(self, graph_id: int):
        super().__init__(
            status_code=400,
            detail=f"Invalid graph ID '{graph_id}'. Must be between 1 and 4."
        )

class InvalidModelError(HTTPException):
    def __init__(self, model: str):
        super().__init__(
            status_code=400,
            detail=f"Invalid model '{model}'. Must be 'ic' or 'lt'."
        )

class AlgorithmNotSupportedError(HTTPException):
    def __init__(self, algorithm: str, model: str):
        super().__init__(
            status_code=400,
            detail=f"Algorithm '{algorithm}' is not supported for model '{model}'."
        )

class ComputationFailedError(HTTPException):
    def __init__(self, msg: str = "Computation failed"):
        super().__init__(
            status_code=500,
            detail=msg
        )
