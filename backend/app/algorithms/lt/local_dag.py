from typing import List, Callable, Optional
import logging
from app.services.simulators.dag_builder import build_local_dag
import networkx as nx

logger = logging.getLogger(__name__)

def run(
    G,
    k: int,
    model_runner: Optional[Callable] = None,
    mc_evaluator: Optional[Callable] = None,
    max_depth: int = 3,
    iterations: int = 200,
    **kwargs
) -> List[int]:
    """
    Local DAG algorithm for LT.
    Steps:
      1. Build a local DAG around seeds as they are chosen.
      2. Evaluate spread on DAG instead of full graph (faster).
      3. Greedy-style selection using DAG-based evaluation.
    """

    if k <= 0:
        return []

    nodes = set(G.nodes())
    selected = []
    remaining = nodes.copy()

    if mc_evaluator is None:
        # fallback to naive greedy (full graph)
        from .naive_greedy import run as fallback
        return fallback(G, k, model_runner=model_runner, mc_evaluator=None, **kwargs)

    for _ in range(k):
        best_node = None
        best_gain = -1.0

        # baseline DAG
        base_dag = build_local_dag(G, selected, max_depth=max_depth)
        base_spread = mc_evaluator(
            base_dag,
            selected,
            model_runner,
            iterations=iterations,
            seed=kwargs.get("seed", 42)
        )["mean_spread"] if selected else 0.0

        for v in list(remaining):
            candidate = selected + [v]
            candidate_dag = build_local_dag(G, candidate, max_depth=max_depth)

            res = mc_evaluator(
                candidate_dag,
                candidate,
                model_runner,
                iterations=iterations,
                seed=kwargs.get("seed", 42)
            )
            gain = res["mean_spread"] - base_spread

            if gain > best_gain:
                best_gain = gain
                best_node = v

        if best_node is None:
            break

        selected.append(best_node)
        remaining.remove(best_node)
        logger.debug("LT Local DAG picked %s (gain=%.4f)", best_node, best_gain)

    return selected
