# Supported browser baseline

CiteJury is a static, browser-only citation toolkit. It is designed for current evergreen browsers and intentionally avoids backend services, databases, build-time runtimes, accounts, and required APIs.

## Supported baseline

- Chrome / Chromium: current and recent versions
- Microsoft Edge: current and recent versions
- Firefox: current and recent versions
- Safari: current and recent versions on macOS and iOS
- Android browsers based on current Chromium

## JavaScript expectations

The public runtime uses modern browser APIs including `classList`, `dataset`, `querySelector`, `addEventListener`, `replaceChildren`, `URL`, `history.replaceState`, and the Clipboard API with a legacy `execCommand("copy")` fallback.

Older browsers may still render the static content, but interactive citation generation, citation checking, navigation enhancement, and copy actions are only supported on the baseline above.

## Architecture note

This browser baseline does not change the core architecture: CiteJury remains static, backend-free, database-free, account-free, and suitable for unattended static hosting.
