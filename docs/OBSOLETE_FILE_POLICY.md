# Obsolete File Policy

Because Govind applies EPs by extracting/copying package contents into the existing repository, files removed from a later EP ZIP will not automatically disappear from Git.

## Rule
Whenever a file must be removed, future EPs must explicitly say so in:

- Final response
- `GIT.md`
- Relevant cleanup documentation

## Current known obsolete file
- `tests/preflight.py`

## Required command
```bash
git rm tests/preflight.py
```

## Future practice
Every EP that removes files must include explicit `git rm` commands.
