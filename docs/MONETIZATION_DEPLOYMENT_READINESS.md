# Monetization and Production Deployment Readiness

## EP-029 Scope
This EP prepares decision documentation and deployment readiness for future monetization without activating ads, analytics, backend, database, or paid infrastructure.

## Current Monetization Status
- Ad slots are reserved.
- No ad network script is active.
- No third-party advertising code is loaded.
- No user tracking has been added.
- No backend is required.

## Future monetization decision
Before enabling ads, create a future ADR covering:
- Chosen ad network
- Privacy impact
- Performance impact
- Page layout impact
- Legal/compliance considerations
- Whether cookie consent or disclosure is required
- Whether the ad network is compatible with a privacy-first product

## Recommended deployment path
Use a free static hosting provider that supports private repository deployment:
- Cloudflare Pages
- Netlify
- Vercel

Avoid GitHub Pages if keeping the source repository private is required.

## Production environment checklist
- Private repository remains private.
- Site is deployed as static files.
- No serverless functions enabled.
- No backend endpoints configured.
- No database provisioned.
- No paid infrastructure enabled by default.
- Domain settings documented.
- Sitemap submitted after public launch.


## EP-044 update

EP-044 adds hidden, first-party passive-revenue containers and fail-closed ad-readiness behaviour. Ads remain inactive and no third-party ad or analytics scripts are loaded. Future activation still requires Govind's explicit approval, provider/domain review, privacy update, CSP/header update, and live production validation.
