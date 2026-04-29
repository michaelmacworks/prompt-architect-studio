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

## Layered Parsing Framework

The prompt engine should move from summarization to modular reconstruction. Its job is not to shorten the user's messy request. Its job is to categorize every actionable item, variable, constraint, trigger, and style instruction so the final prompt respects what the user actually said.

The parser should run in layers before rendering the final model-specific prompt.

### Layer 1: Intent Classification And Domain Weighting

Before extracting details, classify what kind of request this is.

- Use a multi-intent array instead of a single primary intent.
- Rank high-level action verbs such as "build," "monitor," "write," "draft," "compare," and "analyze" above conversational filler such as "checking," "tell me if," or "quick question."
- Detect user context before applying academic-integrity guardrails. Student or graded-work markers such as "my assignment," "grade," "homework," "class," "high school student," or "my professor" should activate guardrails. Professional research, grant writing, lab operations, small business training, or educator-authored materials should not be safe-washed by student guardrails.
- Preserve emergency or setup language as context, but do not let it replace the holistic execution goal.

### Layer 2: Constraint And Trigger Extraction

Security and rules-of-engagement must be extracted separately from task wording.

- Move negative constraints beginning with "do not," "don't," "never," "avoid," "secret," "private," or equivalent language into a high-priority guardrails block.
- Extract conditional triggers such as "if/then," "when," "unless," thresholds, alerts, and monitoring rules into a dedicated trigger/rules block.
- Do not bury private data warnings, forbidden actions, or alert conditions inside generic source details.

### Layer 3: Entity And Variable Mapping

After intent and guardrails are known, map the concrete variables.

- Pull out names, places, organizations, dates, times, quantities, colors, object descriptions, technical specs, model names, platforms, URLs, and tool names.
- Use an anti-clipping sentence buffer: when a keyword is captured, preserve the surrounding sentence or clause so leading negatives such as "not," "don't," and "never" are not lost.
- Treat explicit variables as high-priority execution data, not flavor text.

### Layer 4: Persona And Style Synthesis

Only after logic and variables are mapped should the parser interpret vibe.

- Keep metaphors and voice cues as style instructions instead of mixing them into factual source details.
- Map style to the relevant task when a prompt contains several deliverables. For example, a grant request may need a prestigious tone while lab sensor alerts may need a jovial assistant voice.
- Preserve distinctive descriptors without reducing them to generic labels such as "warm," "human," or "professional."

### Recommended Pipeline

1. Scan: detect user type, domain, and guardrail mode.
2. Filter: extract forbidden actions, private information warnings, and conditional triggers.
3. Map: extract proper nouns, dates, times, quantities, technical specs, and other variables.
4. Structure: group tasks into a task array with primary and secondary deliverables.
5. Style: apply voice, metaphor, and tone signals to the correct tasks.

### Pre-Processing And Denoising

Before layered parsing, the engine should strip conversational test harness language and apply explicit corrections.

- Remove meta-talk about testing the app, prompt results, generated output, or the prompt tool itself when there is a separate actionable prompt.
- Treat correction markers such as "actually, never mind," "scratch that," "ignore that," and "instead" as recency gates. The text after the latest correction marker should override earlier abandoned facts.
- Preserve anchor facts such as named products, organizations, specs, prices, quantities, dates, and technical terms from the prompt history unless the user explicitly says the data itself is wrong.
- When a user cancels a task, update the task without throwing away reusable facts attached to the old task.
- Treat quiet retractions such as "don't worry about X" as deletion instructions. Do not quote them back as constraints; simply omit the retracted content.
- Keep intentional negative instructions such as "ignore Kazakhstan" as constraints when they belong to the actual prompt, not as app-testing metadata.
- Do not allow retracted or meta-context facts to leak into the fact sheet.

### Negative Scope Separation

Negative constraints should not all be rendered as generic forbidden actions.

Split them into:

- Prohibited topics: things the target model must not mention, reveal, cite, name, disclose, or use.
- Prohibited tasks: actions the target model must not perform, such as drafting a legal contract, solving homework, sending a message, offering a refund, or publishing something.

This prevents "do not mention the server crash" from being misread as "do not create the project update." The app must preserve the primary task while constraining the content inside that task.

The target balance is roughly 80% information retention and 20% noise reduction. A slightly messy fact sheet with the important facts is preferable to a perfectly pruned structure that loses the subject.

## Runtime Critique And Repair

Layered parsing creates the source of truth. The next quality step is to critique the generated prompt against that source of truth before the user sees it.

The app should eventually behave like a small prompt quality system:

```text
rough user prompt
-> layered parse object
-> model-specific prompt renderer
-> critique pass
-> repair pass if needed
-> final copy-ready prompt
```

The critique pass should be rubric-based, not vibes-based. It should inspect whether the rendered prompt preserved the modules extracted from the parse object.

The first version should check:

- Missing required deliverables.
- Negative constraints that were dropped or reversed.
- Private, secret, or forbidden-action warnings that were treated as ordinary tasks.
- Conditional triggers, alert rules, thresholds, or monitoring instructions that were buried in generic context.
- Academic-integrity guardrails triggered by professional academic language rather than student or graded-work context.
- Explicit variables that disappeared from the final prompt.
- Distinctive style cues flattened into generic professionalism.
- Facts that appeared in the final prompt but were not supplied by the user or a safe default rule.

When critique finds a high-priority issue, the repair step should revise the final prompt using the parse object. Repair should not invent new facts, add new obligations, or ask the user for clarification unless the request is fundamentally impossible to execute.

The user-facing experience should remain simple: one copy-ready prompt. Critique metadata is an internal quality layer unless a later product decision adds an advanced debug view.

## Continuous Improvement Loop

The long-term engine should improve through a controlled feedback loop.

The product should track failure categories, not raw user prompts, unless explicit consent and privacy language are added. Useful categories include:

- `missing_deliverable`
- `constraint_clipped`
- `missed_conditional_trigger`
- `academic_false_positive`
- `style_flattened`
- `variable_dropped`
- `invented_fact`

An offline improvement agent can periodically review fixture failures, anonymized failure categories, and user-approved examples. Its job is to propose changes to parser rules, prompt builders, fixtures, and docs.

The improvement agent should not silently rewrite production behavior. It should propose changes, attach the relevant failure pattern, and require tests or fixtures for accepted updates.

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
