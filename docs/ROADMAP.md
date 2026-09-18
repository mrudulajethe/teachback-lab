# From supervised MVP to a child-facing product

## Implemented

- Standalone discovery game with original robot/island artwork and six missions.
- Guided discover → explain → feedback → revise → transfer → reward loop.
- Responsive UI, accessible component primitives, optional read-aloud, reduced-motion support.
- Validated backend, anonymous HttpOnly sessions, D1 persistence, reset flow.
- Mission-grounded structured AI adapter, explicit practice fallback, server-only credentials.
- Domain tests, local integration smoke tests, GitHub CI, setup and demo documentation.

## Before the live-AI demo

- Configure a server-side API key and enable AI deliberately.
- Evaluate explanations including misconceptions, partially correct ideas, unrelated text, adversarial instructions, spelling variation, and provider failures.
- Have an educator review the six lessons, reading levels, and transfer items.
- Verify hosted D1 migrations, live feedback, refresh persistence, and reset behavior.
- Resolve the LGPL-declared libvips package in the tooling dependency graph before hackathon submission.
- Review dependency disclosures and hackathon submission terms; record a short honest demo.

## Before testing with real children

- Obtain appropriate guardian/school authorization and professional privacy review for the intended jurisdictions and deployment model.
- Design adult-managed consent, retention, deletion, access, and support processes.
- Add automatic cleanup of abandoned notebooks/attempts and document provider retention.
- Add edge rate limits, spending caps, bot/abuse protections, and monitoring with redacted logs.
- Test child-appropriate content filtering and AI feedback for harmful, biased, and confidently incorrect outputs.
- Conduct accessibility and usability testing with appropriate consent; validate with educators.
- Replace heuristic effort signals with evaluated pedagogical measures before making mastery claims.

## Later product work

- Adult-managed profiles and cross-device progress.
- Teacher-reviewed grade bands, more lessons, and lesson versioning.
- Spaced revisit missions based on observed misconceptions.
- Optional dictation with explicit consent and clear audio handling.
- Teacher dashboards only after identity, permissions, privacy, and interpretation are designed.

None of these later items are represented as completed features.
