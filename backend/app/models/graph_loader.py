import networkx as nx
from functools import lru_cache
from app.core.config import settings

@lru_cache(maxsize=8)
def load_graph_by_id(graph_id: int):
    """
    Loads one of four supported graph types.
    Cached for performance — graphs don't change between runs.
    """

    n = settings.DEFAULT_NODES

    if graph_id == 1:  # sparse
        m = settings.DEFAULT_SPARSE_EDGES
        G = nx.gnm_random_graph(n, m, seed=settings.RANDOM_SEED)

    elif graph_id == 2:  # dense
        m = settings.DEFAULT_DENSE_EDGES
        G = nx.gnm_random_graph(n, m, seed=settings.RANDOM_SEED)

    elif graph_id == 3:  # scale-free
        G = nx.barabasi_albert_graph(n, settings.DEFAULT_SCALEFREE_M, seed=settings.RANDOM_SEED)

    elif graph_id == 4:  # random
        G = nx.gnp_random_graph(n, settings.DEFAULT_RANDOM_P, seed=settings.RANDOM_SEED)

    else:
        raise ValueError(f"Unknown graph id: {graph_id}")

    # attach default IC & LT weights
    for u, v in G.edges():
        G.edges[u, v]["p"] = 0.01  # IC activation probability
        G.edges[u, v]["weight"] = 1.0 / max(1, G.degree[v])  # LT normalized influence weight

    return G
