# Launch Decision

## Recommended State

After EP-040 is committed, CiteJury is ready for final static-host deployment once Govind selects the production domain and verifies host-level headers.

## Recommended hosting path

Use a private Git repository with a free static host that supports private repo deployment, such as:

- Cloudflare Pages
- Netlify
- Vercel static deployment

Avoid GitHub Pages if keeping the source repository private is required.

## Required before public go-live

- Replace placeholder sitemap URLs with the approved production domain.
- Deploy to HTTPS static hosting.
- Verify `_headers` behavior on the selected platform.
- Keep `security.txt` inactive unless a real contact/domain is approved.

## Not approved yet

Do not enable without explicit approval:

- Backend
- Database
- Paid infrastructure
- Third-party ad network scripts
- Analytics scripts
- User accounts
- Form submission to a server
