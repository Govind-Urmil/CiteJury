# EP-038 Security, Privacy and Production Hardening

EP-038 hardens CiteJury for long-term unattended static hosting while preserving the locked architecture.

## Production header policy

`_headers` now includes a strict self-hosted Content Security Policy, anti-sniffing, referrer, frame, permissions, cross-origin opener, HSTS, and cache policies. The policy is intentionally conservative because CiteJury has no active third-party scripts, analytics, ads, forms, backend, database, or account system.

Authoritative basis checked during EP-038:

- MDN Content Security Policy documentation.
- OWASP Secure Headers Project and HTTP Security Response Headers guidance.
- Google AdSense privacy/publisher policy guidance for future ad-readiness.

## Privacy posture

The public privacy page now clearly states the current static/browser-only data handling model and explains that ads and analytics are inactive. It also documents the conditions that must be met before advertising or analytics can be enabled.

## Long-term unattended operation

CiteJury is designed to keep working without regular owner monitoring by avoiding fragile server-side dependencies. Production operation should prefer a reputable static host with HTTPS, automatic CDN delivery, simple rollback, and no paid runtime service.

## Ad-readiness without activation

EP-038 does not add or activate ad scripts. It adds provider-neutral guardrails so a future monetization EP can be performed responsibly without surprise third-party requests or accidental privacy regressions.

## Not changed

- No backend.
- No database.
- No build step.
- No Node/Python runtime requirement for website operation.
- No active analytics.
- No active ad network script.
- No paid infrastructure.
