# EP-036 Citation Accuracy Browser Test Corpus

EP-036 adds a large deterministic citation accuracy corpus for manual browser testing.

## Files

- `tests/citation-accuracy-corpus.js` — deterministic test-case corpus.
- `tests/EP-036-citation-accuracy-corpus.html` — manual browser runner.

## Scope

The corpus covers currently supported scoped citation outputs and validation failures:

- Supreme Court of India neutral citation token formatting.
- SCC-style common reporter helper output.
- AIR-style common reporter helper output.
- Scoped OSCOLA judgment, legislation, book, and journal outputs.
- Generic website and Indian judgment regression checks.
- Blocking validation failures for missing or malformed required fields.

## Performance and architecture rule

The EP-036 corpus is intentionally manual/test-only. It is not linked from `index.html`, public guide pages, or runtime assets. Normal visitors do not download it, so it must not increase public page weight, slow citation generation, or reduce browser compatibility.

## How to run

Open this file directly in a browser after extracting the repository:

`tests/EP-036-citation-accuracy-corpus.html`

Expected result for EP-036: all corpus tests pass.

## Maintenance policy

When a citation rule changes, add or update deterministic cases in the corpus during the same EP. Do not add a public citation rule unless its scope, authority basis, validation behavior, explainability, and expected outputs are documented and covered by browser tests.
