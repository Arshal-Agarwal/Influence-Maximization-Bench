import random

def run_lt_once(G, seeds, rng=None):
    """
    Runs one simulation of the Linear Threshold model.
    Returns (spread_count, primitive_ops).
    """
    if rng is None:
        rng = random.Random()

    active = set(seeds)
    thresholds = {v: rng.random() for v in G.nodes()}
    weight_acc = {v: 0.0 for v in G.nodes()}
    ops = 0

    newly_active = set(seeds)

    while newly_active:
        next_new = set()
        for u in newly_active:
            for v in G.neighbors(u):
                ops += 1
                if v in active:
                    continue

                weight_acc[v] += G.edges[u, v].get("weight", 0.0)
                if weight_acc[v] >= thresholds[v]:
                    next_new.add(v)

        newly_active = next_new
        active |= newly_active

    return len(active), ops
