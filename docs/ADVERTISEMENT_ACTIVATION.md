# EP-048 Advertisement Activation Framework

EP-048 prepares CiteJury for responsible advertising without turning on real advertisements. The site remains static, browser-first, host-portable, and free of backend/database/runtime requirements.

## Current state

- Live production URL: `https://citejury.work-on.workers.dev`
- Candidate provider: Google AdSense
- Real ad serving: **inactive**
- Analytics: **inactive**
- No publisher ID has been added.
- No third-party ad script loads while `ads_active` is `false`.

## Why ads are not fully active yet

Google AdSense requires the publisher to use the AdSense code from the account, and ads.txt should contain the correct publisher ID when used. CiteJury cannot safely activate real ads until Govind has a real AdSense publisher/client ID and the site is approved in AdSense.

## Future no-code activation path

After AdSense approval, update configuration/data files rather than changing website logic:

1. Copy the real AdSense client ID, for example `ca-pub-XXXXXXXXXXXXXXXX`.
2. Copy the ads.txt publisher ID, for example `pub-XXXXXXXXXXXXXXXX`.
3. Rename/copy `ads.txt.template` to `ads.txt` and replace the placeholder publisher ID.
4. In `assets/data/ads-config.json`, set:
   - `provider_policy.publisher_client_id` to the real `ca-pub-...` value.
   - `provider_policy.ads_txt_publisher_id` to the matching `pub-...` value.
   - approved slot `ad_slot` IDs from AdSense.
   - `active: true` only for selected slots.
   - `ads_active: true` after the privacy and smoke-test checks pass.
5. Commit and push. Cloudflare will deploy the static update.

## Guardrails

- No ad is placed inside citation form fields, citation output, copy/download controls, validation messages, or explanation panels.
- If config is missing, disabled, malformed, or incomplete, all slots stay hidden.
- If AdSense fails to load, the citation generator continues to work.
- When moving to a custom domain, update sitemap/canonical URLs, AdSense site entry, and `/ads.txt` for the new host.

## Production CSP activation note

EP-065/EP-066 keep the production Content Security Policy restricted to same-origin resources while ads are inactive. Turning on AdSense later is therefore not a config-only switch: the approved ad activation EP must also update `_headers` to allow only the exact required Google advertising domains, then run privacy, security, mobile, and citation-regression smoke tests before deployment.

## Sources checked

- Google AdSense program policies.
- Google AdSense ads.txt guide.
- Google AdSense code setup guidance for Auto ads/ad units.


## EP-069 launch-readiness update

AdSense activation remains approval-gated. EP-069 improves documentation and launch SEO metadata but does not enable ads, does not add active third-party ad scripts, and does not loosen the production CSP. Real ad activation still requires owner approval, a real AdSense publisher ID, matching ads.txt, privacy review, CSP update, and live smoke testing.

## EP-070 release-candidate update

EP-070 keeps ads disabled while strengthening release checks for the homepage revenue path and `assets/data/ads-config.json`. AdSense remains approval-gated. EP-071 may activate production ads only after owner approval, a valid publisher ID, matching `ads.txt`, privacy review, CSP update, and live smoke testing.

## EP-071 production/AdSense foundation update

EP-071 removes duplicate guide footer ad slots, adds CI and runtime duplicate-slot guardrails, and keeps all advertising disabled until owner approval and valid AdSense details are configured. The production CSP remains conservative while ads are inactive. A future activation commit must add the exact AdSense CSP allowances, publish a matching `ads.txt`, configure real publisher/client and slot IDs, set `ads_active` only after smoke testing, and verify no duplicate slots or citation-workspace interference.
