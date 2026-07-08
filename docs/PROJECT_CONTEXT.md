# CiteJury Project Context

## Current Status
Completed EP-001 through EP-032.

## Locked Architecture
Static, browser-first, free-to-host-first. No backend, database, Python runtime, Node runtime, build step, paid infrastructure, active ads, analytics, or architecture change without explicit approval.

## EP-031
Repo and launch safety fixes:
- Fixes GitHub Actions false-positive risk
- Makes security.txt placeholder intentionally inactive
- Adds production sitemap template with absolute URLs
- Strengthens .gitignore for secrets and generated files
- Adds launch safety documentation
- No backend or architecture change
- No file deletion required

## EP-032
Citation Authority Foundation:
- Adds static authority/provenance registry at `assets/data/citation-authorities.json`
- Adds static rule-specification registry at `assets/data/citation-rule-specs.json`
- Updates citation engine output with rule id, rule status, authority family, confidence, missing recommended fields, and limitations
- Adds `docs/CITATION_AUTHORITY_FOUNDATION.md`
- Adds browser-only manual test `tests/EP-032-authority-foundation.html`
- No backend, database, build step, Python runtime, Node runtime, ads, analytics, or architecture change
- No file deletion required

## Citation Authority Priority
Citation authority and reliability remain the main product priority. EP-032 creates the authority/provenance foundation; EP-033 should now overhaul Indian citation rules using this foundation.

## Next
EP-033: Indian Legal Citation Engine Overhaul.
