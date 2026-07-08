# GitHub Pages Initial Launch

EP-042 prepares CiteJury for an initial GitHub Pages launch without buying a domain.

## What changed

- Removed the public homepage `Static-hosting ready` badge.
- Removed the direct HTML manifest link that causes a local `file://` browser CORS warning.
- Added a small browser guard that loads `manifest.webmanifest` only on `http:` or `https:` pages.
- Added `sitemap.github-pages-template.xml` for the temporary GitHub Pages URL.

## GitHub Pages launch path

For an initial repository Pages URL, the public URL usually has this shape:

```text
https://OWNER.github.io/REPOSITORY/
```

Before submitting the sitemap to search engines, copy `sitemap.github-pages-template.xml` to `sitemap.xml` and replace:

```text
OWNER      -> your GitHub username or organization
REPOSITORY -> the repository name used for GitHub Pages
```

If the repository is the special user/organization Pages repository, the URL may be:

```text
https://OWNER.github.io/
```

In that case, remove `/REPOSITORY` from the sitemap URLs.

## When moving to a custom domain later

When a real domain is purchased, update these items in one focused EP:

1. Add or confirm the GitHub Pages `CNAME` file.
2. Update GitHub Pages custom domain settings.
3. Configure DNS at the domain registrar.
4. Replace GitHub Pages sitemap URLs with the custom domain.
5. Update `security.txt` `Canonical` only after the final domain is live.
6. Add canonical/OG absolute URLs if approved for SEO hardening.
7. Re-check CSP and ad-readiness before activating ads.

Ads and analytics remain inactive until Govind explicitly approves activation.
