# TODO — Validate JSON export correctness

## Checklist
- [ ] Login
- [ ] Choose export option (menu option 6)
- [ ] Confirm file `id_app_portfolio_backup.json` exists in repo root (or expected working directory)
- [ ] Confirm JSON has:
  - [ ] `application_signature`
  - [ ] `file_schema_version`
  - [ ] `extracted_skills`
  - [ ] `extracted_projects`
- [ ] Confirm exported rows match current DB contents

## Acceptance Criteria
- JSON is valid and can be loaded via a JSON parser.

