# CiteJury Engineering Roadmap

## Completed
EP-001 through EP-032.

## Next Planned EPs
- EP-033 Indian Legal Citation Engine Overhaul
- EP-034 International Citation Engine Overhaul
- EP-035 Citation Validation and Explainability System
- EP-036 Citation Accuracy Browser Test Corpus
- EP-037 Content Quality and Authority Rewrite
- EP-038 Security, Privacy and Production Hardening
- EP-039 Deployment Release Candidate
- EP-040 Final Production Gold Release

## Architecture Rules
- No backend or database without explicit approval.
- No paid infrastructure without explicit approval.
- No active ads or analytics without explicit approval.
- Static, reusable, free-to-host-first codebase.
- Citation rule changes require scope, rationale, validation logic, and tests.


## EP-033 deliverables

- Added Supreme Court of India neutral citation token rule with strict validation.
- Narrowed SCC and AIR support to scoped reporter helpers with explicit limitations.
- Added `assets/data/indian-citation-scope.json`.
- Added browser-only EP-033 manual test page.
- Preserved static/browser-only architecture, inactive ads, inactive analytics, and zero-runtime website operation.

Next: EP-034 — International Citation Engine Overhaul.
