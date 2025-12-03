"""
Linear Threshold (LT) algorithm implementations.

Each algorithm exposes:
    run(G, k, model_runner=None, mc_evaluator=None, **kwargs)
"""
from .bruteforce import run as bruteforce
from .naive_greedy import run as naive_greedy
from .greedy_storage import run as greedy_storage
from .local_dag import run as local_dag

__all__ = [
    "bruteforce",
    "naive_greedy",
    "greedy_storage",
    "local_dag",
]
