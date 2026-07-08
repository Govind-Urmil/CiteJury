# Citation Validation & Explainability — EP-035

EP-035 adds a browser-only validation and explainability layer to CiteJury.

## What changed

- `CiteJuryCitationEngine.validateDetailed()` now returns a structured validation report.
- Generated results now include validation severity, rule status, authority family, confidence, missing recommended fields, limitations, and a verification checklist.
- Blocking validation errors return structured details instead of only plain text.
- The homepage now shows a validation panel after successful generation or blocking errors.
- `assets/data/citation-validation-policy.json` documents the validation policy in static JSON.

## Severity model

- `strong`: narrow documented rule scope; still verify against the original source.
- `needs-review`: scoped helper output; review before formal use.
- `manual-verification-required`: formatting assistance only.
- `blocking-error`: generation stopped because required data or scoped validation failed.

## Long-term unattended operation

The validation system is fully static and browser-side. It adds no backend, database, scheduled job, Python runtime, Node runtime, analytics script, or active advertisement dependency. It is intentionally designed to keep working on static hosting even if the repository is not touched for long periods.

## Limits

CiteJury does not verify real-world source existence, party names, neutral citation sequence ownership, reporter correctness, or institutional style-guide variations. The tool helps structure citations and makes limitations visible.
