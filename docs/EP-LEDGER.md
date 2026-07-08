# EP Ledger

| EP | Title | Status |
|---|---|---|
| EP-001 | Repository bootstrap and homepage foundation | Complete |
| EP-002 | Production homepage skeleton | Complete |
| EP-003 | Project documentation memory system | Complete |
| EP-004 | Homepage content refinement | Complete |
| EP-005 | Design system foundation | Complete |
| EP-006 | Production homepage experience | Complete |
| EP-007 | Functional citation generator foundation | Complete |
| EP-008 | Citation rules module and explainable output | Complete |
| EP-009 | Production quality pass | Complete |
| EP-010 | Static deployment readiness | Complete |
| EP-011 | Citation accuracy expansion | Complete |
| EP-012 | SEO and content expansion | Complete |
| EP-013 | Responsible ad monetization readiness | Complete |
| EP-014 | Accessibility and QA hardening | Complete |
| EP-015 | Citation engine modularization and test coverage | Complete |
| EP-016 | Content and organic growth expansion | Complete |
| EP-017 | Static launch readiness | Complete |
| EP-018 | Reusable static-site template extraction | Complete |
| EP-019 | Citation style depth expansion | Complete |
| EP-020 | Organic content expansion batch 2 | Complete |
| EP-021 | Launch polish and trust release candidate | Complete |
| EP-022 | Free static hosting and policy readiness | Complete |
| EP-023 | Production preflight and integrity hardening | Complete |
| EP-024 | Browser-only compliance and Python tooling removal | Complete |
| EP-025 | Final production audit package | Complete |
| EP-026 | Citation accuracy and authority hardening | Complete |
| EP-027 | Full repository cleanup and dead-code audit | Complete |
| EP-028 | Performance, SEO and accessibility final audit | Complete |
| EP-029 | Monetization and production deployment readiness | Complete |
| EP-030 | Final Gold Release | Complete |
| EP-031 | Repo and launch safety fixes | Complete |
| EP-032 | Citation Authority Foundation | Complete |
| EP-033 | Indian Legal Citation Engine Overhaul | Complete |
| EP-034 | International Citation Engine Overhaul | Complete |
| EP-035 | Citation Validation and Explainability System | Complete |
| EP-036 | Citation Accuracy Browser Test Corpus | Complete |

| EP-037 | Content Quality and Authority Rewrite | Complete |
| EP-038 | Security, Privacy and Production Hardening | Complete |
| EP-039 | Deployment Release Candidate | Complete |
| EP-040 | Final Production Gold Release | Complete |

## EP-041 deliverables

- Removed public homepage `launch-readiness` and `monetization-ready` sections.
- Removed homepage references to static hosting, backend, repository visibility, free-hosting, and internal monetization-readiness positioning.
- Reworded homepage privacy and FAQ copy to be user-facing.
- Added `assets/data/homepage-user-facing-cleanup.json`.
- Added `docs/HOMEPAGE_USER_FACING_CLEANUP.md`.
- Preserved architecture, citation behaviour, inactive ads, and inactive analytics.

Next: Maintenance mode unless Govind approves another focused change.


## EP-042 deliverables

- Removed the homepage `Static-hosting ready` trust badge.
- Removed the direct manifest link from HTML and added safe manifest loading only on `http:`/`https:` to avoid local `file://` CORS console errors during manual review.
- Added GitHub Pages initial launch metadata and `sitemap.github-pages-template.xml`.
- Added `docs/GITHUB_PAGES_LAUNCH.md` explaining later custom-domain changes.
- Preserved static/browser-only architecture, inactive ads, inactive analytics, and no runtime dependencies.

Next: GitHub Pages deployment preparation or another focused maintenance change approved by Govind.


## EP-043 deliverables

- Added Cloudflare Workers Static Assets deployment config through `wrangler.jsonc`.
- Added `.assetsignore` to keep repository/deployment-control files out of uploaded static assets.
- Added `404.html` for Cloudflare and future AWS S3 static website hosting.
- Added portable hosting documentation for Cloudflare now and AWS S3 later.
- Added post-generation citation style alternatives so users can compare and choose supported style outputs without re-entering data.
- Preserved static/browser-only operation, inactive ads, inactive analytics, and no backend/database requirement.

Next: Deploy through Cloudflare Workers Static Assets, then audit the live URL.


## EP-044 deliverables

- Added hidden, first-party passive-revenue containers on the homepage and guide pages.
- Added fail-closed revenue-readiness controller that keeps slots hidden unless future config and approvals explicitly enable them.
- Updated ad-readiness config and passive-revenue metadata.
- Added long-term passive-revenue readiness documentation.
- Preserved static/browser-only architecture, inactive ads, inactive analytics, no backend, no database, no runtime dependency, and hosting portability.

Next: deploy/audit the live Cloudflare URL. Real ads require future explicit approval and a monetization activation EP/ADR.


## EP-045 — Production URL and Live Launch Finalization

- Base: committed EP-044 repository ZIP.
- Production URL: `https://citejury.citejury.workers.dev`.
- Added absolute sitemap/canonical/og:url metadata for public pages.
- Disabled Wrangler preview URLs explicitly.
- Removed remaining public internal EP/owner workflow wording.
- No backend, database, build step, ads, or analytics added.
- File deletion required: none.

## EP-046 — Live Production Audit and Verified Fixes

- Base: committed EP-045 repository ZIP.
- Production URL audited: `https://citejury.citejury.workers.dev`.
- Removed visible inactive-ad placeholder text from public guide pages while preserving inactive ad-readiness architecture.
- Added `assets/data/live-production-audit.json`.
- Added `docs/LIVE_PRODUCTION_AUDIT.md`.
- Added browser-only `tests/EP-046-live-production-audit.html`.
- Preserved static/browser-only architecture, no backend, no database, inactive ads, inactive analytics, and host portability.

Next: EP-047 — Search Engine Launch.


## EP-047 — Search Engine Launch

- Base: committed EP-046 repository ZIP.
- Production URL: `https://citejury.citejury.workers.dev`.
- Added search-engine launch metadata and documentation.
- Confirmed sitemap/robots production URL strategy for the current Workers URL.
- Removed unsupported public generator-style claims from homepage badges.
- Reduced Cloudflare deployed asset surface for docs/templates/markdown and added noindex headers for internal QA surfaces if accidentally served.
- Preserved static/browser-only architecture, no backend, no database, inactive ads, inactive analytics, and host portability.

Next: Google Search Console/Bing verification and sitemap submission, then EP-048 advertisement activation only after explicit approval.

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

- Base: committed EP-048 repository ZIP.
- Live URL checked directly: `https://citejury.citejury.workers.dev`.
- Added final unattended-operation metadata and runbooks.
- Updated release metadata, roadmap, README, GIT instructions, and project context.
- Added browser-only EP-049 final-operation validation page.
- Preserved static/browser-only architecture, no backend, no database, no active analytics, inactive ads, and host portability.
- Real ads remain inactive until Govind has account approval, publisher/slot IDs, ads.txt, privacy review, and explicit activation approval.

Next: manual Google Search Console/Bing setup, then future ad approval/activation only when ready. No routine EPs needed.


## EP-050 — Public Polish & Validation Error Navigation
- Added automatic smooth scroll and focus to generator validation errors.
- Re-audited public pages for internal/ad-placeholder messaging.
- Preserved static, browser-only, host-portable architecture.


## EP-051 — Scroll to Invalid Input Field
- Corrected generator validation UX to scroll/focus the invalid input field.
- Added raw validation field metadata for deterministic UI targeting.
- Preserved browser-only/static architecture and ad-inactive state.


## EP-052 — Fix Invalid Field Scroll/Focusing
- Disabled native browser blocking validation for the citation generator form.
- Ensured failed generation focuses and scrolls to the actual invalid input field.
- Preserved browser-only static architecture and public ad inactivity.


## EP-053 — Cross-Browser Validation Navigation Fix
- Replaced direct scrollIntoView validation navigation with calculated window.scrollTo positioning.
- Added delayed post-focus scroll correction for mobile Chrome visual viewport changes.
- Preserved reduced-motion behavior, accessibility focus, and no-backend/no-build architecture.


## EP-054 — Asset Cache Busting & Update Freshness
- Added versioned CSS/JS asset URLs across public pages and browser test pages.
- Added `assets/asset-version.json` documenting the current asset version.
- Preserves static/browser-only/host-portable architecture and Cloudflare/S3 portability.


## EP-055 — Citation Form Clarity, Inline Validation & Batch A Content Upgrade
- Dynamic Required/Optional field labels.
- Inline field errors with invalid-field navigation.
- Expanded five priority citation guides.


## EP-056 — Fix Required/Optional Field Status Rendering
- Exposed citation rule specs to the browser UI so dynamic Required/Optional labels render correctly.
- Bumped asset version to 056 so browsers fetch the fixed JavaScript.


## EP-057 — Dynamic Citation Field Labels & Display Variants
- Added dynamic field labels and helper text based on citation style/source type.
- Inline validation errors now use current field labels.
- Added APA-style and Chicago-style post-generation display drafts with verification warnings, without claiming full APA/Chicago generator support.
- Bumped asset version to 057.


## EP-058 — Citation Anatomy™
- Added Citation Anatomy™ after successful generation.
- Added rule-aware component explanations, why-this-format text, verification checklist, common mistakes, and learn-more links.
- Bumped asset version to 058.


## EP-059 — Authority Guides Expansion
- Expanded five priority authority guides: Legal Citation Basics, SCC, AIR, Supreme Court judgment, and OSCOLA India.
- Added anatomy-style explanations, required-field guidance, common mistakes, source/authority notes, and internal learning paths.
- Bumped asset version to 059.


## EP-060 — Visual Citation Learning
- Added visual citation anatomy blocks to priority guides.
- Added structure cards, common mistake cards, flow diagrams, and decision guidance.
- Cleaned selected repeated guide sections from prior expansion work.
- Bumped asset version to 060.
