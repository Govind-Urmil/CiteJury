# CiteJury Production Freeze Checklist

Use this checklist before final monetization/freeze.

## Core tool accuracy
- Generator fresh-format matrix passes.
- Generator cross-format switching passes.
- Checker SCC, AIR and INSC pass citation-only and complete case-name forms.
- Checker malformed inputs fail safely.
- Citation Doctor never invents missing factual values.
- Citation Doctor downgrades invalid/implausible values.
- Copy, alternative copy and download are verified in browser.

## Site stability
- No console errors.
- No failed public asset requests.
- Mobile navigation works.
- `#checker` and workspace routing work.
- Secondary fragments are not rewritten.
- All public links work.
- Sitemap and robots are valid.
- Metadata and asset versions are consistent.

## Ads
- Ads are disabled until explicit activation.
- Exactly one intended ad slot per location.
- CSP, privacy wording and ads.txt are coordinated before activation.
- Ad-enabled mode receives a separate final browser review.

## Final release rule
After final Codex audit, fix only release blockers or High/Critical defects.
