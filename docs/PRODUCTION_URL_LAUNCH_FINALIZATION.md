# EP-045 — Production URL and Live Launch Finalization

Production base URL for the initial public launch:

```text
https://citejury.citejury.workers.dev
```

This is a temporary Cloudflare Workers Static Assets URL. It is suitable for initial public validation and early indexing, but it can later be replaced by a custom domain without changing CiteJury's citation-engine code.

## What EP-045 finalizes

- Uses the current Workers URL as the production base URL.
- Converts `sitemap.xml` to absolute production URLs.
- Adds canonical and Open Graph URL metadata to public HTML pages.
- Adds the sitemap reference to `robots.txt`.
- Sets `preview_urls` to `false` in Wrangler configuration.
- Removes remaining public-facing internal EP/owner workflow wording from the homepage, trust page, and terms page.
- Keeps ads and analytics inactive.

## Custom-domain migration later

When a custom domain is purchased, replace `https://citejury.citejury.workers.dev` with the custom domain in:

- `sitemap.xml`
- public page canonical URLs
- public page `og:url` metadata
- `manifest.webmanifest` `id`
- production launch documentation
- Cloudflare domain/route settings

Create or update `.well-known/security.txt` only after a real security contact email exists.

## AWS S3/static-host migration later

The same static site can be uploaded to AWS S3/CloudFront or another static host. Required hosting changes would be:

- configure `index.html` as the index document
- configure `404.html` as the error document where supported
- configure HTTPS and cache/security headers through the host/CDN
- update production URLs from the Workers URL to the chosen domain

No citation-engine code change should be required for S3/static hosting migration.

## Ads and analytics

Ads and analytics remain inactive. Do not submit ad network code until privacy, consent, policy, and layout checks are explicitly approved.
