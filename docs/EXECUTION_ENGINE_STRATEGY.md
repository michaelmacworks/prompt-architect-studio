# Execution Engine Strategy

## Purpose

This document captures the product shift identified during testing: Prompt Architect Studio should feel less like a prompt-engineering consultant and more like a creative execution engine.

The app already has a working prompt transformation engine. The next product refinement is to make that engine easier for nontechnical users to operate and more likely to produce a useful one-click result.

## Core Shift

Move from:

> Prompt Architect as consultant.

To:

> Prompt Architect as execution engine.

The product should not merely analyze a rough prompt and ask the user for more information. It should make high-probability, domain-aware assumptions and produce a prompt that can drive a useful answer immediately.

The product should also avoid becoming a project-management parser that strips away human nuance. The user's messy language often contains taste, audience, emotional register, and creative direction. That messiness is a product input, not a problem to erase.

## Generation Principle

The default behavior should be:

> Paste a mess. Transform it. Copy a prompt that gets the work done.

Generated prompts should:

- Fill low-risk missing context with useful defaults.
- Avoid clarification questions unless the request is fundamentally unclear or impossible to execute.
- Preserve the user's original intent.
- Promote tone, style, voice, audience, humor, and vibe cues into visible constraints.
- Preserve expressive wording when it carries nuance, such as "zippy," "neighborly," "not corporate," or "Gen Z but no slang."
- Avoid safe-washing creative direction into generic professional language.
- Produce prompts that can generate complete answers in one run.

## Fact Sheet Distillation

### Problem

Passing the user's raw messy text directly into the generated prompt makes the target model spend extra effort re-parsing facts that the app can identify first.

### Direction

Before generating the final prompt, the app should distill the rough input into a compact fact sheet.

Example:

```text
Project Facts:
- Platform / Channels: Shopify, Instagram DMs.
- Industry / Domain: Artisanal candles.
- Pain Point: Support volume around orders and returns.
- Budget: Under $500.
```

The fact sheet must preserve explicit variables, not just task categories. Named locations, dates, time windows, colors, quantities, objects, examples, constraints, and proper nouns are execution data. For example, "Hidden Valley," "Sunday 2-4," and "lime green counters" should remain visible in the distilled facts.

The deliverable field should be plural. If the source request asks for a post, a few tips, and a joke, the fact sheet should list all three deliverables instead of selecting only the first one as the primary intent.

Primary intent should describe the holistic goal, not simply the first urgent problem or emergency mentioned. If the request contains multiple execution clauses, the intent should summarize the multi-part request and leave the emergency as context.

### Product Rule

The generated prompt should use the distilled fact sheet as the primary context block. The raw source text should not be the main thing handed to the target model when useful facts can be extracted first.

The distillation layer should act like an architect, not a summarizer:

- Keep all explicit user-supplied variables unless they are clearly irrelevant.
- Promote explicit platforms and channels before using defaults. A "Facebook post" means Platform / Channels includes Facebook.
- Treat secondary tasks as required deliverables, not optional extras.
- Keep "Deliverables / Tasks" synchronized with "Task Clauses to Preserve." If a preserved clause mentions a checklist, FAQ, template, bullet points, tips, joke, recommendations, or other output, that item should also appear in the deliverables list.
- Preserve precise style phrases such as "Brooklyn Sister" or "1970s disaster" instead of reducing them to generic warmth or professionalism.

## Executor Over Consultant

### Problem

The current output can behave like a consultant: it identifies missing context and asks for more information.

That is technically correct, but it adds friction.

### Direction

The target model instructions should encourage execution:

> If information is missing, use domain expertise to fill low-risk gaps with useful defaults. Preserve deliberate ambiguity and do not ask for clarification unless the prompt is fundamentally non-sensical.

### Product Rule

Users should not feel like the app gave them homework.

## Creative Partner Over Project Manager

### Problem

Testing showed that the engine can extract tasks correctly while still missing the human part of the request. For example, a rough prompt may start with "Hey there," ask for something "zippy but neighborly," or describe a vibe like "advice from your uncle's garage." A purely logical parser can turn those cues into sterile labels and produce something that feels technically correct but emotionally wrong.

### Direction

The engine should look past social filler to find the actual objective, then preserve the user's human language where it carries style, trust, audience, or taste.

The target model instructions should encourage creative partnership:

> Treat expressive wording, metaphors, and vibe cues as requirements. Do not safe-wash them into generic professional defaults.

### Product Rule

The generated prompt should keep the user's personality visible when it helps the final answer sound like it came from the person who asked.

Intent extraction should:

- Ignore greetings and filler such as "Hey there" or "Can you help me."
- Find the actual verb-noun objective, such as "write a newsletter" or "draft a follow-up email."
- Summarize the whole execution goal when the first sentence is only an emergency, complaint, or setup.
- Capture all requested deliverables in multi-part prompts.
- Preserve explicit variable data such as locations, time windows, colors, objects, quantities, examples, and platform names.
- Preserve vibe phrases in the fact sheet instead of reducing them to bland tone labels.
- Prioritize the user's exact style descriptors over generic tone defaults.
- Use assumptions sparingly when the user leaves the industry or audience vague on purpose.

## Outcome-Based UI Labels

Prompting acronyms are useful internally, but intimidating externally.

The UI should present prompt styles by outcome, not methodology.

| Internal Framework | User-Facing Label | Best For |
| --- | --- | --- |
| Dynamic | Auto Execute | Messy input where the app should choose the best structure. |
| RTF | Quick Task | Simple, direct outputs like captions, emails, summaries, and rewrites. |
| RASC / RESC | Precision | Brand voice, examples, strict rules, and constraint-heavy requests. |
| Agentic-Goal / Tarr | Deep Strategy | Business ideas, projects, plans, research, and multi-step execution. |
| CO-STAR | Audience Fit | Audience-aware marketing, communication, positioning, and content. |

## Advanced Control Strategy

The main workflow should stay clean.

Default:

- Prompt style: Auto Execute.
- Target model: GPT-5.5.
- Primary action: Transform Prompt.

Power-user controls should remain available, but they should not dominate the first-use experience.

Recommended UI:

- Keep prompt style under an advanced disclosure or compact dropdown.
- Show the selected outcome label.
- Avoid making users learn RTF, RASC, CO-STAR, or Tarr before they can use the app.

## Style And Tone Preservation

### Problem

Testing showed that personality cues can get buried in source text. For example, an “encouraging and funny” Gen Z or Millennial plant-parent vibe may be treated as background context instead of a primary output constraint.

### Direction

Generated prompts must explicitly extract and promote style cues.

Add this rule to Universal Prompt Architect logic:

> Explicitly promote Tone and Style descriptors to a primary Style/Tone constraint block. Never leave the vibe buried in the background context.

### Product Rule

If the user gives a vibe, the output prompt must make that vibe visible.

## Model-Targeted Formatting

The app should not only change prompt content by model. It should adapt formatting to model strengths.

### GPT-5.5

Use:

- Precise hierarchy.
- Clear deliverables.
- Internal step-by-step execution guidance.
- Final-answer-first output.

Avoid:

- Exposing unnecessary chain-of-thought.

### Claude

Use:

- XML-style tags such as `<context>`, `<style_tone>`, `<task>`, `<constraints>`, and `<output_format>`.
- Nuanced natural-language instructions.
- Visible constraints and assumptions.

### Gemini

Use:

- Direct section labels.
- Grounding in supplied context.
- Tables when the task involves planning, comparison, scheduling, research, or prioritization.

## One-Click Goal

The success target is:

> A user pastes a messy idea, clicks Transform, and receives a prompt they can paste into GPT-5.5, Claude, or Gemini that immediately produces the desired work product.

Example:

If the user asks for a messy 4-week newsletter idea, the transformed prompt should lead the target model to create the 4-week plan, not ask the user to define the audience, tone, cadence, and format first.

## Implementation Notes

Current implementation direction:

- UI uses outcome labels instead of framework acronyms.
- The default style is Auto Execute.
- Power-user styles are available in a compact advanced control.
- The API maps outcome labels and legacy aliases to internal frameworks.
- Prompt generation now emphasizes light assumptions, style extraction, vibe preservation, and one-run execution.
- Model formatting differs for GPT-5.5, Claude, and Gemini.

## Acceptance Criteria

The app is moving in the right direction if:

1. A new user can ignore framework theory and still get a useful result.
2. The generated prompt does not ask setup questions unless truly necessary.
3. Tone and style cues appear as visible constraints.
4. The output is formatted appropriately for the selected target model.
5. The user can paste the generated prompt into a target model and get a complete useful answer.
6. Greetings and setup language are not misclassified as the primary intent.
7. Creative vibe language survives the transformation instead of becoming generic corporate tone.
