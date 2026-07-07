# EP-025 Git Instructions

Before committing, remove obsolete Python tooling if it exists:

```bash
git rm tests/preflight.py
```

Then commit:

```bash
git add .
git commit -m "EP-025: Add final production audit package"
git push
```
