"""
Importable routers for the Influence Maximization API.
"""
from .graphs import router as graphs_router
from .models import router as models_router
from .algorithms import router as algorithms_router
from .compare import router as compare_router
from .run import router as run_router
from .details import router as details_router

__all__ = [
    "graphs_router",
    "models_router",
    "algorithms_router",
    "compare_router",
    "run_router",
    "details_router",
]
