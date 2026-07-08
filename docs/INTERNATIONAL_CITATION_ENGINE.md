# EP-034 International Citation Engine Overhaul

EP-034 replaces the previous OSCOLA-like judgment helper with scoped, authority-backed OSCOLA behavior. It also registers Bluebook, AGLC4, and McGill Guide authority families without publicly claiming generator support for those systems.

## Implemented public scope

- OSCOLA UK case citations: party names, optional neutral citation, optional law report, optional court where no neutral citation exists, and optional paragraph pinpoint.
- OSCOLA basic legislation: title, year, optional section/provision.
- OSCOLA basic books and journal articles using the current generic field model.

## Authority basis

- Oxford Law Faculty OSCOLA page.
- OSCOLA quick reference guide.
- OSCOLA 4th edition PDF.

## Registered but not publicly supported

- Bluebook: official authority registered; output not enabled because reliable support needs a US-specific field model and test corpus.
- AGLC4: official authority registered; output not enabled because reliable support needs Australian field modeling and tests.
- McGill Guide: official authority registered; output not enabled.

## Limitations

The existing homepage form still uses reusable generic fields. EP-035 should improve user-facing validation/explainability and field labels so users understand exactly how each citation rule interprets each field. EP-036 should add the large browser-only deterministic corpus.

## Architecture

No backend, database, Python runtime, Node runtime, build step, ads, analytics, or paid infrastructure were added.
