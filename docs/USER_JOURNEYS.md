# User Journeys

## Purpose

This document maps how users should move through Prompt Architect Studio.

The MVP should optimize for one core journey: rough idea to copy-ready prompt.

## Journey 1: First-Time Visitor

### User Intent

The user wants to understand what the app does and whether it is worth trying.

### Flow

1. Arrives on the page.
2. Reads the hero headline and short explanation.
3. Sees the studio workspace.
4. Pastes or types a rough prompt.
5. Selects a framework or keeps the default Dynamic option.
6. Selects a target model.
7. Submits.
8. Reviews the generated prompt.
9. Copies it.

### Success Criteria

- The user understands the app within 5 seconds.
- The user can use the tool without reading a tutorial.
- The output feels immediately useful.

### Design Requirements

- Hero must be short.
- The studio must be visible early.
- Example prompt should be easy to load.
- Copy action must be obvious.

## Journey 2: Unsure User Learns by Trying

### User Intent

The user does not know which framework to choose.

### Flow

1. User types a rough prompt.
2. User sees Dynamic selected by default.
3. User reads a one-line explanation of the selected framework.
4. User submits with Dynamic.
5. User sees the prompt structure in the output.
6. User optionally tries another framework.

### Success Criteria

- The user does not get blocked by framework choice.
- Dynamic feels like a safe default.
- Framework descriptions are helpful but not academic.

### Design Requirements

- Default to Dynamic.
- Keep framework explanations short.
- Consider adding “Best for…” helper text later.

## Journey 3: Power User Compares Frameworks

### User Intent

The user wants to see which framework creates the best prompt for their task.

### Flow

1. User enters a rough prompt.
2. User generates a prompt with one framework.
3. User switches framework.
4. User regenerates.
5. User compares outputs.
6. User copies the best version.

### Success Criteria

- Regeneration feels fast.
- The app makes differences between frameworks clear.
- The user can experiment without losing their rough prompt.

### Future Feature Ideas

- Side-by-side comparison.
- Save generated versions.
- “Why this framework?” explanation.

## Journey 4: Returning User

### User Intent

The user already understands the product and wants speed.

### Flow

1. User opens the app.
2. User goes straight to the textarea.
3. User chooses framework and model.
4. User generates and copies.

### Success Criteria

- No modal or onboarding blocks the user.
- The app feels fast and familiar.
- The primary form remains the center of the product.

## Journey 5: User Needs Prompting Context

### User Intent

The user wants to understand why structured prompts produce better results.

### Flow

1. User scrolls below the studio.
2. User reads a short section on prompt architecture.
3. User learns the difference between rough prompts, frameworks, and model calibration.
4. User returns to the studio with more confidence.

### Success Criteria

- Educational content supports the product without overwhelming the page.
- The user learns enough to trust the workflow.

## Journey 6: User Is Concerned About Privacy

### User Intent

The user wants to know whether it is safe to paste sensitive context.

### Flow

1. User notices privacy microcopy near the input or footer.
2. User reads what the app does and does not store.
3. User avoids pasting secrets if needed.

### Success Criteria

- The app sets clear expectations.
- Trust increases without legal-heavy language.

### Future Requirement

Create a `TRUST_AND_PRIVACY.md` doc before launch.

## MVP Journey Priority

Build in this order:

1. First-time visitor.
2. Returning user.
3. Unsure user learns by trying.
4. User needs prompting context.
5. Power user compares frameworks.
6. Privacy-conscious user.
