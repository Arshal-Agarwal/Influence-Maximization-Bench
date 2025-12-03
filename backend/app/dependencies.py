from fastapi import Depends, HTTPException
from app.storage.run_cache import RunCache

# Global cache instance (can be swapped with Redis later)
run_cache = RunCache()

def get_run_cache():
    """
    Dependency that provides access to the shared run cache.
    In the future, this can be replaced with Redis or database.
    """
    return run_cache


def validate_graph_id(graph_id: int):
    """
    Ensures the graph id is between 1 and 4.
    Keeps validation consistent across all endpoints.
    """
    if graph_id not in {1, 2, 3, 4}:
        raise HTTPException(status_code=400, detail="Invalid graph ID (must be 1–4).")
    return graph_id


def validate_model(model: str):
    """
    Ensures the diffusion model is either IC or LT.
    """
    if model not in {"ic", "lt"}:
        raise HTTPException(status_code=400, detail="Invalid model type (must be 'ic' or 'lt').")
    return model
