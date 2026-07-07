# Cleanup Instructions

## Required cleanup before committing EP-025

Run:

```bash
git rm tests/preflight.py
```

If Git says the file does not exist, that is fine.

## Why
EP-024 removed Python tooling from the package, but copying ZIP contents over an existing repository does not delete old files. This command removes the obsolete Python preflight file from Git history going forward.

## After cleanup

```bash
git add .
git commit -m "EP-025: Add final production audit package"
git push
```
