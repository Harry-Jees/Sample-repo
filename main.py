# main.py
import sys
from database import init_db
from utils import console, show_ascii_logo, simulate_loading
from menu import guest_authentication_menu


def run_application_bootstrap():
    """Initial environment validation scanner binding connection sequences before showing UI assets."""
    show_ascii_logo("Core Bootstrapping Engine")
    console.print(
        "[yellow]Verifying storage schema configuration profiles and local database integrity rules...[/yellow]"
    )

    # Execute structural table setup verification checks from database layer
    if not init_db():
        console.print("[bold red]Fatal Environment Error Found:[/bold red] Application schema mapping failed.")
        console.print("[white]Fix action: Ensure host and credential configurations in database.py are accurate.[/white]")
        sys.exit(1)

    simulate_loading("Configuration checks successful. Routing interface tracking maps live...")
    guest_authentication_menu()


if __name__ == "__main__":
    run_application_bootstrap()

