from fastapi import APIRouter

router = APIRouter(prefix="/compare", tags=["Comparison"])

COMPARISON_TABLE = [
    {
        "name": "Greedy",
        "time": "O(knR)",
        "space": "O(n + m)",
        "reliability": "High",
        "efficiency": "Low",
        "coreIdea": "Sequential marginal gain maximization",
    },
    {
        "name": "CELF",
        "time": "O(knR)",
        "space": "O(n + m)",
        "reliability": "High",
        "efficiency": "Medium",
        "coreIdea": "Lazy evaluation with submodularity",
    },
    {
        "name": "CELF++",
        "time": "O(knR)",
        "space": "O(n + m)",
        "reliability": "High",
        "efficiency": "High",
        "coreIdea": "Enhanced CELF with look-ahead",
    },
    {
        "name": "Degree Heuristic",
        "time": "O(n log n)",
        "space": "O(n)",
        "reliability": "Medium",
        "efficiency": "Very High",
        "coreIdea": "Select highest degree nodes",
    },
    {
        "name": "PageRank",
        "time": "O(km)",
        "space": "O(n)",
        "reliability": "Medium",
        "efficiency": "High",
        "coreIdea": "Random walk centrality measure",
    },
]

@router.get("")
async def comparison_table():
    return COMPARISON_TABLE
