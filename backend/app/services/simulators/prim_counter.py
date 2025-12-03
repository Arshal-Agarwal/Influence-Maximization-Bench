class PrimCounter:
    """
    Tracks the number of primitive operations during simulation or algorithm execution.
    Algorithms increment this whenever they do a basic influence-related operation.
    """

    def __init__(self):
        self.ops = 0

    def inc(self, amount: int = 1):
        self.ops += amount

    def get(self):
        return self.ops

    def reset(self):
        self.ops = 0
