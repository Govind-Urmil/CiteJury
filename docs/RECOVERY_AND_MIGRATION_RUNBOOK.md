# CiteJury Recovery and Migration Runbook

## Recovery source of truth

The private GitHub repository is the source of truth. Local EP ZIPs are secondary convenience artifacts.

Recommended local retention: latest three EP ZIP deliveries plus GitHub history.

## Rollback on Cloudflare

If a deployment breaks the live site:

1. Open Cloudflare dashboard.
2. Go to CiteJury deployments.
3. Select the last known-good deployment.
4. Use Cloudflare rollback/redeploy controls.
5. Confirm `https://citejury.work-on.workers.dev` loads again.
6. Fix the repository with a new EP before pushing again.

## Repository recovery

If local files are lost:

1. Clone the private GitHub repository.
2. Confirm the latest commit is present.
3. Avoid reconstructing from old EP ZIPs unless GitHub is unavailable.

## Cloudflare to custom domain

When a custom domain is purchased:

1. Add the custom domain in Cloudflare.
2. Configure DNS and HTTPS.
3. Update production URL metadata in the repository.
4. Regenerate sitemap and canonical URLs.
5. Update Search Console/Bing.
6. Update AdSense site/ads.txt if ads are approved.
7. Keep the old Workers URL only as a fallback until the new domain is verified.

## Cloudflare to AWS S3/static host

1. Upload static site files to S3/static host.
2. Use `index.html` and `404.html` as static website documents.
3. Configure HTTPS, CDN, redirects, cache rules, and security headers in the host/CDN layer.
4. Update production URL metadata if the host/domain changes.
5. Validate links, sitemap, robots, generator, and test corpus.

## Emergency ad disable

If ads are ever activated and later cause an issue:

1. Set `ads_active` to `false` in `assets/data/ads-config.json`.
2. Ensure all slot `active` values are `false`.
3. Commit and push.
4. Confirm no AdSense script loads on the live site.

The current EP-049 state already has ads inactive.
