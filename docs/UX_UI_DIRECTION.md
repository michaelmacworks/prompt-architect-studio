# UX/UI Direction

## Purpose

This document defines the recommended front-end direction for Prompt Architect Studio using the project docs and reference analysis.

The goal is to create a product experience that is clear, polished, useful, and credible for end users.

## UX Principle

The tool should be the center of the page.

Marketing context should explain and support the tool, not delay it.

## Current Final Direction

The approved frontend direction is the retro workbench treatment derived from `retro-thumbnail-v3.html`, combined with the current full app content and layout.

Final approved characteristics:

- Keep the current content hierarchy and page flow.
- Use the retro workbench visual theme.
- Use a medium charcoal gray grid page background.
- Use warm rounded panels for page sections.
- Use sticky-note styling for the rough prompt input area.
- Use dark red/coral for primary action and the Studio headline.
- Use Cooper-style bold headlines.
- Use medium blue for outcome-style titles and use-case titles.
- Use a dark blue selected state for prompt style selection.
- Use a full-width dark gray footer with reversed type.
- Footer attribution should read: Built by Michael J McAteer, with the name linked to `michaeljmcateer.com`.
- Footer email should appear underneath as `michael.mcateer@proton.me` in non-bold text.
- Footer page links should be non-bold and light yellow.

This should be treated as the current final visual baseline.

## Recommended Page Flow

### 1. Header

Purpose:

- Orient the user.
- Provide lightweight navigation.

Content:

- Prompt Architect Studio wordmark.
- Anchor links:
  - How it works
  - Frameworks
  - Use cases
- CTA:
  - Start

Design:

- Minimal.
- Sticky only if it does not feel heavy.
- No account/login links in MVP.

### 2. Hero

Purpose:

- Explain the promise in one glance.
- Motivate the user to try the tool.

Headline:

> Turn messy ideas into model-ready prompts.

Supporting copy:

> Choose a framework, choose a model, and get a structured prompt you can paste into GPT-5.5, Claude, or Gemini.

Primary CTA:

> Start Architecting

Secondary CTA:

> See How It Works

Design:

- Slim but confident.
- Strong typography.
- One meaningful visual device, such as a before/after prompt transformation card.
- Avoid decorative bento tiles that do not map to the workflow.

### 3. Studio Workspace

Purpose:

- Let the user complete the core workflow.

Layout:

- Left side: prompt input and controls.
- Right side: copyable output block.

Desktop:

- Two-column layout.
- Input and selectors grouped as one workspace.
- Output feels like a generated artifact.

Mobile:

- Stack input first, output second.
- Keep button and copy action easy to tap.

Required UI:

- Rough prompt textarea.
- Load example action.
- Framework selector.
- Target model selector.
- Submit button.
- Output code block.
- Copy button.
- Privacy microcopy.

### 4. How It Works

Purpose:

- Explain the product workflow without a tutorial.

Recommended steps:

1. Paste a rough idea.
2. Choose a prompt framework.
3. Select your target model.
4. Copy the structured prompt.

Design:

- Four compact steps.
- Use real product language.
- Avoid generic AI magic claims.

### 5. Frameworks Section

Purpose:

- Help users understand why frameworks exist and when to use each one.

Cards:

- Dynamic: Best when you are not sure which structure fits.
- CO-STAR: Best for audience-aware content and communication.
- RTF: Best for direct execution.
- RASC: Best for process-heavy work.
- Agentic-Goal: Best for autonomous or multi-step tasks.

Design:

- Scannable card grid.
- Each card should include “Best for” language.
- Avoid academic definitions as the primary copy.

### 6. Why It Matters

Purpose:

- Explain the pain the product solves.

Messaging:

- Rough prompts hide important decisions.
- Hidden assumptions create inconsistent outputs.
- Frameworks make the model’s job clearer.
- Model-aware prompts reduce rework.

Design:

- Could be a split section:
  - Left: concise narrative.
  - Right: before/after prompt anatomy.

### 7. Use Cases

Purpose:

- Help users see themselves in the product.

Use-case cards:

- Founders: launch emails, planning, positioning.
- Marketers: campaign briefs, landing pages, competitor research.
- Consultants: discovery, strategy plans, sales enablement.
- Operators: SOPs, meeting summaries, executive updates.

Design:

- Compact.
- Practical.
- Action-oriented.

### 8. Trust And Privacy

Purpose:

- Reassure users before they paste meaningful context.

Copy:

> Do not paste passwords, API keys, private client data, or sensitive personal information.

If implementation matches:

> Prompts are processed to generate your output and are not saved in this MVP.

Design:

- Short trust strip near or below the studio.
- Avoid legal-heavy language on the main page.

### 9. Footer

Purpose:

- Provide a real footer with project attribution, subpage links, and a basic disclaimer.

Content:

- Prompt Architect Studio logo/brand.
- Built by Michael J McAteer, linking the name to `michaeljmcateer.com`.
- Email: `michael.mcateer@proton.me`.
- Footer page links.
- Basic non-privacy/non-responsibility disclaimer.

Design:

- Full-width dark gray background.
- Squared edges.
- Reversed type.
- Footer links should be light yellow and non-bold.

## Visual Direction

The page should combine:

- SaaS polish.
- Workbench utility.
- Warm, confident personality.
- Purposeful visual structure.

Recommended visual elements:

- Before/after prompt cards.
- Framework cards.
- Model selection cues.
- Clean code/output panel.
- Subtle product diagrams.

Avoid:

- Random image insets.
- Generic AI robot imagery.
- Stock business photos.
- Decorative gradients that do not support hierarchy.

## Interaction Direction

Key interactions:

- Load example.
- Select framework.
- Select model.
- Generate.
- Copy.

Interaction quality bar:

- Clear hover states.
- Clear focus states.
- Loading state.
- Copy success state.
- Friendly error state.

## Mobile UX

Mobile must preserve:

- Clear hero.
- Immediate access to the studio.
- Large controls.
- Readable output.
- No horizontal overflow.

Recommended mobile order:

1. Header.
2. Hero.
3. Studio input.
4. Studio controls.
5. Output.
6. How it works.
7. Frameworks.
8. Use cases.
9. Trust.

## Initial Implementation Priority

Build in this order:

1. Header and hero.
2. Studio workspace.
3. How it works.
4. Framework cards.
5. Why it matters.
6. Use cases.
7. Trust strip.
8. Final CTA.

## Design Rule

Every section should answer one of these questions:

- What does this app do?
- Why does it matter?
- How do I use it?
- Which framework should I choose?
- Can I trust it?
- What do I do next?
