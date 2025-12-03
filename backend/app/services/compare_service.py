class CompareService:
    """
    Supplies comparison information for all algorithms.
    Used by the /compare endpoint and ComparisonTable.
    """

    @staticmethod
    def get_comparison_table():
        return [
            {
                "name": "Greedy",
                "time": "O(k n R)",
                "space": "O(n + m)",
                "reliability": "High",
                "efficiency": "Low",
                "coreIdea": "Sequential marginal gain maximization",
            },
            {
                "name": "CELF",
                "time": "O(k n R)",
                "space": "O(n + m)",
                "reliability": "High",
                "efficiency": "Medium",
                "coreIdea": "Lazy evaluation with submodular pruning",
            },
            {
                "name": "CELF++",
                "time": "O(k n R)",
                "space": "O(n + m)",
                "reliability": "High",
                "efficiency": "High",
                "coreIdea": "CELF with improved lookahead",
            },
            {
                "name": "Degree Heuristic",
                "time": "O(n log n)",
                "space": "O(n)",
                "reliability": "Medium",
                "efficiency": "Very High",
                "coreIdea": "Select highest degree nodes",
            }
        ]
