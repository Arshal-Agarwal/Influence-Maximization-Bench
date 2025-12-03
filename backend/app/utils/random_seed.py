import random

def get_rng(seed: int = 42):
    """
    Returns a new deterministic random.Random instance.

    Every algorithm using randomness should use this factory.
    """
    return random.Random(seed)
