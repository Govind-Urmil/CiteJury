# CiteJury Project Context

## Current Status
Completed EP-001 through EP-025.

## Final State
CiteJury is at final production audit package stage.

## Locked Architecture
Static, browser-first, free-to-host-first. No backend, database, Python runtime, Node runtime, build step, or architecture change without explicit approval.

## EP-025
Final production audit package:
- Adds FINAL_AUDIT.md
- Adds CLEANUP_INSTRUCTIONS.md
- Adds LAUNCH_DECISION.md
- Adds browser-only final release checklist
- Updates release metadata
- Explicitly identifies obsolete Python file cleanup
- No backend or architecture change

## Required Manual Cleanup
Because EP packages are copied over existing repo contents, run:

```bash
git rm tests/preflight.py
```

Then commit EP-025.

## Future Workflow
If bugs are reported, fix them in new immutable EP/patch EP commits.
