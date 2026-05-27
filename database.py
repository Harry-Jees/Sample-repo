# database.py
import mysql.connector
from mysql.connector import Error
import bcrypt

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    # ⚠️ UPDATE THIS to your actual MySQL root password
    "password": "your_mysql_password",

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
        """,
    }

    try:
        for _, query in tables.items():
            cursor.execute(query)
        conn.commit()

        # Auto-seed primary admin operator if matching profiles are empty
        cursor.execute("SELECT * FROM users WHERE role = 'admin'")
        if not cursor.fetchone():
            hashed_pw = bcrypt.hashpw("admin123".encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
            cursor.execute(
                "INSERT INTO users (username, email, password_hash, role) VALUES (%s, %s, %s, 'admin')",
                ("admin", "admin@idapp.com", hashed_pw),
            )
            conn.commit()

        # Seed foundational portfolio data objects if application is completely fresh
        cursor.execute("SELECT COUNT(*) FROM skills")
        if cursor.fetchone()[0] == 0:
            cursor.execute(
                """
                INSERT INTO skills (name, category, proficiency) VALUES 
                ('Python', 'Programming Languages', 95),
                ('SQL / Database Tuning', 'Databases', 88),
                ('FastAPI Integration', 'Web Development', 85),
                ('Docker Architecture', 'Tools & Technologies', 80)
            """
            )
            cursor.execute(
                """
                INSERT INTO projects (title, description, technologies, github_link, status) VALUES 
                ('ID APP Core Engine', 'An interactive command line interface system leveraging Python, MySQL, and Rich.', 'Python, MySQL, Rich Tools', 'https://github.com/id-app/cli-engine', 'Active Production')
            """
            )
            conn.commit()

        return True
    except Error as e:
        print(f"Error mapping data tables initialization: {e}")
        return False
    finally:
        cursor.close()
        conn.close()

