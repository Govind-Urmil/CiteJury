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


## EP-033 current state

EP-032 was committed by Govind. EP-033 was generated from the uploaded EP-032 repository ZIP as the source of truth. EP-033 focuses on Indian legal citation reliability and adds a verified-format Supreme Court of India neutral citation rule (`YYYYINSCN`), scoped SCC and AIR reporter helpers, authority/scope data, and browser-only manual tests. No backend, database, Python runtime, Node runtime, build step, ads, analytics, or paid infrastructure was added. Required deletion commands: none.

Next planned EP after EP-034 commit: EP-035 — Citation Validation and Explainability System.


## EP-034 status

EP-034 was generated after Govind confirmed EP-033 was committed. The package focuses on international citation reliability without changing the locked static/browser-first architecture. OSCOLA support is now scoped and authority-backed. Bluebook, AGLC4, and McGill are registered as authority families only; they are not exposed as supported public generator styles. No files are removed.


## EP-035 status

EP-035 was generated after Govind confirmed EP-034 was committed. The package adds browser-only structured validation and explainability for citation outputs. It introduces validation severity, detailed rule metadata, missing-field reporting, limitations, and verification checklist output while preserving the locked static/browser-first architecture.

Long-term unattended operation remains a product constraint: CiteJury should continue running as a static browser site for months or years without backend maintenance. Ads remain inactive until explicitly approved, but the site continues to reserve non-intrusive ad placement areas for future passive monetization.

No files are removed in EP-035.
