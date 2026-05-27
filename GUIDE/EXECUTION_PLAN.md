# ID APP — Execution Plan (from `GUIDE/details.md`)

## 0) Prep / Preconditions
- Ensure Python 3.8+ is installed.
- Ensure MySQL Server is running (localhost reachable).
- Ensure the MySQL root password is known.

## 1) Install dependencies
From your terminal:
- `pip install mysql-connector-python bcrypt rich pyfiglet`

## 2) Create the application package directory
Create a directory (recommended): `id_app_portfolio/`

Place the following files inside it:
- `main.py`
- `database.py`
- `utils.py`
- `auth.py`
- `menu.py`
- `portfolio.py`
- `admin.py`

> Note: The exact code for each file is described in `GUIDE/details.md`.

## 3) Configure MySQL credentials
- Open `database.py`.
- Replace `"your_mysql_password"` with your actual MySQL root password in `DB_CONFIG`.

## 4) Verify module wiring
Check imports match across modules:
- `main.py` imports `init_db` (from `database.py`) and menu bootstrapping (from `menu.py`).
- `menu.py` imports `register_user/login_user/logout_user/Session` (from `auth.py`) and dispatches to `portfolio.py` / `admin.py`.
- All UI helpers come from `utils.py`.

## 5) Bootstrap database + seed data (first run)
- Run: `python main.py`
- `main.py` calls `init_db()` which:
  - Creates database `portfolio_db` if missing
  - Creates tables if missing: `users`, `skills`, `projects`, `experience`, `education`, `certifications`, `messages`
  - Seeds an admin user if no admin exists (admin / admin123)
  - Seeds foundational data into `skills` and `projects` if empty

## 6) Use the CLI UI
### 6.1 Guest access menu
From the first screen:
- Option 1: Login
- Option 2: Register
- Option 3: Exit

### 6.2 Authenticated menu
After login:
- Options 1–6 available to all roles:
  1. About Me
  2. Skills
  3. Projects
  4. Experience & Education
  5. Contact/Message insert into `messages`
  6. Export skills/projects into `id_app_portfolio_backup.json`
- If role is `admin`, options 7–8 are available:
  - Admin panel
  - Logout

## 7) Test admin functionality
Log in with seeded admin credentials:
- Username: `admin`
- Password: `admin123`

Then:
- Option 7: enter admin panel
- Validate:
  - Insert new project
  - Delete project by id
  - View messages
  - Telemetry counts

## 8) Output artifacts to expect
- Database: `portfolio_db` with all tables
- File export: `id_app_portfolio_backup.json` (when selecting menu option 6)

## Common failure points
- MySQL connection error → credentials/host/port mismatch in `database.py`.
- Permission denied → MySQL user lacks rights to create database/tables.
- Empty seed data unexpected → verify `init_db()` ran successfully.

