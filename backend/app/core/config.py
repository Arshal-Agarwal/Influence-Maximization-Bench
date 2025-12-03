from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Global application configuration.

    All values here can be overridden using environment variables,
    making the backend production-ready without changing code.
    """

    # App metadata
    APP_NAME: str = "Influence Maximization API"
    ENV: str = "development"

    # Default graph generation parameters
    DEFAULT_NODES: int = 1024
    DEFAULT_SPARSE_EDGES: int = 4096
    DEFAULT_DENSE_EDGES: int = 8192
    DEFAULT_RANDOM_P: float = 0.01
    DEFAULT_SCALEFREE_M: int = 4

    # Default simulation configuration
    DEFAULT_SEED_SIZE: int = 10
    DEFAULT_MC_ITERATIONS: int = 1000
    RANDOM_SEED: int = 42

    class Config:
        env_file = ".env"  # load environment overrides from a .env file

# Singleton instance used throughout backend
settings = Settings()
