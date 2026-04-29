# Development Plan

## Purpose

This document defines the phased build plan for Prompt Architect Studio.

The goal is to move from documented strategy to a polished, deployable SaaS MVP without drifting into arbitrary design or premature feature expansion.

## Current Project Status

Current state:

- Vite React app exists.
- Cloudflare Pages-style API endpoint exists.
- Core prompt transformation workflow exists.
- Documentation foundation exists.
- Production build passes.
- Frontend UX/UI direction has been applied and approved as the current final version:
  - retro workbench visual theme.
  - sand grid background.
  - warm rounded content panels.
  - dark red/coral primary action treatment.
  - medium blue outcome/use-case titles.
  - dark gray full-width footer.
  - footer attribution and disclaimer.

Not finished:

- Final browser QA across desktop/tablet/mobile remains.
- Any full privacy/disclaimer page remains to be written before public launch.
- Mobile QA is not complete.
- Deployment setup needs cleanup.
- Real LLM integration is not yet implemented.

## Phase 1: Product Alignment

### Goal

Make sure the product, UX, and build direction are aligned before further implementation.

### Inputs

- `PRODUCT_STRATEGY.md`
- `UX_UI_DIRECTION.md`
- `DESIGN_BRIEF.md`
- `INFORMATION_ARCHITECTURE.md`
- `VISUAL_SYSTEM.md`
- `STATE_DESIGN.md`

### Tasks

- Review the current docs.
- Confirm the page structure:
  - Header.
  - Hero.
  - Studio workspace.
  - How it works.
  - Frameworks.
  - Why it matters.
  - Use cases.
  - Trust/privacy.
  - Final CTA.
- Confirm whether MVP remains no-login and free.
- Confirm whether the API should remain deterministic or connect to an LLM provider.

### Acceptance Criteria

- Product direction is clear.
- No major UI work begins until the intended page structure is approved.

## Phase 2: Frontend UX/UI Rebuild

### Goal

Rebuild the frontend so it feels like a polished SaaS MVP, not a simple prototype.

### Tasks

- Add minimal header navigation.
- Build slim hero section.
- Rebuild studio workspace around the core workflow.
- Add meaningful “How it works” section.
- Add framework cards with “Best for” explanations.
- Add “Why it matters” section.
- Add use-case cards for primary personas.
- Add trust/privacy strip.
- Add final CTA back to the studio.
- Remove any decorative bento elements that do not explain the product.

### Acceptance Criteria

- User understands the product within 5 seconds.
- Studio remains the center of the page.
- Every section has a clear purpose.
- Visual design follows `VISUAL_SYSTEM.md`.
- UI feels cohesive on desktop and mobile.
- Status: current frontend implementation meets the approved direction and should now be treated as the baseline/final visual version unless the user requests a specific revision.

## Phase 3: State Polish

### Goal

Make the product feel trustworthy in every interaction state.

### Tasks

- Improve empty state copy.
- Improve loading state.
- Improve success state after generation.
- Improve copy confirmation.
- Improve validation state.
- Improve API error state.
- Preserve user input across failed requests.
- Add privacy microcopy near input.

### Acceptance Criteria

- User always knows what happened and what to do next.
- Errors are calm and actionable.
- Copy behavior is clear.
- No state causes layout jumps or confusion.

## Phase 4: Prompt Engine Quality

### Goal

Improve the generated prompt output so it meets the product quality standards.

### Tasks

- Review current API output against `PROMPT_QUALITY_STANDARDS.md`.
- Improve framework-specific prompt builders.
- Add better model-specific calibration.
- Add missing-context placeholders.
- Add output format consistency.
- Add tests or fixtures for each framework/model combination.

### Next Sprint: Layered Parser Reconstruction

The next engine sprint should replace one-pass summarization with a layered parse object that reconstructs the user's request as modules.

1. Add a parse object in `functions/api/architect.js` with fields for domain, user context, guardrail mode, intents, tasks, deliverables, constraints, forbidden actions, conditional triggers, entities, variables, and style-by-task.
2. Add a pre-processing pass that strips app-testing meta-talk and applies correction markers such as "actually, never mind," "scratch that," and "instead" before fact extraction.
3. Implement Layer 1: classify user type and domain before extraction. Narrow academic-integrity guardrails to student or graded-work contexts, while allowing professional research, science, grants, educator-authored materials, and small business training.
4. Implement Layer 2: extract high-priority constraints and triggers. Move "do not," "don't," "never," "private," "secret," and if/then or threshold rules into dedicated guardrail and trigger blocks.
5. Split negative constraints into prohibited topics and prohibited tasks so content bans do not cancel the primary task.
6. Implement Layer 3: map variables with sentence buffering. Preserve full clauses around names, places, dates, times, quantities, colors, object descriptions, technical specs, tool names, and platforms so qualifiers and negatives are not clipped.
7. Implement Layer 4: synthesize persona and style separately from facts. Keep metaphors and vibe cues as style instructions and map them to the relevant task when multiple deliverables exist.
8. Update prompt builders to render from the parse object instead of calling independent inference helpers directly.
9. Add stress-test fixtures for academic false positives, professional research, small business training, if/then monitoring tasks, private/secret constraints, multi-deliverable prompts, task-specific style, retractions, meta-talk, and negative topic/task separation.

### Layered Parser Acceptance Criteria

- Student guardrails activate for clear student or graded-work contexts, not for professional academic vocabulary alone.
- Multi-intent requests produce a task array, not a single clipped primary intent.
- Forbidden actions and private/secret constraints appear in a high-priority guardrails block.
- Prohibited topics and prohibited tasks are separated.
- Retractions and app-testing meta-talk do not leak into the final fact sheet.
- Task-level corrections preserve reusable anchor facts such as product names, specs, prices, dates, and quantities.
- Quiet retractions such as "don't worry about X" delete content instead of becoming quoted constraints.
- Conditional triggers appear in a dedicated rules block.
- Names, places, times, dates, quantities, and technical specs are preserved with surrounding qualifiers.
- Style cues are applied to the correct task and are not mixed into factual source details.
- The final model-specific prompt is rendered from structured modules rather than a compressed summary.

### Following Sprint: Runtime Critique And Repair Loop

After the layered parser exists, add a quality loop that evaluates generated prompts before returning them to the user.

The first version can be deterministic and should not depend on live LLM calls. Its purpose is to catch known failure modes that are already defined in `PROMPT_QUALITY_STANDARDS.md`.

1. Add a critique object in `functions/api/architect.js` with fields for `passed`, `issues`, `severity`, `failureTypes`, and `repairInstructions`.
2. Run critique after prompt rendering and before returning the response.
3. Check for missing deliverables, clipped negative constraints, buried conditional triggers, academic false positives, style flattening, invented facts, and missing explicit variables.
4. Add a repair step for high-priority deterministic issues when the parse object contains the missing or corrected information.
5. Return or expose critique metadata only in a safe internal/debug form, not as distracting user-facing copy in the MVP UI.
6. Add fixtures that intentionally fail the first render and verify that the repair step produces a corrected final prompt.

### Runtime Critique Acceptance Criteria

- Generated prompts are checked against the structured parse object before being returned.
- High-priority constraints and triggers cannot disappear silently.
- Repair uses known parse data; it does not invent new facts.
- Critique output identifies failure categories consistently enough to support future trend analysis.
- The user still receives one clean copy-ready prompt, not a visible debugging report.

### Future Sprint: Continuous Improvement Agent

The long-term product direction is an ongoing prompt quality system, not a static prompt formatter.

Add an offline improvement agent after runtime critique is stable. This agent should review fixture failures, anonymized failure categories, user-approved examples, and the quality standards docs, then propose updates to parser rules, prompt builders, fixtures, and documentation.

Initial rules:

- The improvement agent proposes changes for review before they affect production behavior.
- It should use rubrics from `PROMPT_QUALITY_STANDARDS.md`, not a vague "make this better" instruction.
- It should store failure categories rather than raw prompt contents unless explicit user consent and matching privacy language are added.
- It should create or update tests for every accepted behavior change.

### Optional LLM Integration

Decision needed:

- Keep deterministic templates for MVP.
- Or connect to a real LLM API for transformation.

If using an LLM:

- Add environment variable handling.
- Add API error handling.
- Add privacy disclosure.
- Avoid logging prompt contents.

### Acceptance Criteria

- Generated prompts preserve user intent.
- Output is copy-ready.
- Framework differences are meaningful.
- Model differences are visible but not overcomplicated.

## Phase 5: Responsive QA and Accessibility

### Goal

Make sure the app works well across devices and is accessible.

### Tasks

- Test desktop layout.
- Test tablet layout.
- Test mobile layout.
- Check keyboard navigation.
- Check focus states.
- Check form labels.
- Check color contrast.
- Check tap target sizes.
- Check output block readability.
- Check no text overflow.

### Acceptance Criteria

- No broken mobile layouts.
- Form can be used by keyboard.
- Main controls are labeled.
- Text and controls remain readable.

## Phase 6: Launch Readiness

### Goal

Prepare the app for Cloudflare Pages deployment and public preview.

### Tasks

- Move `_headers` into `public/_headers` if needed.
- Confirm build command:
  - `npm run build`
- Confirm output directory:
  - `dist`
- Add metadata:
  - title.
  - description.
  - Open Graph tags.
  - favicon.
- Create `DEPLOYMENT.md`.
- Verify Cloudflare Pages Functions route:
  - `/api/architect`
- Verify production build.
- Verify no sensitive debug output.

### Acceptance Criteria

- App builds cleanly.
- App deploys to Cloudflare Pages.
- API endpoint works in deployed environment.
- Metadata and basic trust copy are present.

## Phase 7: Post-MVP Improvements

These are not required for first launch.

Potential improvements:

- Saved prompt history.
- Side-by-side framework comparison.
- Framework recommendation.
- Prompt quality score.
- Export as Markdown.
- Team prompt library.
- Intro video.
- Analytics events.
- Waitlist or email capture.
- Pricing page.

## Build Order Recommendation

1. Frontend UX/UI rebuild.
2. State polish.
3. Prompt engine improvements.
4. Responsive/accessibility QA.
5. Deployment cleanup.
6. Public preview.

## Current Next Step

Start Phase 2 only after confirming the intended frontend structure from `UX_UI_DIRECTION.md`.

The next implementation should not be another small visual patch. It should be a deliberate rebuild of the frontend experience based on the docs.
