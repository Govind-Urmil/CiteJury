# TI-1 Trust Initiative Validation Engine

Goal: raise CiteJury trust by making Generator, Checker and Citation Doctor share stricter validation principles.

## TI-1 fixes
- Future years are no longer treated as plausible.
- Generator validation rejects zero/extreme numeric values.
- Generator validation rejects reserved AIR court tokens.
- AIR court parsing supports allowlisted ampersand courts such as P&H and J&K.
- Provision normalization strips longer prefixes before short prefixes.
- OSCOLA journal volume is included consistently.
- Doctor original whitespace display is preserved.

## Trust rule
A safe rejection is better than a confident incorrect citation.
