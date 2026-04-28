# Design Brief

## Purpose

This document defines the visual and UX direction for Prompt Architect Studio before further frontend work.

The design should come from the product strategy, competitor research, and app workflow. It should not be based on arbitrary trends.

## Product Feeling

Prompt Architect Studio should feel like:

- A focused AI workbench.
- A practical SaaS utility.
- Clear, fast, and slightly playful.
- More “structured creative tool” than “enterprise dashboard.”
- More “architect’s desk” than “template marketplace.”

It should not feel like:

- A generic AI landing page.
- A giant prompt library.
- A dark cyberpunk console.
- A decorative bento layout with meaningless tiles.
- A course about prompt engineering.

## Primary User Need

The user needs to understand three things quickly:

1. What the app does.
2. Why structured prompts matter.
3. Where to paste their rough prompt and get the result.

The core tool should appear early. Supporting context should help the user trust the workflow without delaying the first action.

## Page Structure

### 1. Slim Hero

Goal:

Explain the app in one glance.

Content:

- Product name.
- Strong headline.
- One-sentence value proposition.
- Primary call to action that anchors to the studio.

Possible headline direction:

> Turn messy ideas into model-ready prompts.

Possible subcopy:

> Choose a framework, choose a model, and get a structured prompt that is ready to run.

Design notes:

- Slim, not oversized.
- Should communicate purpose more than spectacle.
- Can use one meaningful visual device if it explains the workflow.

### 2. Studio Workspace

Goal:

Let the user perform the core task immediately.

Required elements:

- Rough prompt textarea.
- Framework selector.
- Target model selector.
- Submit button.
- Copyable output block.

Design notes:

- This is the most important screen.
- It should feel calm and usable.
- Controls should be obvious.
- The output should feel like a finished artifact.

### 3. Context Section

Goal:

Explain why model-aware prompt architecture matters.

Content themes:

- Rough prompts hide important decisions.
- Frameworks create repeatable structure.
- Different models respond better to different instruction styles.
- The output is meant to be copied into the user’s AI tool of choice.

Design notes:

- Use compact cards or tiles only if each card maps to a real product concept.
- Keep copy short.
- Avoid generic “AI magic” language.

## Bento Usage Rules

Bento can work if it is functional.

Allowed tile concepts:

- Rough input.
- Framework selection.
- Model calibration.
- Universal Architect rules.
- Copy-ready output.
- Before/after prompt shape.

Avoid:

- Random stock-style photo insets.
- Abstract shapes that do not explain the product.
- Tiles included only because the layout looks trendy.
- Real-estate-style image grids copied from unrelated references.

## Visual Direction

Recommended palette:

- Warm white or soft off-white background.
- Deep near-black for authority and contrast.
- Confident blue accent for model intelligence.
- Warm cream/yellow accent for CTAs or highlights.
- Muted gray-green for secondary text and quiet UI borders.

The palette can borrow the feeling of modern bento SaaS references, but the meaning must be product-specific.

## Typography Direction

- Bold, highly legible headline type.
- Clean sans-serif body type.
- No delicate serif or decorative type.
- Avoid huge hero typography if it pushes the app workflow too far down the page.

## Interaction Direction

- Fast and obvious.
- No login.
- No onboarding modal.
- No buried settings.
- Copy action should be visible and satisfying.
- Framework and model selection should feel deliberate, not like generic dropdowns.

## Mobile Requirements

- Hero must not dominate the screen.
- Studio form should stack cleanly.
- Output block should remain readable.
- Buttons and selector controls must be large enough to tap.
- Text should not overflow controls.

## Design Principles

1. **The tool comes first**  
   The user should be able to use the app quickly.

2. **Every visual element explains the product**  
   Decoration is allowed only when it reinforces the workflow or feeling.

3. **Show the architecture**  
   The interface should help users understand that prompt quality comes from structure.

4. **Stay lightweight**  
   No heavy dashboard, no giant navigation, no marketplace feel.

5. **Make the output feel valuable**  
   The result should look copy-ready, polished, and worth trusting.

## Next Design Task

Before changing code again, sketch the revised page structure in plain language:

1. Hero content.
2. Studio layout.
3. Context tiles.
4. Color and type choices.
5. Mobile stacking behavior.

Then implement only that approved design direction.
