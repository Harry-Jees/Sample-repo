# menu.py
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
                console.print(
                    f"[green]Verification Success. Token match verified. Access Granted: Welcome {Session.username}.[/green]"
                )
                get_input("\nPress Enter to launch dashboard track workspace...")
                authenticated_portfolio_menu()
            else:
                console.print(
                    "[red]Security Event: Handshake failure. Provided credentials did not match record hash.[/red]"
                )
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

