# Final Codex Audit Prompt

Perform a comprehensive final production audit of CiteJury.

Verify:
- Generator accuracy for all supported formats.
- Checker SCC/AIR/INSC recognition and malformed-input safety.
- Citation Doctor accuracy, no invented values, no stale results.
- Cross-format contamination matrix.
- 100-operation endurance test.
- Copy, alternative copy, suggested copy and download.
- Mobile navigation and result scrolling.
- Accessibility and keyboard behavior.
- Security and XSS safety.
- Ads disabled state and ad activation readiness.
- CSP/privacy/ads.txt consistency.
- SEO: robots, sitemap, canonicals, metadata, social images, 404.
- Release metadata and asset-version consistency.
- Performance and console/network errors.
- Architecture compliance: static, browser-only, no backend, no database, no required API.

End with:
Release blockers, High/Medium/Low issues, exact inputs, actual outputs, root cause, minimal patch proposals, and recommendation: Freeze / Hotfix / Roll back.
