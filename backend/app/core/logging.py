import logging

def configure_logging():
    """
    Configure application-wide logging.

    - Ensures consistent log format across all modules
    - Used by algorithm execution, graph loading, simulations, etc.
    - Keeps logs simple during development and expandable in production
    """
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )

    # Optional: reduce noise from uvicorn access logs
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
