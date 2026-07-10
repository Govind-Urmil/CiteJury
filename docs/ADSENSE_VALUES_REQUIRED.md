# AdSense Values Required for Activation

Provide all of the following:

1. Publisher client ID
   - Format: `ca-pub-1234567890123456`

2. ads.txt publisher ID
   - Format: `pub-1234567890123456`

3. Numeric ad slot IDs for:
   - `ad-home-after-generator`
   - `ad-home-before-faq`
   - `ad-guide-footer`

After these values are available:
- update `assets/data/ads-config.json`
- publish the matching `ads.txt` record
- enable only approved slots
- update CSP if required
- verify Privacy Policy wording
- run desktop/mobile live ad smoke tests
