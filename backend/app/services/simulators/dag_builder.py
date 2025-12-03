import networkx as nx

def build_local_dag(G, seed_nodes, max_depth=3):
    """
    Constructs a local DAG around selected seed nodes.
    Used for optimized LT evaluation in Local DAG algorithm.

    Returns a directed acyclic subgraph.
    """

    dag = nx.DiGraph()

    frontier = list(seed_nodes)
    visited = set(seed_nodes)

    for depth in range(max_depth):
        next_frontier = []
        for u in frontier:
            for v in G.neighbors(u):
                if v not in visited:
                    visited.add(v)
                    dag.add_edge(u, v)
                    next_frontier.append(v)
        frontier = next_frontier

    return dag
