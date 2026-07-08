# Production Ad CSP Template (Inactive)

Status: inactive until Govind approves a monetization ADR and a specific ad provider.

CiteJury currently ships with a strict self-hosted Content Security Policy in `_headers`:

```text
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'self'; object-src 'none'
```

Do not loosen this policy merely to test ads. When a provider is approved, create a dedicated EP that:

1. Identifies the exact provider and publisher account requirements.
2. Lists every script, frame, image, connect, and reporting origin required by that provider.
3. Updates `privacy.html` before any third-party request is enabled.
4. Adds a consent/privacy decision for jurisdictions where required.
5. Keeps ads outside the active citation workflow.
6. Adds browser tests proving the generator still works with ads disabled and enabled.
7. Confirms ad placeholders do not cause layout shift.

No ad network origin is approved in EP-038.
