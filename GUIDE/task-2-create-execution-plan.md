# Task 2 — Create the proper execution plan

## Goal
Turn the app documentation into a step-by-step execution plan that matches the required module layout.

## Subtasks
- Produce an ordered build plan for:
  - Module files (database.py, utils.py, auth.py, portfolio.py, admin.py, menu.py, main.py)
  - Dependency installation
  - Database bootstrap and seeding
  - Running the CLI app
- Include a runbook for common failure points:
  - MySQL connection issues
  - Invalid credentials
  - Missing/empty seed data

## Output
- `GUIDE/EXECUTION_PLAN.md` (the consolidated plan).

## Acceptance Criteria
- Plan is executable from a clean state.
- Each step references what file(s) it affects.
- Includes required MySQL setup + “admin” credentials for first login.

