🚀 ID APP — Interactive CLI Portfolio ApplicationWelcome to the complete documentation, architecture specification, and full source code repository for ID APP, a fully interactive, production-grade, and secure Command-Line Interface (CLI) Portfolio Application built with Python 3 and a MySQL database backend.📋 Table of ContentsProject OverviewArchitecture & Folder StructureDatabase Schema DesignSecurity ImplementationsPrerequisites & InstallationComplete Step-by-Step Source Codemain.pydatabase.pyutils.pyauth.pymenu.pyportfolio.pyadmin.pyStep-by-Step Execution GuideNext Steps for Claude Expansion🌟 Project OverviewID APP transforms a traditional personal developer portfolio website into a fast, professional, and visually engaging terminal-driven utility. Designed with a clean, modular architecture, the system balances beginner-friendly logical separations with industry-standard patterns such as:Role-Based Access Control (RBAC): Separate interactive capabilities for standard visitors (user) and structural operators (admin).Persistent Storage Integration: Fully database-backed using parameterized MySQL operations.Modern Terminal UI Mechanics: Handled via the rich rendering engine and custom ASCII typography via pyfiglet.State Management: Session tracker context keeping execution simple without relying on messy global variables.📂 Architecture & Folder StructureThe code is strictly decoupled into independent logical domains to prevent merge conflicts and spaghetti dependencies:id_app_portfolio/
│
├── main.py          # Application Bootstrap Engine & Initialization Logic
├── database.py      # Connection Lifecycles & Automated Database Schema Initialization
├── auth.py          # Identity Verification, Registration, and Password Cryptography
├── menu.py          # Unified Routing System & Flow Control Switches
├── portfolio.py     # Public Facing Dynamic Portfolio Readers & Exporter Components
├── admin.py         # Privileged CRUD Operators, Telemetry Counters & Logs Viewer
└── utils.py         # Terminal Screen Mechanics, ASCII Logo Generators & Shared IO
🗄️ Database Schema DesignThe target MySQL schema automatically implements relational parameters when launched. Below is the technical breakdown:users: Stores system accounts. password_hash uses standard 60-character bcrypt strings. Role configurations are structured as an explicit ENUM('user', 'admin').skills: Stores developer technical matrices matching an ENUM categorization scheme along with strict integer proficiency metrics ranging from 0 to 100.projects: Manages live developer work targets with persistent links and project lifecycles status definitions.experience & education: Retains professional timeline items and metrics securely.certifications: Tracks educational badges with structural link validation tracking.messages: Storage pipeline capturing dynamic form submissions dispatched by guest users during live interactions.🔒 Security ImplementationsPassword Salting and Hashing: Plaintext credentials never interact with the database engine. bcrypt handles high-factor cryptographic salt processing natively.SQL Injection Prevention: Every query structure throughout ID APP implements strict Parameterized SQL execution via tuple bindings (%s), stopping malicious data injections.Fail-Safe Exception Handling: Broad or localized SQL connectivity issues do not cause application crashes; instead, failures are gracefully abstracted into clean Rich terminal alert indicators.🛠️ Prerequisites & Installation1. Python & Core DependenciesEnsure Python 3.8+ is configured locally. Install required Python packages via pip:pip install mysql-connector-python bcrypt rich pyfiglet
2. MySQL Server ExecutionEnsure a functional instance of MySQL Server is active on your machine (e.g., Localhost via standard ports). Keep your default root access password accessible for configuration in the code below.💻 Complete Step-by-Step Source CodeCopy each code segment below into its designated workspace file.1. database.py# database.py
import mysql.connector
from mysql.connector import Error
import bcrypt

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "your_mysql_password",  # ⚠️ CHANGE THIS to your actual MySQL root password
}
DB_NAME = "portfolio_db"

def get_connection(include_db=True):
    """Establishes and returns a connection connection to the MySQL server."""
    try:
        config = DB_CONFIG.copy()
        if include_db:
            config["database"] = DB_NAME
        conn = mysql.connector.connect(**config)
        return conn
    except Error as e:
        print(f"[Error] Failed to connect to MySQL instance: {e}")
        return None

def init_db():
    """Creates the target database and auto-provisions all entity data tables if missing."""
    conn = get_connection(include_db=False)
    if not conn:
        return False
    
    cursor = conn.cursor()
    try:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        conn.commit()
    except Error as e:
        print(f"Error executing database auto-generation: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

    # Establish localized target database structural context
    conn = get_connection(include_db=True)
    if not conn:
        return False
    
    cursor = conn.cursor()
    
    tables = {
        "users": """
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('user', 'admin') DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """,
        "skills": """
            CREATE TABLE IF NOT EXISTS skills (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                category ENUM('Programming Languages', 'Web Development', 'Databases', 'Tools & Technologies') NOT NULL,
                proficiency INT DEFAULT 0
            )
        """,
        "projects": """
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL,
                description TEXT,
                technologies VARCHAR(255),
                github_link VARCHAR(255),
                status VARCHAR(50) DEFAULT 'Completed'
            )
        """,
        "experience": """
            CREATE TABLE IF NOT EXISTS experience (
                id INT AUTO_INCREMENT PRIMARY KEY,
                company VARCHAR(100) NOT NULL,
                role VARCHAR(100) NOT NULL,
                duration VARCHAR(50),
                responsibilities TEXT
            )
        """,
        "education": """
            CREATE TABLE IF NOT EXISTS education (
                id INT AUTO_INCREMENT PRIMARY KEY,
                degree VARCHAR(100) NOT NULL,
                institution VARCHAR(100) NOT NULL,
                year VARCHAR(20),
                gpa VARCHAR(10)
            )
        """,
        "certifications": """
            CREATE TABLE IF NOT EXISTS certifications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                provider VARCHAR(100),
                completion_date VARCHAR(50),
                link VARCHAR(255)
            )
        """,
        "messages": """
            CREATE TABLE IF NOT EXISTS messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                sender_name VARCHAR(100),
                sender_email VARCHAR(100),
                message TEXT,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """
    }

    try:
        for name, query in tables.items():
            cursor.execute(query)
        conn.commit()
        
        # Auto-seed primary admin operator if matching profiles are empty
        cursor.execute("SELECT * FROM users WHERE role = 'admin'")
        if not cursor.fetchone():
            hashed_pw = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            cursor.execute(
                "INSERT INTO users (username, email, password_hash, role) VALUES (%s, %s, %s, 'admin')",
                ("admin", "admin@idapp.com", hashed_pw)
            )
            conn.commit()
            
        # Seed foundational portfolio data objects if application is completely fresh
        cursor.execute("SELECT COUNT(*) FROM skills")
        if cursor.fetchone()[0] == 0:
            cursor.execute("""
                INSERT INTO skills (name, category, proficiency) VALUES 
                ('Python', 'Programming Languages', 95),
                ('SQL / Database Tuning', 'Databases', 88),
                ('FastAPI Integration', 'Web Development', 85),
                ('Docker Architecture', 'Tools & Technologies', 80)
            """)
            cursor.execute("""
                INSERT INTO projects (title, description, technologies, github_link, status) VALUES 
                ('ID APP Core Engine', 'An interactive command line interface system leveraging Python, MySQL, and Rich.', 'Python, MySQL, Rich Tools', '[https://github.com/id-app/cli-engine](https://github.com/id-app/cli-engine)', 'Active Production')
            """)
            conn.commit()
            
        return True
    except Error as e:
        print(f"Error mapping data tables initialization: {e}")
        return False
    finally:
        cursor.close()
        conn.close()
2. utils.py# utils.py
import os
import time
import pyfiglet
from rich.console import Console
from rich.panel import Panel
from rich.text import Text

console = Console()

def clear_screen():
    """Clears execution shell window completely."""
    os.system('cls' if os.name == 'nt' else 'clear')

def show_ascii_logo(section_title=""):
    """Generates the branded ID APP ASCII art banner and displays active section header subtitles."""
    clear_screen()
    
    # Render ASCII logo block
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
3. auth.py# auth.py
import re
import bcrypt
from database import get_connection
from utils import console

class Session:
    """Global application reference space keeping path data safe during navigation states."""
    user_id = None
    username = None
    role = None

def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None

def register_user(username, email, password, confirm_password):
    """Safely validates, hashes, and provisions standard profile accounts into MySQL."""
    if not username or not email or not password:
        console.print("[red]Input tracking blocks cannot contain blank space.[/red]")
        return False
        
    if password != confirm_password:
        console.print("[red]Verification checks failed. Passwords do not match.[/red]")
        return False

    if not is_valid_email(email):
        console.print("[red]Format error. Email signature context invalid.[/red]")
        return False

    conn = get_connection()
    if not conn:
        return False
    
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id FROM users WHERE username = %s OR email = %s", (username, email))
        if cursor.fetchone():
            console.print("[red]Identity collision. Username or tracking email already captured.[/red]")
            return False
        
        # Crypto Hash Creation block
        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        cursor.execute(
            "INSERT INTO users (username, email, password_hash, role) VALUES (%s, %s, %s, 'user')",
            (username, email, hashed_pw)
        )
        conn.commit()
        console.print("[green]Account allocation process completed successfully![/green]")
        return True
    except Exception as e:
        console.print(f"[red]Execution trace failed during pipeline updates: {e}[/red]")
        return False
    finally:
        cursor.close()
        conn.close()

def login_user(username_or_email, password):
    """Verifies credential variables against salted database hash patterns safely."""
    conn = get_connection()
    if not conn:
        return False
        
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute(
            "SELECT * FROM users WHERE username = %s OR email = %s", 
            (username_or_email, username_or_email)
        )
        user = cursor.fetchone()
        
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
            Session.user_id = user['id']
            Session.username = user['username']
            Session.role = user['role']
            return True
        return False
    except Exception as e:
        console.print(f"[red]Security scanning phase error caught: {e}[/red]")
        return False
    finally:
        cursor.close()
        conn.close()

def logout_user():
    """Clears current authentication tracking session context."""
    Session.user_id = None
    Session.username = None
    Session.role = None
4. portfolio.py# portfolio.py
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
    if not conn: return
    
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
            if skill['category'] != current_category:
                current_category = skill['category']
                console.print(f"\n[bold magenta]🔸 {current_category}[/bold magenta]")
            
            proficiency = skill['proficiency']
            filled_blocks = int(proficiency / 10)
            bar_display = "🟩" * filled_blocks + "⬜" * (10 - filled_blocks)
            console.print(f"  {skill['name']:<25} {bar_display} ({proficiency}%)")
            
    get_input("\nPress Enter to return...")

def show_projects():
    show_ascii_logo("Project Implementations Engine")
    conn = get_connection()
    if not conn: return
    
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
            table.add_row(str(p['id']), p['title'], p['description'], p['technologies'], p['status'])
        console.print(table)
        
    get_input("\nPress Enter to return...")

def show_experience_education():
    show_ascii_logo("Chronology Timelines")
    conn = get_connection()
    if not conn: return
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM experience")
    jobs = cursor.fetchall()
    exp_table = Table(title="Employment Track History", border_style="blue", expand=True)
    exp_table.add_column("Enterprise / Scope", style="bold green")
    exp_table.add_column("Operational Term", style="yellow")
    exp_table.add_column("Functional Domain Accountabilities")
    for j in jobs:
        exp_table.add_row(f"{j['company']}\n({j['role']})", j['duration'], j['responsibilities'])
    console.print(exp_table)
    
    print("\n")
    
    cursor.execute("SELECT * FROM education")
    schools = cursor.fetchall()
    edu_table = Table(title="Academic Accreditation Mappings", border_style="green", expand=True)
    edu_table.add_column("Degree Mapping", style="bold cyan")
    edu_table.add_column("Hosting Institution", style="white")
    edu_table.add_column("Metrics Snapshot", style="magenta")
    for s in schools:
        edu_table.add_row(s['degree'], s['institution'], f"Class of {s['year']} | Cumulative GPA: {s['gpa']}")
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
    if choice.lower() == 'y':
        name = get_input("Identity Header (Your Name): ")
        email = get_input("Routing Mail Header (Your Email): ")
        msg = get_input("Message Payload Content: ")
        
        conn = get_connection()
        if conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO messages (sender_name, sender_email, message) VALUES (%s, %s, %s)",
                (name, email, msg)
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
            "extracted_projects": projects_data
        }
        
        output_target = "id_app_portfolio_backup.json"
        with open(output_target, "w") as target_file:
            json.dump(export_structure, target_file, indent=4)
            
        console.print(f"[green]✔ Export Complete! Archive written locally to [bold white]{output_target}[/bold white][/green]")
        
    except Exception as e:
        console.print(f"[red]Error parsing database records stream: {e}[/red]")
    finally:
        cursor.close()
        conn.close()
        
    get_input("\nPress Enter to safely exit file pipeline...")
5. admin.py# admin.py
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
                    (title, desc, text, link)
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
                    table.add_row(m['sender_name'], m['sender_email'], m['message'])
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
6. menu.py# menu.py
from utils import show_ascii_logo, get_input, console, simulate_loading
from auth import register_user, login_user, logout_user, Session
import portfolio
import admin

def guest_authentication_menu():
    """Initial application loop routing users through access security verification tracks."""
    while True:
        show_ascii_logo("Gateway Access Shell")
        console.print("1. Establish Account Session Login")
        console.print("2. Deploy New Account Profile (Register)")
        console.print("3. Close Access Pipeline Framework (Exit)")
        
        choice = get_input("\nSelect path indexing integer: ")
        
        if choice == "1":
            user_or_email = get_input("Username or Verified Profile Mail: ")
            password = get_input("Authorization Access Key Passcode: ", is_password=True)
            simulate_loading("Performing hash validations and security scans...")
            
            if login_user(user_or_email, password):
                console.print(f"[green]Verification Success. Token match verified. Access Granted: Welcome {Session.username}.[/green]")
                get_input("\nPress Enter to launch dashboard track workspace...")
                authenticated_portfolio_menu()
            else:
                console.print("[red]Security Event: Handshake failure. Provided credentials did not match record hash.[/red]")
                get_input("\nPress Enter to cycle parameters...")
                
        elif choice == "2":
            uname = get_input("Set Handle/Username: ")
            email = get_input("Set Tracking Mail Address: ")
            pword = get_input("Generate Security Cipher Password: ", is_password=True)
            conf_pword = get_input("Confirm Security Cipher Matching Sequence: ", is_password=True)
            
            simulate_loading("Encrypting parameters and creating database entries...")
            register_user(uname, email, pword, conf_pword)
            get_input("\nPress Enter to move onward...")
            
        elif choice == "3":
            show_ascii_logo("Application Terminated Safely")
            break

def authenticated_portfolio_menu():
    """Core operational terminal menu workspace accessible only post authorization."""
    while True:
        show_ascii_logo(f"Main Interface Controller Workspace | Operator: {Session.username}")
        console.print("1. 👤 Executive Summary Profile (About Me)")
        console.print("2. 📊 Skill Matrices & Competency Arrays")
        console.print("3. 💻 Microservices Portfolio (Projects Table)")
        console.print("4. 🎓 Chronological Timelines (Experience & Education)")
        console.print("5. 📧 Outgoing Message Dispatch Engine (Contact Operator)")
        console.print("6. 📂 Export Application State Snapshot (JSON Backup)")
        
        if Session.role == "admin":
            console.print("7. ⚙️ Root Privilege Admin Control Shell")
            console.print("8. 🔓 Terminate Active Session Token (Logout)")
        else:
            console.print("7. 🔓 Terminate Active Session Token (Logout)")
            
        choice = get_input("\nSelect destination routing parameter value: ")
        
        if choice == "1":
            portfolio.show_about_me()
        elif choice == "2":
            portfolio.show_skills()
        elif choice == "3":
            portfolio.show_projects()
        elif choice == "4":
            portfolio.show_experience_education()
        elif choice == "5":
            portfolio.contact_and_message()
        elif choice == "6":
            portfolio.export_portfolio_to_json()
        elif choice == "7":
            if Session.role == "admin":
                admin.run_admin_panel()
            else:
                logout_user()
                break
        elif choice == "8" and Session.role == "admin":
            logout_user()
            break
7. main.py# main.py
import sys
from database import init_db
from utils import console, show_ascii_logo, simulate_loading
from menu import guest_authentication_menu

def run_application_bootstrap():
    """Initial environment validation scanner binding connection sequences before showing UI assets."""
    show_ascii_logo("Core Bootstrapping Engine")
    console.print("[yellow]Verifying storage schema configuration profiles and local database integrity rules...[/yellow]")
    
    # Execute structural table setup verification checks from database layer
    if not init_db():
        console.print("[bold red]Fatal Environment Error Found:[/bold red] Application schema mapping failed.")
        console.print("[white]Fix action: Ensure host and credential configurations in database.py are accurate.[/white]")
        sys.exit(1)
        
    simulate_loading("Configuration checks successful. Routing interface tracking maps live...")
    guest_authentication_menu()

if __name__ == "__main__":
    run_application_bootstrap()
🚀 Step-by-Step Execution GuideStep 1: Update local authentication propertiesOpen your newly created database.py file and navigate to line 7. Swap out "your_mysql_password" with the true string password powering your local MySQL server runtime.Step 2: Initialize Database and Start AppExecute the main program via terminal:python main.py
The application will automatically connect to MySQL, verify if portfolio_db is initialized, inject all 7 entity structure tables, provision core seed data, and then present the interface gateway.Step 3: Access Administrative PowersLog in with the root account seeded automatically:Username: adminPassword: admin123Navigate to option 7 to test your live admin operations dashboard (create/delete project blocks or view user trace payload strings directly).🤖 Next Steps for Claude ExpansionWhen you import this blueprint documentation into your Claude expansion window workspace session, consider utilizing these functional tracking expansion paths to easily build out deeper structural modules:Integrated AI Assistant Panel: Use Claude to help write an extra script module called chatbot.py that utilizes a lightweight local model API connector, allowing guest users to text questions directly inside the app menu to get instant feedback about your CV.Dynamic HTML Resume Builder: Map out an exporter tool inside portfolio.py that dumps portfolio items directly into standard CSS files to print customized PDF paper resumes instantly on demand.Keyboard Arrow Shortcut Selection Loops: Convert standard console numeric menu inputs into direct layout selections utilizing Python packages like bullet or pick.