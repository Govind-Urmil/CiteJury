# CiteJury Project Context

## Current Status
Completed EP-001 through EP-040.

## Locked Architecture
Static, browser-first, free-to-host-first. No backend, database, Python runtime, Node runtime, build step, paid infrastructure, active ads, analytics, or architecture change without explicit approval.

## EP-031
Repo and launch safety fixes:
- Fixes GitHub Actions false-positive risk
- Makes security.txt placeholder intentionally inactive
- Adds production sitemap template with absolute URLs
- Strengthens .gitignore for secrets and generated files
- Adds launch safety documentation
- No backend or architecture change
- No file deletion required

## EP-032
Citation Authority Foundation:
- Adds static authority/provenance registry at `assets/data/citation-authorities.json`
- Adds static rule-specification registry at `assets/data/citation-rule-specs.json`
- Updates citation engine output with rule id, rule status, authority family, confidence, missing recommended fields, and limitations
- Adds `docs/CITATION_AUTHORITY_FOUNDATION.md`
- Adds browser-only manual test `tests/EP-032-authority-foundation.html`
- No backend, database, build step, Python runtime, Node runtime, ads, analytics, or architecture change
- No file deletion required

## Citation Authority Priority
Citation authority and reliability remain the main product priority. EP-032 creates the authority/provenance foundation; EP-033 should now overhaul Indian citation rules using this foundation.

## Next
EP-033: Indian Legal Citation Engine Overhaul.


## EP-033 current state

EP-032 was committed by Govind. EP-033 was generated from the uploaded EP-032 repository ZIP as the source of truth. EP-033 focuses on Indian legal citation reliability and adds a verified-format Supreme Court of India neutral citation rule (`YYYYINSCN`), scoped SCC and AIR reporter helpers, authority/scope data, and browser-only manual tests. No backend, database, Python runtime, Node runtime, build step, ads, analytics, or paid infrastructure was added. Required deletion commands: none.

Next planned EP after EP-034 commit: EP-035 — Citation Validation and Explainability System.


## EP-034 status

EP-034 was generated after Govind confirmed EP-033 was committed. The package focuses on international citation reliability without changing the locked static/browser-first architecture. OSCOLA support is now scoped and authority-backed. Bluebook, AGLC4, and McGill are registered as authority families only; they are not exposed as supported public generator styles. No files are removed.


## EP-035 status

EP-035 was generated after Govind confirmed EP-034 was committed. The package adds browser-only structured validation and explainability for citation outputs. It introduces validation severity, detailed rule metadata, missing-field reporting, limitations, and verification checklist output while preserving the locked static/browser-first architecture.

Long-term unattended operation remains a product constraint: CiteJury should continue running as a static browser site for months or years without backend maintenance. Ads remain inactive until explicitly approved, but the site continues to reserve non-intrusive ad placement areas for future passive monetization.

No files are removed in EP-035.


## EP-036 status

EP-036 was generated after Govind confirmed EP-035 was committed. The package adds a large deterministic browser-only citation accuracy corpus with 142 cases and a manual HTML runner. The corpus is intentionally not loaded by public pages, so normal visitors do not download it and citation-generation performance remains unaffected.

Long-term unattended operation remains mandatory: CiteJury must continue working as a static browser site for months or years without backend maintenance. Ads remain inactive until Govind explicitly approves activation, but the site continues to be designed for responsible future passive monetization.

No files are removed in EP-036.


## EP-037 Content Quality and Authority Rewrite

EP-037 is complete. The public guide pages were rewritten to reduce template-like content and improve trust, authority, verification habits, and transparent limitations. No backend, database, runtime dependency, active ads, analytics, or external scripts were added. Ads remain inactive but reserved for future responsible monetization after explicit approval.


## EP-038 status

EP-038 was completed after EP-037 commit. It hardens production headers, privacy documentation, inactive ad-readiness guardrails, and unattended-operation posture while preserving the locked static/browser-only architecture. Ads and analytics remain inactive and require future explicit approval before activation.


## EP-039 Deployment Release Candidate

EP-039 is complete. CiteJury remains static/browser-only with no backend, database, Python runtime requirement, Node runtime requirement, build step requirement, active ads, or active analytics. The package adds deployment release-candidate metadata, go-live documentation, and a browser-only EP-039 validation page. Final launch still requires the production domain, sitemap absolute URL update, deployed header verification, and security.txt contact/domain approval.


## EP-040 Final Production Gold Release

EP-040 was generated after Govind confirmed EP-039 was committed. It completes the planned EP-031 through EP-040 post-audit roadmap. CiteJury remains static/browser-only with no backend, database, Python runtime requirement, Node runtime requirement, build step requirement, active ads, or active analytics. The package adds final gold-release metadata, final launch handoff documentation, post-launch unattended-operation documentation, and a browser-only EP-040 validation page.

Long-term unattended operation remains a core product requirement: after launch, CiteJury should continue running for months or years as static browser files with no routine backend maintenance. Passive ad revenue is still a future goal, but ads remain inactive until Govind explicitly approves a separate monetization EP/ADR.

No files are removed in EP-040.

Next state after EP-040 commit: maintenance mode unless Govind approves a new EP series.


## EP-041 Homepage User-Facing Cleanup

EP-041 was generated after Govind confirmed EP-040 was committed and requested removal of internal homepage content. The package removes the public homepage block about static launch readiness/backend maintenance and removes homepage static-hosting/internal monetization-readiness wording. This is a user-facing copy cleanup only. The architecture, docs, tests, inactive ads, inactive analytics, and long-term unattended-operation strategy remain unchanged.

No files are removed in EP-041.

Next state after EP-041 commit: maintenance mode unless Govind approves another focused change.


## EP-043 Portable Static Hosting and Style Switching

EP-043 was generated after EP-042 was committed and Govind chose Cloudflare hosting first while requiring future AWS S3 portability. It adds `wrangler.jsonc`, `.assetsignore`, `404.html`, portable hosting documentation, and post-generation style alternatives in the citation generator. The public site remains static/browser-only with no backend, no database, no active ads, no active analytics, and no runtime dependency for visitors.


## EP-044 Long-Term Passive Revenue Readiness

EP-044 was generated after EP-043 was committed. It prepares CiteJury for long-term unattended passive-revenue readiness without activating ads or analytics. It adds hidden first-party revenue slots, fail-closed ad readiness behaviour, metadata, and documentation. No backend, database, runtime dependency, build step, active ad script, active analytics, or hosting lock-in was added. Cloudflare remains the initial host path and AWS S3/static hosting remains possible later without website code changes.

Next: deploy/audit the live Cloudflare URL, then enable ads only after explicit approval and a future monetization activation EP/ADR.


## EP-045 status

EP-045 finalizes the temporary production URL `https://citejury.citejury.workers.dev`, absolute sitemap/canonical metadata, robots sitemap reference, and disables Cloudflare preview URLs while keeping ads/analytics inactive and preserving host portability.

## EP-046 Current State

EP-046 is the live production audit and verified-fix package after the temporary Cloudflare production URL went live. It uses `https://citejury.citejury.workers.dev` as the current production URL. It removes visible inactive-ad placeholder copy from guide pages, adds live-production audit metadata/docs, and preserves the locked static/browser-only architecture. Ads and analytics remain inactive.



## EP-047 Search Engine Launch

EP-047 was generated after EP-046 was committed and live. It prepares the temporary Cloudflare Workers URL `https://citejury.citejury.workers.dev` for search-engine launch, adds search-engine launch metadata/docs, removes unsupported public generator-style claims, and tightens deployment/indexing hygiene for internal repository surfaces. Ads and analytics remain inactive.

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

