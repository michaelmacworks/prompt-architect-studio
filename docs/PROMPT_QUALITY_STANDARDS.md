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
- Avoid clipping the primary intent to the first emergency, complaint, or setup sentence when the full request contains a broader execution goal.
- Capture every requested deliverable when the prompt contains multiple tasks, such as "write a post, give a few tips, and add a joke."
- Add deliverables found inside preserved task clauses to the "Deliverables / Tasks" list so the target model treats them as required.
- Preserve explicit variable data such as named locations, dates, time windows, colors, quantities, objects, examples, and proper nouns.
- Treat explicit platform nouns as authoritative. If the user asks for a "Facebook post," the output should not mark the platform as unspecified.
- Preserve source phrases that carry vibe, such as "zippy," "neighborly," "uncle's garage," "not corporate," or "Gen Z but no slang."
- Preserve highly specific style phrases, such as "Brooklyn Sister" or "1970s disaster," rather than flattening them into generic labels.
- Translate vibe into usable instructions without flattening it into "clear, practical, and specific."
- Use low-risk assumptions only when they help execution.
- Keep deliberately vague context broad instead of inventing an industry, customer type, or business model.

Poor generated prompts:

- Mark "Hey there" as the primary intent.
- Mark the first emergency or complaint as the whole primary intent while ignoring the requested outputs that follow.
- Strip out concrete execution variables such as "Hidden Valley," "Sunday 2-4," or "lime green counters."
- Capture only the first requested task when the user asked for several deliverables.
- Preserve a clause mentioning a checklist, FAQ, template, bullet points, tips, joke, or recommendations without adding that output to the deliverables list.
- Mark the platform as unspecified when the source text explicitly names Facebook, Instagram, LinkedIn, email, or another channel.
- Replace "zippy but neighborly" with only "professional and clear."
- Convert "Gen Z but no slang" into a sterile tone block that loses the middle ground.
- Convert "Brooklyn Sister" or "1970s disaster" into only "warm" or "human."
- Force industry-standard defaults when the user intentionally left the domain open.

## Parser Reconstruction Standards

Generated prompts should be built from a structured reconstruction of the user's request, not from a compressed summary.

The parser should preserve these modules separately:

- Domain and user context.
- Multi-intent and task array.
- Required deliverables.
- Negative constraints, prohibited topics, and prohibited tasks.
- Conditional triggers and alert rules.
- Entities and variables.
- Style instructions mapped to the relevant task.
- Meta-context and correction handling.

Good generated prompts:

- Separate "do not," "private," "secret," and similar constraints into high-priority guardrails.
- Distinguish prohibited topics from prohibited tasks.
- Preserve the primary task when the user forbids only a topic inside that task.
- Preserve if/then rules, thresholds, alert conditions, and monitoring triggers as execution rules.
- Capture the full clause or sentence around extracted keywords so negatives and qualifiers are not clipped.
- Apply explicit retractions such as "actually, never mind" before extracting facts.
- Preserve anchor facts such as names, products, specs, prices, dates, and quantities even when the user changes the requested deliverable.
- Quietly delete content from "don't worry about X" or similar retractions instead of quoting the retraction back to the target model.
- Strip app-testing meta-talk before generating the final prompt.
- Keep style metaphors out of factual source details unless they are also a named entity.
- Apply academic-integrity boundaries only when student or graded-work context is detected.
- Prioritize explicit deliverable nouns such as email, post, article, script, caption, update, and text message over inferred generic categories.

Poor generated prompts:

- Treat a forbidden action as a normal task.
- Treat "do not mention the server crash" as "do not write the project update."
- Hide an if/then trigger in "Specific Source Details."
- Clip "do not cite sources" into only "cite sources."
- Include abandoned facts that appeared before "actually, never mind" or "scratch that."
- Throw away product names, specs, or prices just because the user changed from one deliverable format to another.
- Quote "don't worry about container math" as a constraint instead of removing the container math.
- Replace explicit deliverables such as "LinkedIn article" or "Instagram captions" with "best-fit work product."
- Include "I am testing your app" as task context.
- Trigger student guardrails for professional research, science, grant, or business contexts that merely use academic vocabulary.
- Apply one generic vibe to every task when the user gave different styles for different outputs.

## Runtime Critique Standards

Generated prompts should be checked against the structured parse object before being returned to the user.

The critique pass should produce an internal result with:

- Pass/fail status.
- Issue list.
- Failure category.
- Severity.
- Repair instructions when the parse object contains enough information to fix the issue.

Required critique categories:

- `missing_deliverable`: a requested output is absent from the final prompt.
- `constraint_clipped`: a negative, private, secret, or forbidden-action constraint was dropped, reversed, or softened.
- `prohibited_topic_dropped`: a topic the user said not to mention, reveal, disclose, cite, name, or use was lost.
- `prohibited_task_dropped`: an action the user said not to perform was lost.
- `missed_conditional_trigger`: an if/then rule, threshold, monitoring condition, or alert trigger is missing or buried.
- `academic_false_positive`: student guardrails were applied to professional, educator, scientific, grant, or business work without graded-work context.
- `style_flattened`: distinctive voice, metaphor, or vibe was reduced to generic tone language.
- `variable_dropped`: explicit names, places, dates, quantities, colors, tools, platforms, or technical specs were lost.
- `invented_fact`: the final prompt introduced unsupported specifics that were not supplied by the user or a documented safe default.

Good critique behavior:

- Compares the final prompt to the parse object, not only to the raw text.
- Marks high-priority guardrail failures as repair-required.
- Repairs only with known parse data or documented safe defaults.
- Keeps critique metadata internal unless a debug or evaluation mode is explicitly added.

Poor critique behavior:

- Rewards prompts merely for being longer.
- Treats any polished answer as correct even when it drops constraints.
- Adds new facts during repair.
- Shows internal issue lists to everyday users as part of the default MVP flow.
- Uses vague judgments such as "make this better" instead of named failure categories.

## Continuous Improvement Standards

Prompt Architect Studio should improve through a controlled evaluation loop.

The ongoing improvement process should use:

- Stress-test fixtures.
- Anonymized failure categories.
- User-approved examples.
- The standards in this document as the evaluation rubric.

The improvement process should propose updates to parser rules, prompt builders, fixtures, and docs. It should not silently mutate production behavior.

Every accepted improvement should add or update a fixture so the same failure does not return unnoticed.

## Academic Integrity Guardrails

When a rough prompt contains student or graded-work signals such as "my assignment," "my homework," "grade," "graded," "high school student," "my professor," "my teacher," "essay for class," "rubric," "quiz," "exam," "MLA," or "APA," the generated prompt should shift into learning-support mode.

Academic language alone should not activate student guardrails. Professional research, scientific work, grant writing, curriculum design, small business training, and educator-authored materials should remain usable unless the request is clearly asking the app to help a student complete graded work.

In learning-support mode, generated prompts should avoid helping users outsource graded work. They should not ask the target model to:

- Write, draft, outline, or structure essays, papers, discussion posts, lab reports, or other academic submissions.
- Generate thesis statements, topic sentences, body paragraphs, introductions, conclusions, abstracts, titles, or transitions for submission.
- Provide citations, source lists, bibliographies, works cited entries, quoted evidence, or fabricated references.
- Solve homework, exam, quiz, worksheet, or take-home problems directly.
- Impersonate a student voice or create text that can be pasted into a class assignment.

Allowed support includes explaining concepts, clarifying instructions, creating study questions, suggesting reading strategies, giving self-review checklists, giving feedback on a student-provided draft without rewriting it, and showing similar non-assigned examples.

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
