# Deployment Go-Live Steps

Use this checklist after EP-040 is committed and before public production launch.

## 1. Domain

- Choose the production domain.
- Update `sitemap.xml` with absolute production URLs.
- Keep `sitemap.production-template.xml` as the reusable production URL template.

## 2. Static host

Recommended zero/near-zero maintenance options:

- Cloudflare Pages.
- Netlify.
- Vercel static deployment.

GitHub Pages is acceptable when public repository visibility is acceptable. If the repository must remain private, use a host that supports private repository deployment.

## 3. Headers

Confirm the deployed site applies the intended security headers from `_headers`. If a chosen host does not support `_headers`, configure equivalent headers in that host's dashboard or config file before launch.

## 4. Final manual checks

- Open the homepage.
- Generate one SCI neutral citation.
- Generate one SCC-style citation.
- Generate one OSCOLA case citation.
- Open `privacy.html`, `terms.html`, and `trust.html`.
- Open the EP-036 corpus test manually and confirm the pass count.
- Confirm no ad or analytics script loads.

## 5. Ads and analytics

Do not activate ads or analytics during EP-040. Future monetization requires a separate approval EP/ADR.
