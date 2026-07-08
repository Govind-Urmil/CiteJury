# Launch Safety Fixes

## EP-031 Scope
This EP fixes repo-level launch blockers found during the full repository audit after EP-030.

## Changes
- GitHub Actions checks now avoid false positives from documentation text.
- `security.txt` placeholder is made intentionally inactive until real contact/domain approval.
- Added `sitemap.production-template.xml` for final absolute production URLs.
- Strengthened `.gitignore` for credentials and generated files.
- No backend, database, Python runtime, Node runtime, active ads, or analytics were added.

## Important before production
Before submitting a sitemap to search engines, replace the production domain in `sitemap.production-template.xml` and publish it as `sitemap.xml`.

Before relying on `security.txt`, approve and replace:
- Security contact email
- Canonical production URL

## No file deletion required
EP-031 does not require `git rm`.
