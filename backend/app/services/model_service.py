from app.models.diffusion_ic import run_ic_once
from app.models.diffusion_lt import run_lt_once
from app.core.exceptions import InvalidModelError

class ModelService:
    """
    Maps model name to diffusion simulation function.
    """

    @staticmethod
    def get_model_runner(model: str):
        if model == "ic":
            return run_ic_once
        if model == "lt":
            return run_lt_once

        raise InvalidModelError(model)
