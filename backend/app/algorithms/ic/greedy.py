from itertools import combinations
from typing import List
import logging

logger = logging.getLogger(__name__)

def run(G, k: int, model_runner=None, mc_evaluator=None, max_nodes_for_bruteforce=25, **kwargs) -> List[int]:
    """
    Brute-force search for the set of k nodes that maximizes spread.
    WARNING: exponential complexity; only practical when n is very small.
    - If graph is too large, raise ValueError to avoid accidental OOM.
    - model_runner is required to evaluate a single run; if mc_evaluator is provided it's used to get expected spread.
    """

    n = G.number_of_nodes()
    if n > max_nodes_for_bruteforce:
        raise ValueError(f"Bruteforce only allowed for small graphs (n <= {max_nodes_for_bruteforce}), got n={n}")

    nodes = list(G.nodes())
    best_set = None
    best_score = -1.0

    # evaluation function
    def eval_set(seed_set):
        if mc_evaluator is not None:
            res = mc_evaluator(G, seed_set, model_runner, iterations=kwargs.get("eval_iterations", 200))
            return res["mean_spread"]
        # fallback: run single deterministic model_runner once (not recommended)
        spread, _ = model_runner(G, seed_set)
        return float(spread)

    for comb in combinations(nodes, k):
        score = eval_set(list(comb))
        if score > best_score:
            best_score = score
            best_set = list(comb)

    logger.info("Bruteforce selected set with score %.3f", best_score)
    return best_set or []
