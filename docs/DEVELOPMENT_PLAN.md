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
