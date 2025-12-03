from typing import List, Callable, Optional
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
    Naive greedy for LT:
      - Each step picks node with highest marginal gain.
      - Uses Monte Carlo evaluator for spread estimation.
    """

    if k <= 0:
        return []

    nodes = set(G.nodes())
    selected = []
    remaining = nodes.copy()

    if mc_evaluator is None:
        # fallback: deterministic single run
        mc_evaluator = lambda G_, seeds, model_runner_, iterations, seed: {
            "mean_spread": model_runner_(G_, seeds)[0],
            "ops": 0,
            "runtime": 0.0,
        }

    for i in range(k):
        base = mc_evaluator(
            G,
            selected,
            model_runner,
            iterations=iterations,
            seed=kwargs.get("seed", 42)
        )["mean_spread"]

        best_node = None
        best_gain = -1.0

        for v in list(remaining):
            candidate = selected + [v]
            res = mc_evaluator(
                G,
                candidate,
                model_runner,
                iterations=iterations,
                seed=kwargs.get("seed", 42)
            )
            gain = res["mean_spread"] - base
            if gain > best_gain:
                best_gain = gain
                best_node = v

        if best_node is None:
            break

        selected.append(best_node)
        remaining.remove(best_node)
        logger.debug("LT Greedy: selected %s (gain=%.4f)", best_node, best_gain)

    return selected
