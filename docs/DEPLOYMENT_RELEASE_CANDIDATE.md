# EP-039 Deployment Release Candidate

EP-039 prepares CiteJury for final deployment review while preserving the locked architecture.

## Release candidate position

CiteJury remains:

- Static HTML/CSS/JavaScript.
- Browser-first.
- No backend.
- No database.
- No Python runtime requirement.
- No Node runtime requirement.
- No build step requirement.
- Ads inactive.
- Analytics inactive.

## Required before public go-live

1. Choose the production domain.
2. Replace `sitemap.xml` URLs using `sitemap.production-template.xml` as the absolute URL model.
3. Deploy to the chosen static host over HTTPS.
4. Verify production headers on the deployed URL because header behavior varies by host.
5. Keep `.well-known/security.txt` inactive until a real contact/domain is approved.
6. Do not activate ads or analytics until a separate approval EP updates privacy language, CSP, and configuration.

## Unattended operation design

The site is designed to continue serving users without server maintenance because citation generation, guide pages, trust pages, and tests are static/browser-only. The remaining operational risks are mostly external: domain renewal, static host availability, and future ad network policy changes if monetization is later activated.

## Ad-readiness

Ad slots and ad configuration remain reserved but inactive. This protects user trust and avoids third-party script risk before the final monetization approval step.
