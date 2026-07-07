# Production Preflight

EP-023 adds automated repository integrity checks before deployment.

## Checks
- Required production files exist.
- Local HTML links resolve.
- Citation engine public contract exists.
- Existing static-only architecture checks continue.
- Existing no-active-ad-script checks continue.

## Run locally

```bash
python tests/preflight.py
```

## Reliability principle
Automate deterministic checks wherever possible. Bugs reported after launch should be reproduced, tested, and fixed in a new immutable EP.
