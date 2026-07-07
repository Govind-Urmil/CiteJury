# Launch Decision

## Recommended State
CiteJury is ready for static-hosting setup after EP-025 is committed and the obsolete Python preflight file is removed.

## Recommended hosting path
Use a private Git repository with a free static host that supports private repo deployment, such as:
- Cloudflare Pages
- Netlify
- Vercel

Avoid GitHub Pages if keeping the source repository private is required.

## Not approved yet
Do not enable without explicit approval:
- Backend
- Database
- Paid infrastructure
- Third-party ad network scripts
- Analytics scripts
- User accounts
- Form submission to a server
