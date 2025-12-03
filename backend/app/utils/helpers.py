def safe_float(value, default=0.0):
    """
    Converts a value to float safely.
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def chunked(iterable, size):
    """
    Yield items in fixed-size chunks.
    Useful for batch simulations or large graph iteration.
    """
    for i in range(0, len(iterable), size):
        yield iterable[i : i + size]
