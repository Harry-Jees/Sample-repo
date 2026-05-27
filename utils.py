# utils.py
import os
import time
import pyfiglet
from rich.console import Console
from rich.panel import Panel
from rich.text import Text

console = Console()


def clear_screen():
    """Clears execution shell window completely."""
    os.system("cls" if os.name == "nt" else "clear")


def show_ascii_logo(section_title=""):
    """Generates the branded ID APP ASCII art banner and displays active section header subtitles."""
    clear_screen()

    ascii_logo = pyfiglet.figlet_format("ID APP", font="slant")
    styled_logo = Text(ascii_logo, style="bold cyan")

    if section_title:
        styled_logo.append(f"\n⚡ {section_title.upper()} ⚡\n", style="bold yellow")

    console.print(Panel(styled_logo, border_style="blue", expand=False), justify="center")
    print("\n")


def simulate_loading(message="Parsing transaction stream..."):
    """Invokes a clean progress block rendering process to mimic terminal processes."""
    with console.status(f"[bold yellow]{message}[/bold yellow]", spinner="dots"):
        time.sleep(1.2)


def animated_print(text, delay=0.01, style="white"):
    """Displays output components via an adjustable typewriter text effect."""
    words = text.split(" ")
    for word in words:
        console.print(word, end=" ", style=style, flush=True)
        time.sleep(delay)
    print()


def get_input(prompt, is_password=False):
    """Captures sanitized terminal input strings."""
    if is_password:
        return console.input(f"[bold yellow]{prompt}[/bold yellow]", password=True).strip()
    return console.input(f"[bold green]{prompt}[/bold green]").strip()

