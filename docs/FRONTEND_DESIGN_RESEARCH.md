# Frontend Design Research

## Purpose

This document captures frontend design research and recommendations for making Prompt Architect Studio feel friendly, easy, and approachable for people who are not AI-technical.

The goal is to move away from a technical prompt-engineering console and toward a playful, confidence-building execution tool.

## Design Goal

The app should feel like:

- A helpful creative workbench.
- A low-pressure assistant.
- A colorful tool that makes AI prompting feel doable.
- More like arranging building blocks than configuring a machine.

It should not feel like:

- A developer console.
- A prompt-engineering course.
- A dense enterprise dashboard.
- A model playground.
- A form that punishes users for not knowing the right words.

## Palette Direction

The supplied palette:

| Color | Hex | Role |
| --- | --- | --- |
| Vibrant Coral | `#ED6A5A` | Warm action, friendly alerts, playful highlights. |
| Lemon Chiffon | `#F4F1BB` | Primary CTA surface, warm empty states, onboarding highlights. |
| Ash Grey | `#9BC1BC` | Calm panels, secondary surfaces, progress objects. |
| Soft Linen | `#E6EBE0` | Page background, quiet sections, whitespace substitute. |
| Strong Cyan | `#36C9C6` | Success, model intelligence, active accents. |

### Accessibility Note

Most palette colors should use near-black text rather than white text.

Approximate contrast against near-black `#101816`:

- Coral: `5.85:1`
- Lemon: `15.59:1`
- Ash: `9.23:1`
- Linen: `14.88:1`
- Cyan: `8.87:1`

Approximate contrast against white is too low for normal text on most palette colors. Avoid white body text on these colors, especially coral, ash, cyan, lemon, and linen.

## Research Synthesis

### 1. Reduce Visible Complexity

Baymard research on form UX repeatedly points to visible field count as a major intimidation factor. Users become hesitant when too many fields or controls are visible at once. They recommend reducing visible inputs, hiding optional controls, using smart defaults, and keeping labels visible above fields.

Application to Prompt Architect Studio:

- Keep the main workflow to one large input, one model selector, one primary action.
- Hide prompt style behind a compact advanced disclosure.
- Keep labels visible above controls.
- Keep helper text short and specific.
- Let the empty output teach what happens next.

Source:

- Baymard, input field and form design guidance: https://baymard.com/learn/input-fields and https://baymard.com/learn/form-design

### 2. Use Progressive Disclosure

Progressive disclosure makes complex products easier for novices while preserving power-user access. It is especially useful when advanced controls are valuable but not needed for the first successful action.

Application:

- Default prompt style should remain `Auto Execute`.
- Advanced styles should be available but visually secondary.
- Do not introduce framework acronyms in the first-use path.

Source:

- Nielsen Norman Group progressive disclosure summary via research references: https://www.nngroup.com/articles/progressive-disclosure/

### 3. Empty States Are Onboarding

SaaS onboarding guidance increasingly treats blank states as the best first-use teaching surface. Instead of a modal tour, the empty result panel should explain what will appear and offer one clear action.

Application:

- Output empty state should show a friendly preview card, not a dark code block only.
- Include a small “Try an example” or “Paste anything rough” cue.
- Show a playful before-to-after transformation visual.

Sources:

- Atlassian empty state guidance: https://atlassian.design/foundations/content/designing-messages/empty-state
- SaaSUI 2026 onboarding trends: https://www.saasui.design/blog/saas-onboarding-flows-that-actually-convert-2026

### 4. Prioritize Product Value Before Education

Product-led onboarding works best when users reach value quickly. For this app, value is not learning what RTF means. Value is seeing a messy idea become a usable prompt.

Application:

- Keep the tool above supporting education.
- Make “Transform Prompt” the strongest visual action.
- Use sample prompts and generated examples to teach through doing.
- Avoid “What is prompt architecture?” copy above the workspace.

Sources:

- Product-led onboarding guidance: https://www.userflow.com/best-practices/product-led-onboarding
- Self-serve onboarding summary: https://productgrowth.in/insights/saas/self-serve-onboarding/

### 5. Use Motion As Feedback, Not Decoration

Motion should communicate status, completion, or spatial change. Apple and Material both emphasize that animation should be brief, purposeful, and not block the user.

Application:

- Use a small button press animation on `Transform Prompt`.
- Animate the output appearing as a card stack or sheet sliding into place.
- Add a brief success pulse when the prompt is generated.
- Respect `prefers-reduced-motion`.
- Avoid large looping background animations.

Sources:

- Apple Human Interface Guidelines, Feedback: https://developer.apple.com/design/human-interface-guidelines/feedback
- Apple Human Interface Guidelines, Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- Material Design duration and easing: https://m1.material.io/motion/duration-easing.html
- Carbon motion guidance: https://carbondesignsystem.com/elements/motion/overview/

### 6. Make It Beautiful, But Keep It Usable

The aesthetic-usability effect suggests users often perceive attractive interfaces as easier to use. For this product, the palette and illustration language can reduce anxiety. But visual polish cannot compensate for unclear controls.

Application:

- Use warm color and friendly objects to make the app feel approachable.
- Keep the actual workflow familiar and obvious.
- Do not hide the main input or CTA behind visual flourish.

Sources:

- Laws of UX, aesthetic-usability effect: https://lawsofux.com/aesthetic-usability-effect/

## Recommended Visual Theme

### Theme Name

**Prompt Playground Workbench**

This balances the product’s seriousness with approachability. It should feel productive, but not corporate.

### Retro Halftone Direction

The visual system can borrow a light retro or throwback feel through halftone texture, print-inspired dots, and playful poster-like accents.

This should feel warm and approachable, not nostalgic for its own sake.

Use halftone as:

- A subtle background texture behind the hero.
- A dotted transition pattern between input and output.
- Small accent fields inside object cards.
- A low-opacity texture inside coral or cyan surfaces.
- A visual metaphor for “messy signal becoming structured output.”

Avoid:

- Heavy comic-book styling.
- Visual noise behind text.
- Low-contrast dot patterns that hurt readability.
- Full-page retro theming that makes the app feel gimmicky.
- Animations that make the halftone pattern shimmer or distract.

Recommended feel:

- Soft Linen background.
- Coral and cyan halftone patches.
- Lemon Chiffon prompt cards.
- Near-black text.
- Ash Grey utility panels.
- Subtle print texture only at `4%` to `10%` opacity.

Implementation idea:

```css
.halftone-accent {
  background-image: radial-gradient(circle, rgba(16, 24, 22, 0.14) 1px, transparent 1px);
  background-size: 10px 10px;
}
```

Use this sparingly, especially behind nonessential visual accents rather than behind body copy.

### Visual Metaphors

Use objects that make prompt transformation feel tangible:

- Sticky notes for messy thoughts.
- Recipe cards for reusable prompt styles.
- Stamps for selected model calibration.
- Building blocks for fact-sheet fields.
- A conveyor path or gentle arrow trail from input to output.
- Paper sheets stacking into a finished prompt.
- Small spark or checkmark moments after transformation.

Avoid:

- Robots.
- Abstract AI brains.
- Matrix-style code.
- Dark terminal aesthetics.
- Generic dashboard cards with no product meaning.

## Layout Recommendations

### First Viewport

Use a split-but-integrated app layout:

- Left/top: warm hero copy and one approachable object-based visual.
- Center: rough prompt input.
- Right/below: output preview.

The hero should not feel like a landing page separate from the tool. It should frame the tool.

### Main Studio

Recommended component hierarchy:

1. Friendly headline: “Paste the messy version.”
2. Large textarea with approachable helper text.
3. Tiny example chips.
4. Target model selector.
5. Advanced `Prompt style` disclosure.
6. Large `Transform Prompt` CTA.
7. Output panel with friendly empty state.

### Supporting Sections

Keep supporting sections compact:

- How it works: three object cards.
- Prompt styles: outcome labels only.
- Trust note: simple privacy guidance.

## Object And Pattern Ideas

### Sticky Note Input

The input can look like a soft paper note on a linen desk surface. This makes messy input feel acceptable rather than wrong.

Design details:

- Linen page background.
- White or lemon note surface.
- Coral corner tab.
- Casual helper text: “Half-formed is fine.”

### Prompt Recipe Cards

Prompt styles can look like recipe cards:

- Auto Execute: all-purpose recipe.
- Quick Task: quick bite.
- Precision: exact measurements.
- Deep Strategy: slow-cook plan.
- Audience Fit: flavor match.

Do not overdo the metaphor in copy. Use it visually.

### Fact Sheet Blocks

The generated output can include small colored chips for extracted facts:

- Platform.
- Audience.
- Pain point.
- Budget.
- Tone.

This makes the engine feel transparent without exposing prompt-engineering jargon.

### Model Stamps

Model selection can feel like stamping the prompt for a destination:

- GPT-5.6 Sol: structured blueprint stamp.
- Claude: XML-tag stamp.
- Gemini: table/grid stamp.

## Animation Recommendations

### Safe Motion Tokens

Use:

- Microinteractions: `120ms-180ms`.
- Output entrance: `180ms-240ms`.
- Larger section transitions: `240ms-320ms`.
- Easing: `cubic-bezier(0.2, 0, 0.38, 0.9)` for productive motion.

Avoid:

- Animations over `400ms` for frequent actions.
- Infinite decorative motion.
- Motion that prevents interaction.

### Specific Animations

1. **CTA press**
   - Button depresses by `1-2px`.
   - Label changes to `Transforming...`.

2. **Fact extraction**
   - Tiny chips fade in one by one.
   - Total sequence under `500ms`.

3. **Output generated**
   - Output sheet slides up `8px` and fades in.
   - Copy button gives a small cyan pulse when enabled.

4. **Copy success**
   - Button changes to `Copied`.
   - Cyan checkmark appears for `1200-1600ms`.

5. **Advanced drawer**
   - Prompt style disclosure expands smoothly.
   - No bounce.

## Typography Direction

Use a friendly sans-serif with high legibility.

Recommended direction:

- Rounded or humanist sans for headings.
- Clean sans for body.
- Monospace only inside generated prompt output.

Avoid:

- Technical mono type across the whole UI.
- Overly geometric type that feels cold.
- Giant hero text that pushes the tool too far down.

## Copy Direction

The app should sound reassuring and practical.

Use:

- “Paste the messy version.”
- “Half-formed is fine.”
- “We’ll turn it into something ready to run.”
- “Transform Prompt.”
- “Copy and run this in your model.”

Avoid:

- “Framework.”
- “Prompt engineering.”
- “Configure.”
- “Target calibration” in primary UI.
- Long explanations before action.

## Recommended Redesign Direction

### Concept

Use the palette to create a colorful, paper-like workspace:

- Soft Linen page background.
- White and Lemon Chiffon input surfaces.
- Ash Grey cards for secondary controls.
- Strong Cyan for success and active model cues.
- Vibrant Coral for warmth, attention, and playful highlights.
- Near-black text throughout.

### Interaction Feel

The app should feel like:

1. Drop a messy note on the desk.
2. The app sorts it into little fact blocks.
3. The engine stamps it for the selected model.
4. A clean prompt sheet appears ready to copy.

## Implementation Priority

1. Re-theme CSS to the supplied palette with accessible text contrast.
2. Replace the dark technical output block with a friendlier prompt sheet while keeping monospace prompt text readable.
3. Add object motifs: sticky note input, model stamps, fact chips, paper output.
4. Add subtle motion for transform, output entrance, copy success, and advanced drawer.
5. Review mobile layout so the tool still feels simple and not visually crowded.
6. Browser-test desktop and mobile screenshots before considering the redesign done.

## Design Acceptance Criteria

The redesign succeeds if:

1. A nontechnical user understands what to do in under five seconds.
2. The first screen feels friendly, not technical.
3. The main action is obvious.
4. Advanced controls are available but not intimidating.
5. Generated output feels valuable and easy to copy.
6. Motion gives feedback without becoming distracting.
7. Text contrast remains accessible with the supplied palette.
