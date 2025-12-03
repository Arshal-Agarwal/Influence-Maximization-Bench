# app/services/simulators/mc_simulator.py
import time
from statistics import mean, variance
from typing import Callable, Dict, Any
from app.utils.random_seed import get_rng
from app.utils.timers import Timer

def monte_carlo_spread(G, seeds, model_runner: Callable, iterations: int = 1000, seed: int = 42) -> Dict[str, Any]:
    """
    Estimates expected spread using R Monte Carlo simulations.

    Returns:
        {
          "mean_spread": float,
          "variance": float,   # sample variance of spreads (0 if iterations < 2)
          "ops": int,          # total primitive ops summed over runs
          "runtime": float     # wall clock seconds for the whole MC loop
        }
    """

    rng = get_rng(seed)
    spreads = []
    total_ops = 0

    timer = Timer()
    timer.start()

    for _ in range(iterations):
        # create a per-simulation RNG to avoid global state interference
        sim_seed = rng.randint(0, 2**31 - 1)
        sim_rng = get_rng(sim_seed)

        spread, ops = model_runner(G, seeds, rng=sim_rng)
        spreads.append(spread)
        total_ops += ops

    timer.stop()

    mean_spread = mean(spreads) if spreads else 0.0

    # sample variance (unbiased). If only 1 iteration, set variance to 0.0
    var = variance(spreads) if len(spreads) > 1 else 0.0

    return {
        "mean_spread": mean_spread,
        "variance": var,
        "ops": total_ops,
        "runtime": total_ops*timer.elapsed,
    }
