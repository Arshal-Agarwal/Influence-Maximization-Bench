from app.models.graph_loader import load_graph_by_id
from app.core.exceptions import InvalidGraphError

class GraphService:
    """
    Responsible for retrieving graph structures based on the selected graph ID.
    """

    @staticmethod
    def get_graph(graph_id: int):
        if graph_id not in (1, 2, 3, 4):
            raise InvalidGraphError(graph_id)

        return load_graph_by_id(graph_id)
