# app/utils/graph_to_cytoscape.py

import networkx as nx

def graph_to_cytoscape(G: nx.Graph, seed_set, influenced_set=None):
    """
    Convert a NetworkX graph into Cytoscape-compatible JSON.
    - seed_set: list of seed nodes (ints)
    - influenced_set: nodes activated by the diffusion process (optional)
    """
    influenced_set = influenced_set or set()

    # Stable layout so graph looks same each run
    pos = nx.spring_layout(G, seed=42)

    # Build nodes
    nodes = []
    for n in G.nodes:
        nodes.append({
            "data": {
                "id": str(n),
                "label": str(n),
                "degree": G.degree[n],
                "isSeed": n in seed_set,
                "isInfluenced": n in influenced_set,
            },
            "position": {
                "x": float(pos[n][0] * 500),
                "y": float(pos[n][1] * 500),
            }
        })

    # Build edges
    edges = []
    for u, v, data in G.edges(data=True):
        edges.append({
            "data": {
                "source": str(u),
                "target": str(v),
                "weight": float(data.get("weight", 0.1)),
                "activated": False  # default: no activation path
            }
        })

    return {
        "nodes": nodes,
        "edges": edges
    }
