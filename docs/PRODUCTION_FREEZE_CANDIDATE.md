# CiteJury Production Freeze Candidate

Release: EP-079

CiteJury is now in production-freeze candidate mode.

## Freeze rule

Do not add new features before final audit.

Only fix:
- Release blockers
- High/Critical accuracy issues
- Security issues
- AdSense activation blockers
- Search indexing blockers

## Final audit required

Run the comprehensive Codex audit before enabling ads or declaring v1.0 frozen.

## Architecture freeze

CiteJury remains:
- static
- browser-only
- backend-free
- database-free
- account-free
- API-free for core functionality
- free/static-host compatible
- designed for low-maintenance unattended operation

## Ads

Ads remain disabled until:
- final audit passes
- AdSense approval exists
- publisher ID is configured
- ads.txt is finalized
- CSP/privacy wording are aligned
- owner explicitly approves activation
