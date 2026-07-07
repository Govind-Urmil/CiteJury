# Deployment Handoff

## Recommended next action
Deploy CiteJury to a free static host connected to the private Git repository.

## Preferred options
- Cloudflare Pages
- Netlify
- Vercel

## Deployment requirements
- Publish the repository root containing `index.html`.
- Do not enable serverless functions.
- Do not provision a database.
- Do not activate paid services by default.
- Keep ads and analytics disabled until separately approved.

## After deployment
- Open the public URL on desktop and mobile.
- Generate citations.
- Test copy/download actions.
- Open trust/privacy/terms pages.
- Open multiple guides.
- Confirm sitemap and robots files are public.
- Replace placeholder values in `.well-known/security.txt` before relying on that file publicly.
