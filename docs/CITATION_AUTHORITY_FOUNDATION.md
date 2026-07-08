# EP-032 Citation Authority Foundation

## Purpose
EP-032 starts the citation reliability overhaul. It does not claim that every existing citation output is fully authoritative. It creates the structure CiteJury needs before EP-033 through EP-036 replace provisional helpers with verified, scoped, tested rules.

## What changed
- Added `assets/data/citation-authorities.json` as a static authority/provenance registry.
- Added `assets/data/citation-rule-specs.json` as a static rule-specification registry.
- Updated `assets/data/citation-config.json` to record authority-foundation metadata.
- Updated the browser citation engine so generated results include:
  - rule id,
  - rule status,
  - authority family,
  - confidence level,
  - missing-field warnings,
  - transparent limitations.
- Updated the homepage explanation panel to show authority/provenance details.
- Added browser-only EP-032 manual test coverage.

## Authority handling principle
A citation rule must not be treated as production-authoritative merely because it looks plausible. Each rule should move through this maturity path:

1. `provisional-helper` — useful formatting help, but clearly labelled and requires verification.
2. `authority-mapped` — mapped to named source families and documented scope.
3. `rule-specified` — required fields, optional fields, validation, output order, and limitations documented.
4. `browser-tested` — deterministic browser test cases cover normal and edge cases.
5. `production-trusted` — suitable for high-confidence user-facing claims within its documented scope.

## Initial authority registry
The initial registry includes:
- Supreme Court of India neutral citation lookup.
- Supreme Court Reports / e-SCR.
- Supreme Court neutral citation notices/press material.
- Oxford Law Faculty OSCOLA sources.
- Standard Indian Legal Citation working draft.
- Indian Law Institute citation style material.

## Important limitation
Some sources are official and authoritative; others are institutional, working drafts, or secondary-hosted copies. The registry records support level so future EPs do not accidentally treat all sources equally.

## EP-033 dependency
EP-033 should use this foundation to overhaul Indian citation logic, especially:
- Supreme Court neutral citations.
- SCR/e-SCR citation behavior.
- SCC-style and AIR-style judgment handling.
- Indian legislation and Constitution citation rules.
- Rule-specific validation and deterministic browser tests.

## Architecture impact
No backend, database, Python runtime, Node runtime, build step, analytics, ads, paid service, or third-party runtime dependency was added.
