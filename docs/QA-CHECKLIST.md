# QA Checklist

## EP-014 Scope
Accessibility and QA hardening for the static CiteJury site.

## Manual Checks
- Page loads without console errors.
- Navigation menu opens and closes on mobile.
- Keyboard users can reach navigation, form controls, copy button, download button, FAQ items, and footer links.
- Skip link moves focus to main content.
- Required title validation shows a readable error.
- Invalid year validation shows a readable error.
- Generated citation appears in the output panel.
- Copy button updates user feedback.
- Download button creates a `.txt` citation file.
- FAQ details can be opened by keyboard.
- Layout remains usable at mobile width.
- Page remains readable with reduced motion preference.

## Static Architecture Checks
- No backend calls.
- No API keys or secrets.
- No third-party ad scripts.
- No build step required.
- Files are deployable as static HTML/CSS/JS.
