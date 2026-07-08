# CiteJury

Privacy-first legal citation tools built with Indian legal practice in mind.

## Current Release
EP-039: Deployment Release Candidate.

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


## EP-035 Citation Validation and Explainability System

EP-035 adds structured browser-only validation reports to the citation engine and homepage. Generated citations now expose rule id, authority family, confidence, severity, missing recommended fields, limitations, and verification checklist guidance. The package adds no backend, database, Python runtime, Node runtime, active analytics, or active advertising.


## EP-036 Citation Accuracy Browser Test Corpus

EP-036 adds a large deterministic browser-only citation accuracy corpus for manual testing. The corpus is not referenced by public pages and does not affect normal visitor page weight, browser performance, ads, analytics, or static hosting simplicity.


## EP-037 update

Public guide content has been rewritten for authority-aware citation education, clearer limitations, and long-term static operation. Ads and analytics remain inactive.


## EP-038 Security, Privacy and Production Hardening

EP-038 adds strict production security headers, privacy-policy hardening, inactive ad-readiness guardrails, and long-term unattended-operation documentation. Ads and analytics remain inactive; future monetization requires an approved ADR/EP, privacy update, and CSP update.


## EP-039 Deployment Release Candidate

EP-039 prepares CiteJury for deployment review with explicit go-live steps, release-candidate metadata, static-host verification guidance, and unattended-operation guardrails. Ads and analytics remain inactive; future monetization still requires explicit approval and a separate EP.
