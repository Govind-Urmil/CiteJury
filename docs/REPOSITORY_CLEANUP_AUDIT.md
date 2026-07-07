# Repository Cleanup and Dead-Code Audit

## EP-027 Purpose
This EP documents cleanup expectations for the current repository because previous EP packages were copied over the existing Git repository rather than applied as delete-aware patches.

## Required deletion if still present

```bash
git rm tests/preflight.py
```

If Git reports that the file does not exist, no action is needed.

## Runtime architecture confirmed
The public website runtime is:

- `index.html`
- `trust.html`
- `privacy.html`
- `terms.html`
- `/guides/*.html`
- `assets/css/style.css`
- `assets/js/app.js`
- `assets/js/citation-engine.js`
- static metadata files

## Non-runtime but intentional project files
These files/folders are not served as core app runtime, but are intentionally kept:

- `/docs` — project memory and operating documentation
- `/tests` — browser/manual QA files only
- `/template` — reusable future static-site starter
- `/.github` — repository checks and issue templates

## Forbidden runtime dependencies
CiteJury must not require:

- Backend server
- Database
- Python runtime
- Node runtime
- Build pipeline
- Paid infrastructure
- Active ad script without approval
- Analytics without approval

## Current cleanup status
EP-027 does not add new runtime complexity. It records cleanup rules and preserves browser-only architecture.
