# State Design

## Purpose

This document defines the product states that need to feel polished before launch.

Good SaaS design depends on what the user sees before, during, and after the main action.

## Empty State

### Input Empty

The rough prompt textarea should invite action.

Placeholder:

> Paste the messy prompt, idea, or half-formed task you want to upgrade...

Supporting action:

- Load example.

### Output Empty

The output area should explain what will happen.

Suggested copy:

> Your structured prompt will appear here, ready to copy into your target model.

## Ready State

When the user has entered enough text:

- Submit button becomes enabled.
- Framework and model choices remain visible.
- Helper text explains the selected framework.

## Loading State

When the user submits:

- Button label changes to “Architecting...”
- Submit button is disabled.
- Previous errors clear.
- Optional future improvement: subtle progress text.

Avoid:

- Full-screen loading.
- Spinners that dominate the interface.
- Clearing the user’s input.

## Success State

When generation succeeds:

- Output block fills with structured prompt.
- Copy button becomes enabled.
- Framework and model remain selected.
- User can edit input and regenerate.

Copy interaction:

- Button changes from “Copy” to “Copied” briefly.
- No modal required.

## Error State

Errors should be plain and fixable.

Possible errors:

- Prompt too short.
- Unsupported framework.
- Unsupported model.
- API unavailable.
- Invalid JSON request.

Tone:

- Calm.
- Specific.
- No blame.

Example:

> Enter a rough prompt with at least 8 characters.

## Validation State

The app should prevent obvious invalid submissions:

- Disable submit until input is long enough.
- Validate framework and model on the API side.
- Keep client validation friendly.

## Mobile States

On mobile:

- Loading state should not move controls unexpectedly.
- Output should remain readable and scrollable.
- Copy button should be easy to tap.

## Future States

Potential future states:

- Saved prompt confirmation.
- Compare versions.
- Prompt quality score.
- Framework recommendation.
- Rate this output.
- API key missing or model provider unavailable.

## State Design Rule

Every state should tell the user:

1. What happened.
2. What they can do next.
3. Whether their input is safe and preserved.
