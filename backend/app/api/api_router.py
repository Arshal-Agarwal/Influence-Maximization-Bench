from fastapi import APIRouter
from app.api.routers import (
    graphs_router,
    models_router,
    algorithms_router,
    compare_router,
    run_router,
    details_router,
)

api_router = APIRouter()

api_router.include_router(graphs_router)
api_router.include_router(models_router)
api_router.include_router(algorithms_router)
api_router.include_router(compare_router)
api_router.include_router(run_router)
api_router.include_router(details_router)
