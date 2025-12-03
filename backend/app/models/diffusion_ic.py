import random

def run_ic_once(G, seeds, rng=None):
    """
    Runs a single simulation of the Independent Cascade model.
    Returns (spread_count, primitive_ops).
    """
    if rng is None:
        rng = random.Random()

    active = set(seeds)
    newly_active = set(seeds)
    ops = 0

    while newly_active:
        next_new = set()
        for u in newly_active:
            for v in G.neighbors(u):
                ops += 1  # count primitive operation
                if v in active:
                    continue
                p = G.edges[u, v].get("p", 0.01)
                if rng.random() < p:
                    next_new.add(v)

        newly_active = next_new
        active |= newly_active

    return len(active), ops
