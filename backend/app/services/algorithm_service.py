from app.algorithms.ic.degree_discount import run as ic_degree_discount
from app.algorithms.ic.greedy import run as ic_greedy
from app.algorithms.ic.greedy_dp import run as ic_greedy_dp
from app.algorithms.ic.heuristic import run as ic_heuristic
from app.algorithms.ic.bruteforce import run as ic_bruteforce

from app.algorithms.lt.bruteforce import run as lt_bruteforce
from app.algorithms.lt.naive_greedy import run as lt_naive_greedy
from app.algorithms.lt.greedy_storage import run as lt_greedy_storage
from app.algorithms.lt.local_dag import run as lt_local_dag

from app.core.exceptions import AlgorithmNotSupportedError


class AlgorithmService:
    """
    Maps (model, algorithm_name) → actual algorithm implementation.
    """

    @staticmethod
    def get_algorithm(model: str, algorithm: str):
        model = model.lower()
        algorithm = algorithm.lower()

        # ---------------------
        # IC Algorithms
        # ---------------------
        if model == "ic":
            mapping = {
                "bruteforce": ic_bruteforce,
                "greedy": ic_greedy,
                "greedy_dp": ic_greedy_dp,
                "heuristic": ic_heuristic,
                "degree_discount": ic_degree_discount,
            }
            if algorithm in mapping:
                return mapping[algorithm]
            raise AlgorithmNotSupportedError(algorithm, model)

        # ---------------------
        # LT Algorithms
        # ---------------------
        if model == "lt":
            mapping = {
                "bruteforce": lt_bruteforce,
                "naive_greedy": lt_naive_greedy,
                "greedy_storage": lt_greedy_storage,
                "local_dag": lt_local_dag,
            }
            if algorithm in mapping:
                return mapping[algorithm]
            raise AlgorithmNotSupportedError(algorithm, model)

        raise AlgorithmNotSupportedError(algorithm, model)
