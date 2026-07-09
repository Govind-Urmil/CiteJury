# CiteJury Advertisement Activation Checklist

Ads must remain disabled until every item below is complete.

## Required before activation
- Owner explicitly approves activation.
- Google AdSense account/site approval is complete.
- Publisher/client ID is final.
- `ads.txt` contains the approved publisher ID.
- CSP is updated deliberately for AdSense domains.
- Privacy Policy accurately describes active ads.
- Ad slots are verified once per intended location.
- Ads are tested on desktop and mobile.
- No layout shift or console errors are introduced.
- Final Codex audit confirms ad-enabled mode.

## Default state
`assets/data/ads-config.json` must keep `ads_active: false` until activation is approved.

## Architecture rule
Ad activation must not introduce a backend, database, account system, analytics dependency, or required API.
