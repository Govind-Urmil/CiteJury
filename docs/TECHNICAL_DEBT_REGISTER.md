# Technical Debt Register

This register tracks deferred work that is not blocking the current release.

| Item | Priority | Reason deferred | Future action |
| --- | --- | --- | --- |
| PNG social preview fallback | Low | SVG is lightweight and acceptable for now | Add PNG if social crawler previews fail |
| Asset version centralization | Medium | Current manual versioning works but is repetitive | Consider a static helper script without adding runtime dependency |
| Public tests exposure | Low | WFVS is noindex and useful for release checks | Revisit during Website Starter extraction |
| Ad-readiness request optimization | Low | Ads remain inactive and framework is fail-closed | Revisit only before ad activation |
| Rule-spec full consolidation | Medium | EP-064 fixes consistency but avoids risky rewrite | Plan a focused rule-engine EP |
