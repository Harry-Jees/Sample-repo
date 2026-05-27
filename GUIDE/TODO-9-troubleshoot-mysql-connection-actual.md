# Running TODO — 1.0) Troubleshoot MySQL connection (work log)

## Update log (append-only)
- [x] MySQL not reachable at `localhost:3306` → check MySQL service/port
- [x] PowerShell check: TCP connect to `127.0.0.1:3306` failed


- [x] PowerShell TCP test to `127.0.0.1:3306` did not succeed (TCP connect failed)
- [ ] Update `DB_CONFIG['host']` and/or port (if needed)

- [ ] Update `DB_CONFIG['user']` and `password`

## Acceptance criteria
- `init_db()` can connect successfully.

