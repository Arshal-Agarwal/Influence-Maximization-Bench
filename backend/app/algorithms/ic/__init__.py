"""
IC algorithm implementations.

Each algorithm exposes a `run(G, k, model_runner=None, mc_evaluator=None, **kwargs)` function
that returns a list of selected seed node IDs.
"""
from .degree_discount import run as degree_discount
from .greedy import run as greedy
from .greedy_dp import run as greedy_dp
from .bruteforce import run as bruteforce
from .heuristic import run as heuristic

__all__ = ["degree_discount", "greedy", "greedy_dp", "bruteforce", "heuristic"]
