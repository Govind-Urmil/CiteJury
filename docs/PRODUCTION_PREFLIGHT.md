# Production Preflight

EP-024 removes Python tooling and keeps the project fully aligned with browser-only static architecture.

## Checks

Use:
- `tests/browser-only-checklist.html`
- `tests/citation-engine-tests.html`
- GitHub Actions static shell checks

## What is intentionally not used

- No Python runtime
- No Node runtime
- No backend server
- No database
- No build step
- No paid dependency

## Reliability principle

CiteJury should be simple enough to host and serve as static files. Any bug report should be fixed through a new immutable EP.
