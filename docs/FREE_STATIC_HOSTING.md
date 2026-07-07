# Free Static Hosting Pack

EP-022 prepares CiteJury for free/static hosting without changing architecture.

## Added files
- `_headers`
- `_redirects`
- `.well-known/security.txt`
- `privacy.html`
- `terms.html`

## Best-fit hosts
- Cloudflare Pages
- Netlify
- Vercel static
- GitHub Pages only if public source is acceptable

## No architecture change
This EP does not add:
- Backend
- Database
- Server functions
- Paid dependency
- Third-party ads
- Analytics

## Before production
Replace placeholder values in `.well-known/security.txt`:
- `security@example.com`
- `https://example.com`
