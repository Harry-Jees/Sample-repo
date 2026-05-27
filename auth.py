# auth.py
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

        hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

        cursor.execute(
            "INSERT INTO users (username, email, password_hash, role) VALUES (%s, %s, %s, 'user')",
            (username, email, hashed_pw),
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
            (username_or_email, username_or_email),
        )
        user = cursor.fetchone()

        if user and bcrypt.checkpw(password.encode("utf-8"), user["password_hash"].encode("utf-8")):
            Session.user_id = user["id"]
            Session.username = user["username"]
            Session.role = user["role"]
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

