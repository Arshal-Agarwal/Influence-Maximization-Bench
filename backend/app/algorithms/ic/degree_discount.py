import heapq
from typing import List
import logging

logger = logging.getLogger(__name__)

def run(G, k: int, **kwargs) -> List[int]:
    """
    Degree Discount heuristic (Chen et al.).
    Fast O(k log n) style selection using a max-heap.
    Returns list of selected node ids.
    """
    # initialize degrees and discount arrays
    deg = {v: G.degree[v] for v in G.nodes()}
    dd = {v: deg[v] for v in G.nodes()}  # current discount estimate
    selected = set()
    heap = [(-dd[v], v) for v in G.nodes()]
    heapq.heapify(heap)

    while len(selected) < k and heap:
        negscore, v = heapq.heappop(heap)
        if v in selected:
            continue
        # because we push updated keys, the top may be stale; verify
        current = -negscore
        if current != dd[v]:
            # stale entry, skip (we will have pushed refreshed value)
            continue
        selected.add(v)
        # update neighbors' discount
        for u in G.neighbors(v):
            if u not in selected:
                dd[u] = dd.get(u, 0) - 1
                heapq.heappush(heap, (-dd[u], u))
    logger.debug("Degree discount selected %d seeds", len(selected))
    return list(selected)
