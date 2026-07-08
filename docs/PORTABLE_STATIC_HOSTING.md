# Portable Static Hosting

EP-043 keeps CiteJury deployable as a static website without changing the website code when moving between hosts.

## Current target: Cloudflare Workers Static Assets

Cloudflare's current static-assets flow can serve HTML, CSS, JavaScript, images, and other files through Workers Static Assets. CiteJury uses `wrangler.jsonc` only as a deployment adapter. It does not add a backend, database, API, ads, analytics, or required runtime for site visitors.

Recommended Cloudflare settings:

```text
Build command: leave empty
Deploy command: npx wrangler deploy
Project name: citejury
Production branch: main
Environment variables: none
```

The `assets.directory` value is `.` because CiteJury is a root-level static site. `.assetsignore` prevents deployment-only and repository-control files from being uploaded as public static assets.

## Future target: AWS S3

No CiteJury website code change should be needed to move to S3 later. Upload the same committed static files and configure S3 static website hosting with:

```text
Index document: index.html
Error document: 404.html
```

If a custom domain is added later, update sitemap and canonical URL templates for that domain before launch.

## Portability rule

Host-specific files may be added for deployment, but the public site must continue to run from static HTML/CSS/JavaScript in the browser.
