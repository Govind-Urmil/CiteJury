# Citation Engine

EP-015 separates citation rules from UI orchestration.

## Files

- `assets/js/citation-engine.js`
- `assets/js/app.js`
- `tests/citation-engine-tests.html`

## Architecture

The citation engine exposes one browser global:

```js
window.CiteJuryCitationEngine.generate(input)
```

This keeps the site static and browser-first while making future citation rules easier to expand.

## Current Source Types

- Judgment
- Legislation
- Constitution
- Book
- Journal article
- Website

## No Backend

The engine runs entirely in the browser.
