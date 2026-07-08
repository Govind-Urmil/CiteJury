# Static Launch Checklist

## Pre-launch
- Confirm `index.html` loads locally.
- Confirm guide pages load from `/guides/`.
- Confirm navigation works on desktop and mobile.
- Confirm citation generator works without internet access.
- Confirm no third-party ad script is active.
- Confirm no backend endpoint is required.
- Confirm `robots.txt`, `sitemap.xml`, and `manifest.webmanifest` exist.
- Confirm favicon loads.
- Confirm GitHub Actions static check passes.
- Confirm repository remains private if production source should not be public.

## Deployment Options
Use a free/static host first:
- Cloudflare Pages
- Netlify
- Vercel static hosting
- GitHub Pages only if public repo is acceptable
- AWS S3 later only if approved and cost is acceptable

## Post-launch
- Submit sitemap to search engines.
- Test mobile performance.
- Verify all guide links.
- Review analytics/ad approach only after approval.

## EP-039 release-candidate additions

- Confirm production domain before changing `sitemap.xml`.
- Verify static host header behavior after deployment.
- Keep ads and analytics inactive until explicitly approved.
- Run `tests/EP-039-deployment-release-candidate.html` manually in a browser.
- Keep latest 3 EP ZIPs locally plus GitHub repository history for normal recovery.


## EP-040 final gold additions

- Run `tests/EP-040-final-production-gold.html` manually in a browser.
- Confirm `assets/data/final-production-gold-release.json` reports EP-040.
- Confirm ads and analytics remain inactive.
- Confirm public pages do not load `tests/citation-accuracy-corpus.js`.
- Replace sitemap placeholder URLs with the production domain before public launch.
- Verify `_headers` on the selected static host after deployment.
