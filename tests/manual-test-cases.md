# Manual Test Cases

## Citation Generator
1. Submit empty form.
   - Expected: title error appears.
2. Enter title only.
   - Expected: citation generated using title.
3. Enter invalid year `20AA`.
   - Expected: year validation error appears.
4. Enter valid judgment data.
   - Expected: formatted citation and explanation list appear.
5. Click copy.
   - Expected: button feedback changes to `Copied`.
6. Click download.
   - Expected: text file downloads.

## Navigation
1. On mobile width, click Menu.
   - Expected: navigation opens and `aria-expanded` changes.
2. Click a navigation link.
   - Expected: navigation closes.

## Accessibility
1. Press Tab from top of page.
   - Expected: skip link appears.
2. Activate skip link.
   - Expected: focus moves to main content.
