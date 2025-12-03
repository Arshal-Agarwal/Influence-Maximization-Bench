from typing import List, Callable, Optional, Tuple
import logging

logger = logging.getLogger(__name__)

def run(
    G,
    k: int,
    model_runner: Optional[Callable] = None,
    mc_evaluator: Optional[Callable] = None,
    iterations: int = 200,
    **kwargs
) -> List[int]:
    """
    LT greedy with memoization:
      Caches evaluated seed sets so repeated marginal gain calculations
      do not re-run Monte Carlo simulations.
    """

    if mc_evaluator is None:
        # fallback to naive greedy
        from .naive_greedy import run as fallback
        return fallback(
            G,
            k,
            model_runner=model_runner,
            mc_evaluator=mc_evaluator,
            iterations=iterations,
            **kwargs
        )

    selected = []
    remaining = set(G.nodes())
    cache = {}  # key: sorted tuple of seeds -> spread value

    def eval_set(seeds: Tuple[int, ...]):
        key = tuple(sorted(seeds))
        if key in cache:
            return cache[key]
        res = mc_evaluator(
            G,
            list(seeds),
            model_runner,
            iterations=iterations,
            seed=kwargs.get("seed", 42)
        )
        cache[key] = res["mean_spread"]
        return cache[key]

    for _ in range(k):
        baseline = eval_set(tuple(selected)) if selected else 0.0
        best_gain = -1.0
        best_node = None

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
        logger.debug("LT Greedy+Storage picked %s (gain=%.4f)", best_node, best_gain)

    return selected
