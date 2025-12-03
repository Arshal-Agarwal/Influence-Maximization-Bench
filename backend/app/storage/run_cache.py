from typing import Dict, Optional

class RunCache:
    """
    Simple in-memory cache for storing run results.
    Can be replaced with Redis or database later.
    """

    def __init__(self):
        self._store: Dict[str, dict] = {}

    def store(self, run_id: str, payload: dict) -> None:
        self._store[run_id] = payload

    def get(self, run_id: str) -> Optional[dict]:
        return self._store.get(run_id)

    def exists(self, run_id: str) -> bool:
        return run_id in self._store

    def clear(self) -> None:
        self._store.clear()
