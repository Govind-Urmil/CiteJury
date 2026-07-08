# EP-044 Long-Term Passive Revenue Readiness

CiteJury is intended to run unattended for long periods after launch while remaining free for users and prepared for responsible future advertising.

## Current status

- Ads are not active.
- Analytics are not active.
- No third-party advertising script is loaded.
- No backend, database, account system, or scheduled job has been added.
- Citation generation does not depend on advertising code.

## What EP-044 adds

EP-044 adds hidden, first-party revenue containers and a fail-closed revenue-readiness controller. The controller reads `assets/data/ads-config.json`; if the config is unavailable, inactive, malformed, or missing provider approval, all revenue slots remain hidden.

Reserved slots:

- `ad-home-after-generator` — homepage after the citation generator, never inside the active workflow.
- `ad-home-before-faq` — lower homepage slot before FAQ.
- `ad-guide-footer` — guide pages near the end of the article.

## Why this is durable

If an ad blocker blocks future ad scripts, the citation generator and guide pages still work. If an ad network is down, navigation and citation output still work. If `ads-config.json` fails to load, the site simply hides all ad containers.

## What must happen before real ads are enabled

Real ad activation still requires Govind's explicit approval and a focused future EP/ADR covering:

1. selected ad provider,
2. live site URL/domain,
3. publisher/client IDs,
4. `ads.txt` if required by the provider,
5. privacy-policy update,
6. cookie/consent review,
7. CSP/header update for the exact provider domains,
8. layout review on mobile and desktop,
9. production test confirming citation generation still works if ads fail.

Do not enable auto ads, popups, interstitials, sticky overlays, deceptive ads, or ads inside citation output controls.

## Cloudflare now and AWS S3 later

The revenue containers are plain HTML/CSS/JavaScript and do not depend on Cloudflare-specific APIs. The same static files can be moved to AWS S3 static website hosting later without website code changes. Hosting-specific headers and DNS would still need host-specific configuration.
