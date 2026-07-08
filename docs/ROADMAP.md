# CiteJury Engineering Roadmap

## Completed
EP-001 through EP-035.

## Next Planned EPs
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
