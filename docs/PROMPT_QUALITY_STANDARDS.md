# Prompt Quality Standards

## Purpose

This document defines what makes a generated prompt good.

Prompt Architect Studio should not merely make prompts longer. It should make them clearer, more structured, and easier to use.

## Universal Quality Criteria

Every generated prompt should:

- Preserve the user’s original intent.
- Look past greetings, filler, and setup language to find the real objective.
- Clarify the task.
- Add necessary structure.
- Identify missing context without inventing facts.
- Include useful constraints.
- Specify the desired output format.
- Preserve expressive wording when it carries voice, taste, audience, or creative direction.
- Be ready to paste into the selected target model.
- Avoid unnecessary verbosity.

## What A Good Prompt Includes

Depending on framework, the output should include:

- Role.
- Task.
- Context.
- Objective.
- Audience.
- Constraints.
- Style or tone.
- Steps.
- Output format.
- Completion criteria.
- Assumptions or placeholders.

## What A Good Prompt Avoids

Generated prompts should avoid:

- Fabricated facts.
- Overly broad instructions.
- Vague success criteria.
- Excessive prompt engineering jargon.
- Hidden assumptions.
- Safe-washing creative language into generic professional tone.
- Treating social filler as the user's primary intent.
- Unnecessary chain-of-thought requests.
- Instructions that contradict the user’s goal.

## Human Nuance Standards

The rough prompt is allowed to be messy. That messiness can contain useful product signal.

Good generated prompts:

- Ignore greetings such as "Hey there" when identifying the primary intent.
- Identify the actual verb-noun objective, such as "write a newsletter," "draft a follow-up email," or "turn this into a campaign brief."
- Preserve source phrases that carry vibe, such as "zippy," "neighborly," "uncle's garage," "not corporate," or "Gen Z but no slang."
- Translate vibe into usable instructions without flattening it into "clear, practical, and specific."
- Use low-risk assumptions only when they help execution.
- Keep deliberately vague context broad instead of inventing an industry, customer type, or business model.

Poor generated prompts:

- Mark "Hey there" as the primary intent.
- Replace "zippy but neighborly" with only "professional and clear."
- Convert "Gen Z but no slang" into a sterile tone block that loses the middle ground.
- Force industry-standard defaults when the user intentionally left the domain open.

## Framework Standards

### Dynamic

Good Dynamic prompts:

- Adapt structure to the user’s task.
- Include the most relevant sections.
- Avoid forcing every request into the same template.
- Work well when the user is unsure which framework fits.

### CO-STAR

Good CO-STAR prompts clearly define:

- Context.
- Objective.
- Style.
- Tone.
- Audience.
- Response.

Best for:

- Marketing.
- Communications.
- Content strategy.
- Audience-aware writing.

### RTF

Good RTF prompts clearly define:

- Role.
- Task.
- Format.

Best for:

- Direct execution.
- Quick work outputs.
- Simple structured asks.

### RASC

Good RASC prompts clearly define:

- Role.
- Action.
- Steps.
- Constraints.

Best for:

- Process-heavy work.
- SOPs.
- Research workflows.
- Planning.

### Agentic-Goal

Good Agentic-Goal prompts clearly define:

- Mission.
- Context.
- Autonomy.
- Plan.
- Checkpoints.
- Completion criteria.

Best for:

- Multi-step work.
- Autonomous research or planning.
- Agent-like tasks.

## Model-Specific Standards

### GPT-5.5

Prompt should emphasize:

- Precise hierarchy.
- Clear deliverables.
- Strong constraints.
- Production-ready output.

### Claude

Prompt should emphasize:

- Natural language clarity.
- Nuance.
- Careful handling of assumptions.
- Visible constraints.

### Gemini

Prompt should emphasize:

- Direct section labels.
- Scannable structure.
- Grounding in supplied context.
- Clear output organization.

## Acceptance Test

A generated prompt is successful if the user can answer “yes” to these questions:

1. Does this preserve what I meant?
2. Is the task clearer than my rough prompt?
3. Are the constraints and output format obvious?
4. Does it avoid inventing missing facts?
5. Can I paste this into my target model right now?
6. Does it keep the human vibe when the vibe matters?

## Future Quality Features

- Prompt quality score.
- Missing context detection.
- Framework recommendation.
- Output comparison across frameworks.
- “Tighten this prompt” option.
- “Make this more agentic” option.
