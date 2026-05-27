# portfolio.py
import json
from database import get_connection
from utils import console, show_ascii_logo, animated_print, get_input
from rich.table import Table


def show_about_me():
    show_ascii_logo("Executive Summary")
    bio_text = (
        "Welcome to ID APP. I am a Senior Architecture Systems Engineer specializing "
        "in optimizing database pipelines, developing native CLI utilities, and robust "
        "backend automation microservices.\n\n"
        "🎯 Core Objective: Developing scalable, zero-trust backend interfaces.\n"
        "⚡ Research Focus: Relational Query Tuning, Network Automation, Cryptographic Frameworks.\n"
        "🏆 Milestones: Architected transactional ledger pipelines handling core infrastructure setups."
    )
    animated_print(bio_text, delay=0.008)
    get_input("\nPress Enter to slide back into main track...")


def show_skills():
    show_ascii_logo("Skill Tracking Indexes")
    conn = get_connection()
    if not conn:
        return

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM skills ORDER BY category")
    skills = cursor.fetchall()
    cursor.close()
    conn.close()

    if not skills:
        console.print("[yellow]No metric data points loaded yet.[/yellow]")
    else:
        current_category = ""
        for skill in skills:
            if skill["category"] != current_category:
                current_category = skill["category"]
                console.print(f"\n[bold magenta]🔸 {current_category}[/bold magenta]")

            proficiency = skill["proficiency"]
            filled_blocks = int(proficiency / 10)
            bar_display = "🟩" * filled_blocks + "⬜" * (10 - filled_blocks)
            console.print(f"  {skill['name']:<25} {bar_display} ({proficiency}%)")

    get_input("\nPress Enter to return...")


def show_projects():
    show_ascii_logo("Project Implementations Engine")
    conn = get_connection()
    if not conn:
        return

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM projects")
    projects = cursor.fetchall()
    cursor.close()
    conn.close()

    if not projects:
        console.print("[yellow]No core technical architectures mapped out yet.[/yellow]")
    else:
        table = Table(title="Live Active Deployments Stack", border_style="cyan")
        table.add_column("ID", style="dim")
        table.add_column("Project Module Title", style="bold green")
        table.add_column("Functional Capabilities")
        table.add_column("Dependencies / Stack", style="yellow")
        table.add_column("Execution State", style="magenta")

        for p in projects:
            table.add_row(str(p["id"]), p["title"], p["description"], p["technologies"], p["status"])
        console.print(table)

    get_input("\nPress Enter to return...")


def show_experience_education():
    show_ascii_logo("Chronology Timelines")
    conn = get_connection()
    if not conn:
        return

    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM experience")
    jobs = cursor.fetchall()
    exp_table = Table(title="Employment Track History", border_style="blue", expand=True)
    exp_table.add_column("Enterprise / Scope", style="bold green")
    exp_table.add_column("Operational Term", style="yellow")
    exp_table.add_column("Functional Domain Accountabilities")
    for j in jobs:
        exp_table.add_row(f"{j['company']}\n({j['role']})", j["duration"], j["responsibilities"])
    console.print(exp_table)
    print("\n")

    cursor.execute("SELECT * FROM education")
    schools = cursor.fetchall()
    edu_table = Table(title="Academic Accreditation Mappings", border_style="green", expand=True)
    edu_table.add_column("Degree Mapping", style="bold cyan")
    edu_table.add_column("Hosting Institution", style="white")
    edu_table.add_column("Metrics Snapshot", style="magenta")
    for s in schools:
        edu_table.add_row(s["degree"], s["institution"], f"Class of {s['year']} | Cumulative GPA: {s['gpa']}")
    console.print(edu_table)

    cursor.close()
    conn.close()
    get_input("\nPress Enter to return...")


def contact_and_message():
    show_ascii_logo("Communications Relay Interface")
    console.print("[bold cyan]Active Identity Endpoint Strings:[/bold cyan]")
    console.print("📧 Network Address:  ops@idapp.internal")
    console.print("🐙 Repo Index:       [github.com/id-app-network](https://github.com/id-app-network)")
    console.print("💼 Network Handle:   [linkedin.com/in/id-app-architecture](https://linkedin.com/in/id-app-architecture)\n")

    choice = get_input("Would you like to write a messaging log segment directly into our database? (y/n): ")
    if choice.lower() == "y":
        name = get_input("Identity Header (Your Name): ")
        email = get_input("Routing Mail Header (Your Email): ")
        msg = get_input("Message Payload Content: ")

        conn = get_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO messages (sender_name, sender_email, message) VALUES (%s, %s, %s)",
                (name, email, msg),
            )
            conn.commit()
            cursor.close()
            conn.close()
            console.print("[green]✔ Transaction complete. Message payload appended securely to infrastructure logs.[/green]")
            get_input("\nPress Enter to continue...")


def export_portfolio_to_json():
    """Extracts system attributes and compiles an external structured backup JSON mapping file."""
    show_ascii_logo("Local JSON Exporter Utility")
    console.print("[yellow]Scoping configuration states and building local structural mirror backup...[/yellow]\n")

    conn = get_connection()
    if not conn:
        console.print("[red]Database sync failed. Process halted.[/red]")
        return

    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT name, category, proficiency FROM skills")
        skills_data = cursor.fetchall()

        cursor.execute("SELECT title, description, technologies, status FROM projects")
        projects_data = cursor.fetchall()

        export_structure = {
            "application_signature": "ID APP Engine Export",
            "file_schema_version": "2.1.0",
            "extracted_skills": skills_data,
            "extracted_projects": projects_data,
        }

        output_target = "id_app_portfolio_backup.json"
        with open(output_target, "w", encoding="utf-8") as target_file:
            json.dump(export_structure, target_file, indent=4)

        console.print(
            f"[green]✔ Export Complete! Archive written locally to [bold white]{output_target}[/bold white][/green]"
        )

    except Exception as e:
        console.print(f"[red]Error parsing database records stream: {e}[/red]")
    finally:
        cursor.close()
        conn.close()

    get_input("\nPress Enter to safely exit file pipeline...")

