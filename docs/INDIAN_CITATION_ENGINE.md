# EP-033 Indian Legal Citation Engine Overhaul

Status: EP-033 implemented.
Architecture: static/browser-only; no backend, database, Python runtime, Node runtime, build step, ads, or analytics.

## Product goal

EP-033 narrows Indian judgment citation support so CiteJury stops treating plausible-looking output as enough. The engine now separates:

1. a verified-format Supreme Court of India neutral citation rule;
2. scoped SCC and AIR reporter helpers;
3. generic Indian judgment help with explicit lower confidence.

## Authority research used

### Supreme Court of India neutral citation

The official Supreme Court notice dated 06 July 2023 states that the neutral citation system is a uniform, reliable, secure methodology for identifying and citing Supreme Court judgments and orders. It gives the format `2023INSC1`, where:

- `2023` is the year of pronouncement;
- `INSC` stands for India Supreme Court;
- `1` is the serial number of the judgment/order.

CiteJury implements only this token structure for `india-supreme-court-neutral-citation-v1`.

### SCC and AIR

SCC and AIR support is intentionally scoped. CiteJury formats only the common core component order:

- SCC: `Case name, (year) volume SCC first page.`
- AIR: `Case name, AIR year court first page.`

These are not claimed as complete editorial implementations. The user-facing output continues to require verification against the original reporter/source.

## Implemented rule IDs

### `india-supreme-court-neutral-citation-v1`

Required fields:

- case/source title;
- four-digit year;
- sequence number in the Page / section / article / URL / neutral sequence field.

Output:

```text
Case name, YYYYINSCN.
```

Validation:

- title required;
- year must be four digits;
- sequence number must contain digits only;
- if court is supplied, it must identify the Supreme Court of India.

Limitations:

- no official lookup is performed;
- sequence number is not matched to case name;
- High Court neutral citation formats are not covered;
- parallel citations and pinpoints are not added.

### `scc-law-report-judgment-scoped-v1`

Required fields:

- case/source title;
- four-digit year;
- numeric volume;
- numeric first page.

Output:

```text
Case name, (year) volume SCC first page.
```

Limitations:

- no parallel citations;
- no supplement series handling;
- no SCC OnLine identifier handling;
- no pinpoint paragraph support;
- no verification of party names or reportability.

### `air-law-report-judgment-scoped-v1`

Required fields:

- case/source title;
- four-digit year;
- court abbreviation;
- numeric first page.

Output:

```text
Case name, AIR year COURT first page.
```

Limitations:

- no regional variant verification;
- no parallel citations;
- no pinpoint paragraph support;
- no verification of party names or reportability.

## Files changed in EP-033

- `assets/js/citation-engine.js`
- `assets/data/citation-authorities.json`
- `assets/data/citation-rule-specs.json`
- `assets/data/indian-citation-scope.json`
- `index.html`
- `tests/EP-033-indian-citation-engine.html`
- `docs/INDIAN_CITATION_ENGINE.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/EP-LEDGER.md`
- `docs/ROADMAP.md`
- `README.md`
- `GIT.md`
- `docs/GIT.md`

## EP-033 validation summary

Validation performed before packaging:

- Indian citation engine deterministic tests: 9/9 passed.
- JSON validation: 4/4 passed.
- Local link check: all checked links passed.
- Static architecture grep: passed.
- Secret grep: passed.
- Active ad/analytics script grep: passed.
- ZIP audit: `.git/` excluded and `.github/` included.

## Required deletion commands

None.
