# EP-040 Final Production Gold Release

EP-040 completes the planned CiteJury EP-031 to EP-040 post-audit hardening roadmap.

## Final release position

CiteJury is ready for final static-host deployment after the production domain is chosen and the deployed host is manually checked for header behavior.

## Preserved architecture

- Static website
- Browser-first operation
- HTML/CSS/JavaScript only
- No backend
- No database
- No Python runtime requirement
- No Node runtime requirement
- No build step requirement
- No active ads
- No active analytics
- Free/static-hosting-first

## Trust posture

CiteJury now favors scoped, provenance-aware citation support over broad unsupported claims. Generated outputs expose validation and explainability details where supported. Users are still told to manually verify formal filings, court submissions, and journal requirements against the controlling authority.

## Long-term unattended operation

The site is designed to keep working for months or years as a static browser site after launch, assuming the static host and domain remain active. There is no backend process, database, scheduled job, paid runtime, server log dependency, or build pipeline required for normal visitor operation.

## Passive monetization posture

Ad placements remain reserved but inactive. Passive revenue can be enabled only through a future approved monetization EP/ADR that updates privacy text, CSP, ad configuration, and performs fresh testing. No ad network script is active in EP-040.

## Final launch items outside the repository ZIP

These items require Govind's production choices and cannot be safely guessed in this package:

1. Replace placeholder URLs in `sitemap.xml` with the approved production domain.
2. Deploy to an HTTPS static host.
3. Verify `_headers` behavior on the selected host.
4. Decide whether to activate a real `security.txt` contact.
5. Keep ads and analytics inactive until explicitly approved.

## Future change policy

After EP-040, changes should be maintenance-only unless Govind approves a new EP series. Acceptable future work includes verified citation corrections, legal-authority updates, content improvements, production-domain updates, approved monetization activation, or security/privacy fixes.
