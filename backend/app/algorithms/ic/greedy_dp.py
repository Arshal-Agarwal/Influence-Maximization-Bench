from typing import List, Callable, Optional, Tuple
import logging

logger = logging.getLogger(__name__)

def run(G, k: int, model_runner: Optional[Callable]=None, mc_evaluator: Optional[Callable]=None, iterations: int = 200, **kwargs) -> List[int]:
    """
    Greedy with memoization: cache evaluated seed sets / marginal gains to avoid re-evaluating identical candidates.
    This is not dynamic programming in strict sense but reduces re-computation across iterations.
    Returns selected node list.
    """

    if mc_evaluator is None:
        # fallback to the greedy implementation if mc_evaluator not provided
        from .greedy import run as greedy_run
        return greedy_run(G, k, model_runner=model_runner, mc_evaluator=mc_evaluator, iterations=iterations, **kwargs)

    selected = []
    remaining = set(G.nodes())
    eval_cache = {}  # tuple(sorted(seeds)) -> mean_spread

    def eval_set(seeds: Tuple[int, ...]):
        key = tuple(sorted(seeds))
        if key in eval_cache:
            return eval_cache[key]
        res = mc_evaluator(G, list(seeds), model_runner, iterations=iterations, seed=kwargs.get("seed", 42))
        eval_cache[key] = res["mean_spread"]
        return eval_cache[key]

    for _ in range(k):
        baseline = eval_set(tuple(selected)) if selected else 0.0
        best_node = None
        best_gain = -1.0
        for v in list(remaining):
            candidate = tuple(selected + [v])
            val = eval_set(candidate)
            gain = val - baseline
            if gain > best_gain:
                best_gain = gain
                best_node = v
        if best_node is None:
            break
        selected.append(best_node)
        remaining.remove(best_node)
        logger.debug("Greedy-DP picked %s (gain=%.4f)", best_node, best_gain)

    return selected
