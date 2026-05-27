# TODO — Document troubleshooting + failure modes

## Checklist
- [ ] MySQL connection failure:
  - [ ] Wrong host/credentials
  - [ ] MySQL not running
- [ ] DB bootstrap failure:
  - [ ] Permission issues to create DB/tables
- [ ] Login issues:
  - [ ] Password mismatch
  - [ ] Register validation (email format / confirmation)
- [ ] Export issues:
  - [ ] File write permission / path

## Output
- Add a troubleshooting section to `GUIDE/EXECUTION_PLAN.md` OR a separate doc.

## Acceptance Criteria
- A new user can diagnose the most common problems without reading code.

