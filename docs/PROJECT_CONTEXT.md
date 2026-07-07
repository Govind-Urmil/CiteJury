# CiteJury Project Context

## Current Status
Completed EP-001 through EP-027.

## Locked Architecture
Static, browser-first, free-to-host-first. No backend, database, Python runtime, Node runtime, build step, or architecture change without explicit approval.

## EP-027
Full repository cleanup and dead-code audit:
- Adds cleanup-manifest.json
- Adds repository cleanup audit documentation
- Adds obsolete file policy
- Reconfirms browser-only runtime files
- Explicitly documents `tests/preflight.py` removal if still present
- No backend or architecture change

## Remaining Planned EPs
- EP-028 Performance, SEO and accessibility final audit
- EP-029 Monetization and production deployment readiness
- EP-030 Final Gold Release

## Important Workflow Rule
Govind extracts EP packages into the repo and does not manually delete files unless explicitly instructed. Future EPs must include deletion commands when needed.
