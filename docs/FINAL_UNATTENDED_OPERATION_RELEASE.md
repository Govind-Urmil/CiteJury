# EP-049 Final Unattended Operation Release

EP-049 records CiteJury's final unattended-operation handoff after the live Cloudflare Workers deployment and EP-048 advertisement activation framework.

## Current live site

- Production URL: `https://citejury.work-on.workers.dev`
- Sitemap: `https://citejury.work-on.workers.dev/sitemap.xml`
- Robots: `https://citejury.work-on.workers.dev/robots.txt`
- Current host: Cloudflare Workers Static Assets
- Repository: private GitHub repository remains the source of truth

## Long-term operating model

CiteJury is designed to keep running as static files for months or years without routine server maintenance.

Required for normal public operation:

- HTML, CSS, JavaScript and static JSON assets
- Static host with HTTPS
- Browser execution on the visitor's device

Not required for normal public operation:

- Backend server
- Database
- Python runtime
- Node runtime for visitors
- Build step
- Server-side queues, cron jobs, user accounts, or API keys
- Routine database/server patching by Govind

## Citation reliability posture

Citation output remains intentionally scoped. The engine should not be expanded casually. Future citation-rule changes should continue requiring authority basis, documented scope, validation rules, edge cases, and browser tests.

## Advertisement posture

EP-048 prepared a fail-closed Google AdSense activation framework. Real ads remain inactive.

Do not activate ads until all of these are true:

1. AdSense site approval exists for the live URL or future custom domain.
2. A real publisher/client ID is available.
3. `ads.txt` has the correct publisher ID.
4. Real slot IDs are approved and added.
5. Privacy/CSP/ad smoke tests pass.
6. Govind explicitly approves activation.

If any requirement is missing, the site should remain usable and ad slots should stay hidden.

## Search-engine launch posture

The site is ready for manual search-engine submission, but submission remains an account-level action outside the static repository.

Manual launch tasks:

- Add the property in Google Search Console.
- Verify ownership using the provided method from Google.
- Submit `https://citejury.work-on.workers.dev/sitemap.xml`.
- Repeat equivalent setup in Bing Webmaster Tools if desired.

## When Govind returns after months or years

Use this minimal check:

1. Open `https://citejury.work-on.workers.dev`.
2. Generate one Indian citation and one OSCOLA citation.
3. Open `sitemap.xml` and `robots.txt`.
4. Check Cloudflare deployment status.
5. Open browser console on homepage and generator.
6. If monetized, check AdSense account status and policy messages.
7. Run browser-only test pages if making any repository change.

## Future custom domain migration

When a custom domain is purchased, create a focused EP to update:

- canonical URLs
- Open Graph URLs
- sitemap URLs
- robots sitemap line
- manifest start/display URL if needed
- Cloudflare custom domain route
- Search Console property
- AdSense site entry and `ads.txt`

## Future AWS S3/static-host migration

The website should remain portable. For AWS S3/static hosting, use:

- `index.html` as the index document
- `404.html` as the error document
- uploaded static files from the repository root excluding development/internal files
- CloudFront or equivalent HTTPS/CDN layer for production headers

No website code change should be needed unless the production URL changes.

## Final recommendation

After EP-049, stop making EPs unless there is a real production issue, a validated citation-authority improvement, an indexing/ad requirement, or a hosting/domain migration.
