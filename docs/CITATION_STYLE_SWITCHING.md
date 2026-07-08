# Citation Style Switching

EP-043 adds post-generation style comparison. After users generate a citation, CiteJury shows available style outputs for the selected source type. Users can choose another supported style without re-entering the source details.

The feature is intentionally scoped:

- It does not claim support for styles that are only authority-registered for future work.
- It shows stricter styles as unavailable when required fields are missing.
- It keeps validation, explainability, authority-family labels, and manual-verification warnings tied to the selected style.
- It runs fully in the browser and does not call any backend or external service.

Supported switch groups:

- Supreme Court neutral citation: locked to Indian neutral citation output.
- Judgment: Indian Legal, SCC-style, AIR-style, OSCOLA where fields permit.
- Legislation, book, journal: Indian Legal and scoped OSCOLA where fields permit.
- Constitution and website: Indian Legal only until stronger alternate style rules are added.
