# Post-Launch Unattended Operations

CiteJury is intentionally designed so Govind can leave it running for months or even a year with minimal maintenance.

## What keeps running without monitoring

- Static pages served from a static host
- Browser-only citation generation
- Browser-only validation/explainability
- Public guide pages
- Reserved but inactive ad containers
- Static privacy, terms, trust, robots, sitemap, and manifest files

## What is not required

- Backend server
- Database
- Python runtime
- Node runtime
- Build step
- Scheduled job
- Server-side logs
- User account system
- Payment system
- Paid infrastructure for normal operation

## Low-maintenance safeguards

- Test corpus is manual/test-only and not loaded by public pages.
- Ads and analytics are inactive by default.
- CSP blocks unexpected third-party scripts unless a future approved EP changes it.
- Citation rules are scoped and documented rather than silently guessed.
- Static-host metadata documents remaining production-domain steps.

## Recommended passive checks if Govind revisits later

When Govind returns after a long break, run the browser test pages under `tests/`, check the deployed homepage, and confirm the domain/hosting account is still active. No routine database, server, queue, or backend maintenance is expected.
