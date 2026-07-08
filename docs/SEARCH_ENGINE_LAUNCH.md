# EP-047 Search Engine Launch

Production URL: `https://citejury.citejury.workers.dev`

EP-047 prepares CiteJury for initial search-engine discovery on the temporary Cloudflare Workers URL while preserving the static/browser-only architecture.

## What changed

- Confirmed the production sitemap target: `https://citejury.citejury.workers.dev/sitemap.xml`.
- Confirmed `robots.txt` allows public crawling and exposes the absolute sitemap URL.
- Added search-engine launch metadata in `assets/data/search-engine-launch.json`.
- Removed unsupported public generator-style claims from the homepage style badges. Bluebook remains a guide topic, not a claimed generator output.
- Reduced the Cloudflare static asset deployment surface by excluding repository docs/templates/markdown from deployed static assets via `.assetsignore`.
- Added `X-Robots-Tag: noindex, nofollow` for docs/tests/templates if a future host accidentally serves them.
- Kept ads and analytics inactive.

## Google Search Console steps

1. Open Google Search Console.
2. Add a URL-prefix property for `https://citejury.citejury.workers.dev`.
3. Choose an HTML file or HTML meta-tag verification method.
4. Send the exact verification file/tag to ChatGPT before committing it. Do not guess the token.
5. After verification succeeds, submit `sitemap.xml` in the Sitemaps report.

## Bing Webmaster Tools steps

1. Open Bing Webmaster Tools.
2. Add the same site URL.
3. Use Google Search Console import if available, or verify manually.
4. Submit `https://citejury.citejury.workers.dev/sitemap.xml`.

## Custom domain migration later

When Govind buys a custom domain, create a focused EP to replace:

- `productionBaseUrl` values.
- Canonical URLs.
- `og:url` values.
- `robots.txt` sitemap URL.
- `sitemap.xml` `<loc>` values.
- Web manifest `id`/`start_url` if needed.
- Hosting DNS/header notes.

No citation engine rewrite should be required for the custom-domain move.
