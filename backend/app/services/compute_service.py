import uuid
from app.services.graph_service import GraphService
from app.services.model_service import ModelService
from app.services.algorithm_service import AlgorithmService

from app.services.simulators.mc_simulator import monte_carlo_spread
from app.storage.run_cache import RunCache
from app.storage.result_store import ResultStore
from app.core.exceptions import ComputationFailedError

run_cache = RunCache()
result_store = ResultStore()


class ComputeService:
    """
    Orchestrates:
      - Graph loading
      - Algorithm execution (seed selection)
      - Model selection (IC/LT)
      - Monte Carlo evaluation
      - Result caching
    """

    @staticmethod
    async def run_im(payload):
        try:
            run_id = str(uuid.uuid4())

            # ----------------------------
            # 1. Load graph
            # ----------------------------
            G = GraphService.get_graph(payload.graph)

            # ----------------------------
            # 2. Select algorithm
            # ----------------------------
            algo_fn = AlgorithmService.get_algorithm(
                payload.model,
                payload.algorithm
            )

            # ----------------------------
            # 3. Select diffusion model
            # ----------------------------
            model_runner = ModelService.get_model_runner(payload.model)

            # ----------------------------
            # 4. Compute seed set
            #    (Algorithms expect MC evaluator optionally)
            # ----------------------------
            seed_set = algo_fn(
                G,
                payload.seedSize,
                model_runner=model_runner,
                mc_evaluator=monte_carlo_spread,
                iterations=payload.iterations
            )

            # ----------------------------
            # 5. Monte Carlo evaluation of seed set
            # ----------------------------
            # snippet inside ComputeService.run_im after mc_result is returned
            mc_result = monte_carlo_spread(
                G,
                seed_set,
                model_runner,
                iterations=payload.iterations,
                seed=42
            )

            result = {
                "run_id": run_id,
                "seed_set": seed_set,
                "spread": mc_result["mean_spread"],
                "variance": mc_result["variance"],     # <-- now filled
                "runtime": mc_result["runtime"],
                "operations": mc_result["ops"],
                "graph": {
                    "nodes": G.number_of_nodes(),
                    "edges": G.number_of_edges()
                }
            }

            # ----------------------------
            # 7. Save results
            # ----------------------------
            run_cache.store(run_id, result)
            result_store.set_meta(run_id, mc_result)
            result_store.add_log(run_id, f"Run completed for {payload.algorithm}")

            return result

        except Exception as e:
            raise ComputationFailedError(str(e))
