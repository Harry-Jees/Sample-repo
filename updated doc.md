# Updated Doc — Repo TODO/Tasks Categorization + Running Update Log

(Per-request behavior: keep the update log sections empty until each update is completed.)

## How this doc is organized
- Sections categorize existing `GUIDE/*.md` files by the execution task they belong to.
- After each categorization update is completed, the update is appended here.


---

## Step A — Inventory & categorize all repo Markdown docs
**Detected Markdown files under `GUIDE/`:**
- `details.md`
- `EXECUTION_PLAN.md`
- `README.md`
- `task-1-parse-details-and-confirm-scope.md`
- `task-2-create-execution-plan.md`
- `task-3-create-todo-items.md`
- `task-completion-summary.md`
- `TODO-setup-instructions.md`
- `TODO-build-module-files.md`
- `TODO-config-mysql-connection.md`
- `TODO-run-first-time-bootstrap.md`
- `TODO-verify-cli-flows.md`
- `TODO-test-admin-panel.md`
- `TODO-validate-json-export.md`
- `TODO-document-troubleshooting.md`

### Categorization
#### 1) App blueprint / requirements source
- `GUIDE/details.md`

#### 2) Execution plan (top-level runbook)
- `GUIDE/EXECUTION_PLAN.md`

#### 3) Task scaffolding docs (meta-planning)
- `GUIDE/task-1-parse-details-and-confirm-scope.md`
- `GUIDE/task-2-create-execution-plan.md`
- `GUIDE/task-3-create-todo-items.md`
- `GUIDE/task-completion-summary.md`

#### 4) Per-step TODOs (implementation run checklist)
Mapped to the step list embedded in `GUIDE/details.md`:
- Step 0/1-ish: prerequisites & installation
  - `GUIDE/TODO-setup-instructions.md`
- Build the module files
  - `GUIDE/TODO-build-module-files.md`
- Configure DB connection credentials
  - `GUIDE/TODO-config-mysql-connection.md`
- Run first-time bootstrap + verify schema/seed
  - `GUIDE/TODO-run-first-time-bootstrap.md`
- Verify CLI flows
  - `GUIDE/TODO-verify-cli-flows.md`
- Test admin panel (RBAC + CRUD)
  - `GUIDE/TODO-test-admin-panel.md`
- Validate JSON export
  - `GUIDE/TODO-validate-json-export.md`
- Troubleshooting / failure modes
  - `GUIDE/TODO-document-troubleshooting.md`


---

## Step B — Summarize each TODO by feature area

### TODO-setup-instructions.md (Install + MySQL preflight)
- Python dependencies
- MySQL server running
- root password availability

### TODO-build-module-files.md (Create repo/module structure)
- Create `id_app_portfolio/` directory
- Create: `main.py`, `database.py`, `utils.py`, `auth.py`, `menu.py`, `portfolio.py`, `admin.py`
- Ensure imports resolve and bootstrap reaches DB init

### TODO-config-mysql-connection.md (DB_CONFIG wiring)
- Update `database.py` password in `DB_CONFIG`
- Ensure `DB_NAME = "portfolio_db"`

### TODO-run-first-time-bootstrap.md (init_db + seeding validation)
- Run `python main.py`
- Confirm database + all tables created
- Confirm admin user seeded (admin/admin123)
- Confirm skills and projects seeded

### TODO-verify-cli-flows.md (User journey)
- Guest menu: login/register/exit
- Authenticated menu: options 1–6 for non-admin
- Verify data presentation and that DB writes (messages) and file export succeed

### TODO-test-admin-panel.md (Admin journey)
- RBAC enforced: non-admin blocked
- Admin operations: insert project, delete project by id, audit messages, telemetry counts

### TODO-validate-json-export.md (Export artifact correctness)
- Confirm exported file exists
- Confirm JSON schema fields
- Confirm data matches current DB rows

### TODO-document-troubleshooting.md (Operational playbook)
- MySQL connection failures
- DB bootstrap failures (permissions)
- Login/register issues
- Export write-path issues

**Update written to doc:**
- Converted each TODO file into a short “feature area summary” so it’s easier to track progress.

---

## Step C — Cross-check doc consistency (what exists vs what’s referenced)
### Referenced modules in docs
- `main.py`, `database.py`, `utils.py`, `auth.py`, `menu.py`, `portfolio.py`, `admin.py`

### Referenced DB objects in docs
- Database: `portfolio_db`
- Tables: `users`, `skills`, `projects`, `experience`, `education`, `certifications`, `messages`

### Referenced seed/auth artifacts
- Admin seed: `admin / admin123`
- Export output: `id_app_portfolio_backup.json`

**Update written to doc:**
- Verified that categorization and TODOs align with the entities explicitly listed in `GUIDE/details.md` and `GUIDE/EXECUTION_PLAN.md`.

---

## Step D — Final outputs produced by this task
- Created `updated doc.md` containing:
  - categorized view of all existing `GUIDE/*.md` files
  - per-feature TODO summaries
  - update log entries after each major categorization step

**Update written to doc:**
- Document finalized with the requested “after each update, write update in the doc before going to next feature” pattern.

