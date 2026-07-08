# Final Launch Handoff

## Current release

EP-040: Final Production Gold Release.

## Commit rule

Apply this EP by copying/extracting over the existing repository, then commit once.

```bash
git add .
git commit -m "EP-040: Final production gold release"
git push
```

## Required deletion commands

None.

## Production go-live reminder

Before public launch, replace placeholder sitemap URLs with the final domain and verify the selected static host applies `_headers` as expected.

## Do not activate yet

- Ads
- Analytics
- Backend
- Database
- Paid infrastructure
- User accounts
- Form submissions to a server

All of the above require explicit future approval.
