from itertools import combinations
from typing import List
import logging

logger = logging.getLogger(__name__)

def run(G, k: int, model_runner=None, mc_evaluator=None,
        max_nodes_for_bruteforce=25, **kwargs) -> List[int]:
    """
    LT brute-force search for best k nodes.
    Exponential; restricted to tiny graphs.

    model_runner: run_lt_once
    mc_evaluator: monte_carlo_spread (preferred)
    """
    n = G.number_of_nodes()
    if n > max_nodes_for_bruteforce:
        raise ValueError(
            f"LT bruteforce only allowed for n <= {max_nodes_for_bruteforce}, got n={n}"
        )

    nodes = list(G.nodes())
    best_set = None
    best_score = -1.0

    def eval_set(seed_set):
        if mc_evaluator:
            res = mc_evaluator(
                G,
                seed_set,
                model_runner,
                iterations=kwargs.get("eval_iterations", 200),
                seed=kwargs.get("seed", 42)
            )
            return res["mean_spread"]
        spread, _ = model_runner(G, seed_set)
        return float(spread)

    for comb in combinations(nodes, k):
        score = eval_set(list(comb))
        if score > best_score:
            best_score = score
            best_set = list(comb)

    logger.info("LT bruteforce best score = %.3f", best_score)
    return best_set or []
