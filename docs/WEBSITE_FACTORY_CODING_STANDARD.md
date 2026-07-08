# Website Factory Coding Standard

## Core rules

- Static-first and browser-only by default.
- No backend, database, authentication, required APIs, analytics, or paid services unless explicitly approved.
- User-controlled content must not be rendered with `innerHTML`.
- Use `textContent`, `createElement`, and `appendChild` for dynamic UI that includes user input.
- Keep one canonical source of truth for citation rules wherever practical.
- Prefer progressive enhancement over heavy frameworks.
- Accessibility and keyboard use are release requirements, not polish.
- Every release must pass WFVS and static validation before deployment.

## Rendering policy

| Content type | Allowed rendering |
| --- | --- |
| User input | `textContent` only |
| Trusted static template | `innerHTML` allowed sparingly |
| Mixed data/template | DOM construction |
| External/untrusted data | DOM construction + explicit validation |

## Durability principle

Code should remain understandable and usable if untouched for years.
