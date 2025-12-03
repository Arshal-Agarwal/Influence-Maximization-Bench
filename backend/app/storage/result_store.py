from typing import Dict, List, Any

class ResultStore:
    """
    Stores detailed computation artifacts:
    - execution logs
    - algorithm trace
    - additional metadata
    """

    def __init__(self):
        self._logs: Dict[str, List[str]] = {}
        self._traces: Dict[str, List[Any]] = {}
        self._meta: Dict[str, dict] = {}

    def add_log(self, run_id: str, message: str):
        self._logs.setdefault(run_id, []).append(message)

    def get_logs(self, run_id: str) -> List[str]:
        return self._logs.get(run_id, [])

    def set_trace(self, run_id: str, trace_list: List[Any]):
        self._traces[run_id] = trace_list

    def get_trace(self, run_id: str):
        return self._traces.get(run_id, [])

    def set_meta(self, run_id: str, metadata: dict):
        self._meta[run_id] = metadata

    def get_meta(self, run_id: str):
        return self._meta.get(run_id, {})
