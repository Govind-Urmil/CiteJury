# Website Factory Verification Suite (WFVS)

WFVS is the reusable browser-only verification dashboard for CiteJury and future Website Factory projects.

## Goals
- Provide visible release quality checks.
- Preserve static/browser-first architecture.
- Avoid backend, database, API, or paid infrastructure.
- Make every EP auditable before production release.

## Current dashboard
Open `tests/index.html` locally or on the deployed static site.

Use `tests/index.html?dev=1` for developer diagnostics.

## Rule
No future EP should be considered complete until WFVS and the normal repository validation pass.
