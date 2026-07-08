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
