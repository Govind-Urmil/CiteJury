# CiteJury

Privacy-first legal citation tools built with Indian legal practice in mind.

## Current Release
EP-034: International Citation Engine Overhaul.

## Architecture
Static, browser-first, reusable, free-to-host first, with no backend/database/runtime dependency.

## Citation Authority
Citation authority and reliability are the main product priority for the next phase.

## Workflow
One EP equals one Git commit and one Git push.

## EP-032 Citation Authority Foundation
CiteJury now includes a static citation authority foundation. Generated citations expose rule status, authority family, confidence, missing recommended fields, and limitations so users are not misled by plausible-looking output. The current citation helpers remain provisional until EP-033 through EP-036 complete rule-specific authority mapping, validation, and browser test coverage.

Architecture remains static/browser-first with no backend, database, runtime dependency, build step, active ads, or analytics.


## EP-033 Indian Legal Citation Engine Overhaul
CiteJury added scoped Supreme Court of India neutral citation support and narrowed SCC/AIR helpers with explicit validation and limitations.

## EP-034 International Citation Engine Overhaul
CiteJury now provides scoped OSCOLA support for UK cases and basic legislation/book/journal citations using authority-backed rules. Bluebook, AGLC4, and McGill authority families are registered but not publicly claimed as supported generator styles until dedicated field models and tests exist.
