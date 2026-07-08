# CiteJury Engineering Roadmap

## Completed
EP-001 through EP-040. Planned roadmap complete.

## Next Planned EPs
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


## EP-034 deliverables

- Replaced provisional OSCOLA-like judgment output with scoped OSCOLA case logic.
- Added scoped OSCOLA support for basic legislation, book, and journal citations.
- Registered Bluebook, AGLC4, and McGill authority families without claiming public generator support.
- Added `assets/data/international-citation-scope.json`.
- Added browser-only EP-034 deterministic test page.

Next: EP-035 — Citation Validation and Explainability System.


## EP-035 deliverables

- Added structured `validateDetailed()` reports to the browser citation engine.
- Added validation severity, rule status, authority family, confidence, missing-field, limitation, and manual-verification output.
- Added homepage validation panel for generated results and blocking errors.
- Added `assets/data/citation-validation-policy.json`.
- Added browser-only EP-035 validation/explainability test page.
- Preserved static/browser-only architecture with no backend, database, runtime dependency, active ads, or analytics.

Next: EP-036 — Citation Accuracy Browser Test Corpus.


## EP-036 deliverables

- Added a large deterministic browser-only citation accuracy corpus with 142 test cases.
- Added manual runner `tests/EP-036-citation-accuracy-corpus.html`.
- Added corpus data file `tests/citation-accuracy-corpus.js`.
- Covered SCI neutral, SCC-style, AIR-style, scoped OSCOLA, website, and generic Indian judgment regression cases.
- Kept the corpus test-only and not referenced by public pages, preserving normal visitor performance and page weight.
- Preserved static/browser-only architecture with no backend, database, runtime dependency, active ads, or analytics.

Next: EP-037 — Content Quality and Authority Rewrite.


## EP-037 deliverables

- Rewrote 15 public citation guide pages from generic template content into authority-aware practical guidance.
- Added guide-level trust notes, examples, limitation language, and verification habits.
- Added `assets/data/content-quality.json`.
- Added browser-only EP-037 content quality test page.
- Preserved public performance: no corpus load, no external script, no active ads, no analytics, no backend.

Next: EP-038 — Security, Privacy and Production Hardening.


## EP-038 deliverables

- Added strict static-host production headers including CSP, HSTS, referrer, frame, permissions, cross-origin opener, and cache policy.
- Strengthened privacy language for browser-only processing, inactive ads, inactive analytics, and future ad disclosure requirements.
- Added `assets/data/security-privacy-hardening.json`.
- Updated ad-readiness config without activating any ad or analytics script.
- Added production ad CSP template and EP-038 hardening documentation.
- Added browser-only EP-038 security/privacy test page.
- Preserved long-term unattended static operation: no backend, database, build step, runtime dependency, active ads, or active analytics.

Next: EP-039 — Deployment Release Candidate.


## EP-039 deliverables

- Added deployment release-candidate metadata in `assets/data/deployment-release-candidate.json`.
- Updated deployment readiness and release metadata to EP-039.
- Added deployment go-live and release-candidate documentation.
- Added browser-only EP-039 release-candidate test page.
- Preserved static/browser-only architecture with no backend, database, build step, runtime dependency, active ads, or active analytics.

Next: Maintenance mode unless Govind approves a new EP series.


## EP-040 deliverables

- Added final production gold-release metadata in `assets/data/final-production-gold-release.json`.
- Updated release, readiness, final audit, site, ad-readiness, and gold-release metadata to EP-040.
- Added final production gold-release, launch handoff, and post-launch unattended-operation documentation.
- Added browser-only EP-040 final production validation page.
- Preserved static/browser-only architecture with no backend, database, build step, runtime dependency, active ads, or active analytics.

Next: Maintenance mode unless Govind approves a new EP series.


## EP-041 Homepage User-Facing Cleanup

Status: Complete.

EP-041 is a focused maintenance change after the final production gold release. It removes internal launch/hosting/backend/monetization-readiness copy from the public homepage while preserving the underlying static/browser-first architecture and inactive ad/analytics posture.

Next: Maintenance mode unless Govind approves another focused change.
