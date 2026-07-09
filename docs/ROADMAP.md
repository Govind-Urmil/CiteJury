# CiteJury Engineering Roadmap

## Completed
EP-001 through EP-049. Live launch and final unattended-operation release complete.

## Next Planned EPs
EP-071 is the production and AdSense foundation release. After EP-071 live verification and Codex review, the finish phase should move quickly through the approved final UX/accuracy items: EP-072 Citation Checker accuracy and mobile generator flow, EP-073 local productivity features, EP-074 guide usability, and EP-075 final v1.0 freeze, search indexing, and ad activation. Keep the release freeze active: no new product features unless they directly support citation accuracy, monetization readiness, accessibility, SEO, security, or regression prevention.

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


## EP-037 deliverables

- Rewrote 15 public citation guide pages from generic template content into authority-aware practical guidance.
- Added guide-level trust notes, examples, limitation language, and verification habits.
- Added `assets/data/content-quality.json`.
- Added browser-only EP-037 content quality test page.
- Preserved public performance: no corpus load, no external script, no active ads, no analytics, no backend.

Next: EP-038 — Security, Privacy and Production Hardening.


## EP-038 deliverables

- Added strict static-host production headers including CSP, HSTS, referrer, frame, permissions, cross-origin opener, and cache policy.
- Strengthened privacy language for browser-only processing, inactive ads, inactive analytics, and future ad disclosure requirements.
- Added `assets/data/security-privacy-hardening.json`.
- Updated ad-readiness config without activating any ad or analytics script.
- Added production ad CSP template and EP-038 hardening documentation.
- Added browser-only EP-038 security/privacy test page.
- Preserved long-term unattended static operation: no backend, database, build step, runtime dependency, active ads, or active analytics.

Next: EP-039 — Deployment Release Candidate.


## EP-039 deliverables

- Added deployment release-candidate metadata in `assets/data/deployment-release-candidate.json`.
- Updated deployment readiness and release metadata to EP-039.
- Added deployment go-live and release-candidate documentation.
- Added browser-only EP-039 release-candidate test page.
- Preserved static/browser-only architecture with no backend, database, build step, runtime dependency, active ads, or active analytics.

Next: Maintenance mode unless Govind approves a new EP series.


## EP-040 deliverables

- Added final production gold-release metadata in `assets/data/final-production-gold-release.json`.
- Updated release, readiness, final audit, site, ad-readiness, and gold-release metadata to EP-040.
- Added final production gold-release, launch handoff, and post-launch unattended-operation documentation.
- Added browser-only EP-040 final production validation page.
- Preserved static/browser-only architecture with no backend, database, build step, runtime dependency, active ads, or active analytics.

Next: Maintenance mode unless Govind approves a new EP series.


## EP-041 Homepage User-Facing Cleanup

Status: Complete.

EP-041 is a focused maintenance change after the final production gold release. It removes internal launch/hosting/backend/monetization-readiness copy from the public homepage while preserving the underlying static/browser-first architecture and inactive ad/analytics posture.

Next: Maintenance mode unless Govind approves another focused change.


## EP-042 GitHub Pages Homepage and Manifest Cleanup

Status: Complete.

EP-042 removes remaining homepage internal static-hosting badge copy, prevents local `file://` manifest CORS console noise by loading the web manifest only over HTTP(S), and documents the temporary GitHub Pages launch path plus later custom-domain migration tasks.

Next: GitHub Pages deployment preparation or another focused maintenance change approved by Govind.


## EP-043 Portable Static Hosting and Style Switching

Status: Complete. EP-043 prepares Cloudflare Workers Static Assets deployment while keeping the site portable for AWS S3/static hosts later, and adds post-generation style switching in the citation generator.

Next: live Cloudflare deployment audit.


## EP-044 Long-Term Passive Revenue Readiness

EP-044 was generated after EP-043 was committed. It prepares CiteJury for long-term unattended passive-revenue readiness without activating ads or analytics. It adds hidden first-party revenue slots, fail-closed ad readiness behaviour, metadata, and documentation. No backend, database, runtime dependency, build step, active ad script, active analytics, or hosting lock-in was added. Cloudflare remains the initial host path and AWS S3/static hosting remains possible later without website code changes.

Next: deploy/audit the live Cloudflare URL, then enable ads only after explicit approval and a future monetization activation EP/ADR.


## Post EP-045

Next recommended work: live production audit after deployment, search-console/indexing setup, and only later explicit ad activation after policy and privacy readiness checks.

## EP-046 Live Production Audit and Verified Fixes

- Audited the live Cloudflare deployment at `https://citejury.citejury.workers.dev`.
- Fixed verified user-facing cleanup issue: inactive ad placeholders are no longer visible on guide pages.
- Added live audit metadata and documentation.
- Added browser-only EP-046 validation.
- Preserved unattended static operation with no active ads or analytics.

Next: EP-047 — Search Engine Launch.


## EP-047 Search Engine Launch

- Prepared CiteJury for initial Google/Bing discovery on `https://citejury.citejury.workers.dev`.
- Added search-engine launch metadata and documentation.
- Tightened deployed asset/indexing hygiene for internal docs/tests/templates.
- Kept ads and analytics inactive.

Next: complete webmaster verification and sitemap submission, then prepare ad activation only after explicit approval.

## EP-048 Advertisement Activation Framework

- Base: committed EP-047 repository ZIP.
- Live URL checked directly: `https://citejury.citejury.workers.dev`.
- Added a fail-closed Google AdSense activation framework.
- Added `ads.txt.template`, ad activation metadata, and activation documentation.
- Updated privacy copy for future advertising readiness while keeping real ad scripts inactive.
- Updated CSP/header preparation for future approved AdSense loading.
- Preserved static/browser-only architecture, no backend, no database, no analytics, and host portability.
- Real ads are still inactive because Govind has not provided a valid AdSense publisher/client ID, ads.txt publisher ID, or approved ad slot IDs.

Next: get AdSense account/site approval and then use the documented config-only activation path, or proceed to EP-049 final unattended operation release.



## EP-049 Final Unattended Operation Release

EP-049 finalizes the live Cloudflare Workers Static Assets handoff for `https://citejury.citejury.workers.dev`. The site remains static/browser-only, host-portable, and designed for long unattended operation. Ads and analytics remain inactive. Search-engine and ad activation tasks are now manual account-level steps documented in the repository.


## EP-050 — Completed
Public polish and validation error navigation completed. Future work is traffic/indexing/content growth and approved monetization activation rather than arbitrary EP expansion.


## EP-051 — Completed
Corrected validation navigation so users are taken directly to the field that needs correction.


## EP-052 — Completed
Validation navigation corrected so users are taken directly to the invalid field after a failed generation attempt.


## EP-053 — Completed
Resolved mobile Chrome validation navigation reliability. Next roadmap priority remains search engine setup, content growth, and later approved ad activation.


## EP-054 — Completed
Browser cache-busting added for CSS/JS update freshness. Future EPs that change public CSS/JS should increment the asset version.


## EP-055 — Completed
Citation form clarity and first evidence-based content upgrade batch completed.


## EP-056 — Completed
Required/Optional citation field status rendering fixed.


## EP-057 — Completed
Generator UX now changes field labels/helper text based on selected citation style and source type. Alternative display variants added for APA/Chicago drafts only.


## EP-058 — Completed
Citation Anatomy™ added. Next authority-building priorities remain guide expansion, comparison pages, and Citation Decision Tree.


## EP-059 — Completed
First major authority-content expansion completed. Next authority priorities: comparison center and Citation Decision Tree.


## EP-060 — Completed
Visual Citation Learning completed. Next authority priority: Comparison Center.


## EP-061 — Completed
Citation Checker™ completed. Next authority priority: Comparison Center.


## EP-062 — Completed
WFVS completed. EP-063 will handle public UX polish separately.


## EP-063 — Completed
Public UX Polish completed. Next planned direction: authority-building/comparison content, unless Codex release review identifies higher-priority defects.


## EP-064 — Completed
Stability and foundation fixes completed. Next direction should return to growth and authority work unless release review finds a blocker.


## EP-064A — Completed
Immediate regression hotfix for mobile nav and checker workspace behavior.
