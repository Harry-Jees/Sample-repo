# admin.py
from database import get_connection
from utils import console, show_ascii_logo, get_input
from auth import Session
from rich.table import Table


def run_admin_panel():
    """Privileged control module loop protecting modification tracks."""
    if Session.role != "admin":
        console.print("[red]Security Error: Privilege validation missing. Access Blocked.[/red]")
        get_input("\nPress Enter to escape security block...")
        return

    while True:
        show_ascii_logo("Operator Root Admin Panel")
        console.print("1. Inject New Project Record")
        console.print("2. Delete Target Project Element")
        console.print("3. Audit Guest Message Log Packets")
        console.print("4. Review Global Telemetry Performance Metrics")
        console.print("5. Drop Privileges & Slide Back to User Space")

        choice = get_input("\nInput operational track sequence index: ")

        if choice == "1":
            title = get_input("Project Label/Title: ")
            desc = get_input("Capabilities Blueprint (Description): ")
            text = get_input("Dependencies Architecture Stack Array (Comma separated): ")
            link = get_input("Repository Link: ")

            conn = get_connection()
            if conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO projects (title, description, technologies, github_link) VALUES (%s, %s, %s, %s)",
                    (title, desc, text, link),
                )
                conn.commit()
                cursor.close()
                conn.close()
                console.print("[green]Project profile integrated into active data pool safely.[/green]")
                get_input("\nPress Enter to reset state...")

        elif choice == "2":
            proj_id = get_input("Target Structural Database Record ID to purge: ")
            conn = get_connection()
            if conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM projects WHERE id = %s", (proj_id,))
                conn.commit()
                cursor.close()
                conn.close()
                console.print("[green]Target item wiped from primary database references cleanly.[/green]")
                get_input("\nPress Enter to clear screen view...")

        elif choice == "3":
            show_ascii_logo("Incoming Visitor Communications Queue")
            conn = get_connection()
            if conn:
                cursor = conn.cursor(dictionary=True)
                cursor.execute("SELECT * FROM messages")
                messages_list = cursor.fetchall()

                table = Table(border_style="magenta")
                table.add_column("Identity Header")
                table.add_column("Routing Email Context")
                table.add_column("Payload Message Body")

                for m in messages_list:
                    table.add_row(m["sender_name"], m["sender_email"], m["message"])
                console.print(table)
                cursor.close()
                conn.close()
            get_input("\nPress Enter to continue auditing tracking sequence...")

        elif choice == "4":
            show_ascii_logo("System Analytics Monitor Tracking")
            conn = get_connection()
            if conn:
                cursor = conn.cursor()
                cursor.execute("SELECT COUNT(*) FROM users")
                uc = cursor.fetchone()[0]
                cursor.execute("SELECT COUNT(*) FROM projects")
                pc = cursor.fetchone()[0]
                cursor.execute("SELECT COUNT(*) FROM messages")
                mc = cursor.fetchone()[0]

                console.print(f"[bold cyan]Total Registered User Nodes Matrix Tracking Users:[/bold cyan] {uc}")
                console.print(f"[bold green]Total Operational Projects Active Entries:[/bold green] {pc}")
                console.print(f"[bold yellow]Total Message Stack Data Packets Logged:[/bold yellow] {mc}")
                cursor.close()
                conn.close()
            get_input("\nPress Enter to recycle view loop...")

        elif choice == "5":
            break

