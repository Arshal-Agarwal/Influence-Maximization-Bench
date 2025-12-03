from typing import List
import networkx as nx
import logging

logger = logging.getLogger(__name__)

def run(G, k: int, **kwargs) -> List[int]:
    """
    Heuristic: use PageRank centrality as an influence proxy and pick top-k nodes.
    This is fast and often performs well.
    """
    pr = nx.pagerank(G)
    # sort nodes by pagerank descending
    sorted_nodes = sorted(pr.items(), key=lambda x: x[1], reverse=True)
    selected = [node for node, _ in sorted_nodes[:k]]
    logger.debug("Heuristic (PageRank) selected top-%d nodes", k)
    return selected
