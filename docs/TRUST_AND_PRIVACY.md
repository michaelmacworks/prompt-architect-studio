# Trust and Privacy

## Purpose

This document defines the trust and privacy considerations for Prompt Architect Studio.

Prompt tools invite users to paste sensitive context. The product must be clear about how prompts are handled.

## Core Trust Principle

Users should know what happens to their prompt before they paste sensitive information.

## MVP Privacy Posture

For the MVP, the app should aim for:

- No login.
- No saved prompt history.
- No public sharing by default.
- No unnecessary data collection.
- Clear warning not to paste secrets.
- Accurate disclosure that prompts may be sent to OpenAI when model-backed generation is enabled.

## Required User-Facing Guidance

Include short privacy microcopy near the prompt input or footer.

Suggested copy:

> Do not paste passwords, API keys, private client data, or sensitive personal information.

If prompts are not stored:

> Prompts are processed to generate your output and are not saved in this MVP.

If API providers process the prompt:

> Your prompt may be sent to OpenAI or another configured AI/API provider to generate the result.

This language must match the actual implementation.

## Sensitive Data Examples

Users should avoid pasting:

- Passwords.
- API keys.
- Customer personal data.
- Medical information.
- Financial account details.
- Legal case details.
- HR records.
- Confidential client strategy.
- Private addresses or identifiers.

## Trust UI Requirements

The app should include:

- A short privacy note near the input.
- A footer trust link or note.
- Clear error messages.
- No misleading claims about data handling.

## Future Privacy Requirements

Before launch beyond a private MVP, define:

- Data retention policy.
- Logging policy.
- Analytics policy.
- AI provider data handling.
- Terms of use.
- Privacy policy.
- Contact/support channel.

## Analytics Considerations

If analytics are added, track product behavior without collecting prompt contents.

Safe events:

- Framework selected.
- Model selected.
- Example loaded.
- Prompt submitted.
- Output copied.
- Error occurred.

Avoid:

- Logging full prompt text.
- Logging generated output.
- Capturing pasted sensitive data.

## Quality Improvement Logging

The prompt engine may eventually use anonymized quality signals to improve parser rules and generated prompts.

For the MVP and near-term self-critique loop, store failure categories rather than raw prompt contents.

Allowed quality signals:

- `missing_deliverable`
- `constraint_clipped`
- `missed_conditional_trigger`
- `academic_false_positive`
- `style_flattened`
- `variable_dropped`
- `invented_fact`

Avoid:

- Storing raw prompts for self-improvement without explicit consent.
- Storing generated outputs for self-improvement without explicit consent.
- Sending private user prompts to an external improvement process without matching user-facing disclosure.
- Claiming that prompts are not saved if any quality log contains recoverable prompt text.

If a future improvement agent uses user examples, the app must distinguish between anonymized failure categories and user-approved example prompts.

## Trust Design Rule

Trust copy should be short, visible, and accurate.

Do not bury privacy expectations in a long policy as the only explanation.
