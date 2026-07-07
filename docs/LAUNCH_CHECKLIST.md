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
