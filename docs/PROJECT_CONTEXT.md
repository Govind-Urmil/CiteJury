# CiteJury Project Context

## Current Status
Completed EP-001 through EP-024.

## Locked Architecture
Static, browser-first, free-to-host-first. No backend, database, Python runtime, Node runtime, build step, or architecture change without explicit approval.

## EP-024
Browser-only compliance and Python tooling removal:
- Removes `tests/preflight.py`
- Replaces Python preflight with browser-only checklist
- Keeps GitHub Actions shell-only static checks
- Updates production preflight documentation
- Reinforces no backend, no DB, no runtime dependency
- No architecture change

## Remaining Planned EP
- EP-025: Final production audit and launch package

## Bug Workflow
If a bug is reported, Govind will bring it back and it should be fixed in a new EP/patch EP without rewriting committed history.
