# Hosting Options

CiteJury is designed for static hosting with zero or near-zero maintenance cost.

## Recommended for private repo + free public site
- Cloudflare Pages
- Netlify
- Vercel

## Use carefully
- GitHub Pages: simple, but personal-account public Pages usually means public source repo.
- AWS S3 + CloudFront: scalable, but may introduce non-zero cost.

## Current architecture
- Static HTML
- Static CSS
- Browser JavaScript
- No backend
- No database
- No build step required

No hosting change should introduce backend architecture without explicit approval.
