# TODO — Run first-time bootstrap + seed verification

## Checklist
- [ ] Run: `python main.py`
- [ ] Confirm `init_db()` creates:
  - [ ] database `portfolio_db`
  - [ ] tables `users`, `skills`, `projects`, `experience`, `education`, `certifications`, `messages`
- [ ] Confirm seed behavior:
  - [ ] admin user exists (admin / admin123)
  - [ ] foundational `skills` rows exist
  - [ ] foundational `projects` rows exist

## Acceptance Criteria
- App does not exit on bootstrap failure.
- Seeded data is visible via menu options (skills/projects).

