# AI Prompting Orientation

## Purpose

This document defines the simple, nontechnical explanation of prompt architecture that the app can use in product copy, help text, and onboarding.

The goal is to help users understand why Prompt Architect Studio matters without turning the app into a prompt engineering course.

## Core Idea

AI models do not just need instructions. They need structured intent.

A rough prompt often contains the seed of a good request, but it usually leaves important decisions unstated:

- What role should the model play?
- What task should it complete?
- What context matters?
- What constraints should it follow?
- What format should the answer use?
- What assumptions should it avoid?
- What does a successful answer look like?

Prompt Architect Studio helps make those decisions explicit.

## Plain-Language Explanation

A prompt is not just a question. It is a brief.

The better the brief, the more likely the model is to produce something useful on the first try.

Prompt Architect Studio turns a rough idea into a better brief by organizing it around:

- Intent.
- Context.
- Role.
- Task.
- Constraints.
- Output format.
- Model behavior.

## Why Frameworks Matter

Frameworks are reusable prompt shapes.

They help users avoid starting from a blank page. Each framework emphasizes a different kind of structure.

### Dynamic

Best when the user knows what they want but does not know which structure fits.

Dynamic adapts the prompt architecture to the task.

### CO-STAR

Best for audience-aware content and communication.

CO-STAR organizes prompts around:

- Context.
- Objective.
- Style.
- Tone.
- Audience.
- Response.

### RTF

Best for direct execution.

RTF organizes prompts around:

- Role.
- Task.
- Format.

### RASC

Best for process-heavy work.

RASC organizes prompts around:

- Role.
- Action.
- Steps.
- Constraints.

### Agentic-Goal

Best for autonomous or multi-step work.

Agentic-Goal defines:

- Mission.
- Starting context.
- Operating principles.
- Autonomy.
- Plan.
- Completion criteria.

## Why Model-Aware Prompting Matters

Different models respond differently to structure.

The same task may benefit from different prompt emphasis depending on whether the user is working with GPT-5.6 Sol, Claude Fable/Sonnet 5, or Gemini 3.7 Flash.

Examples:

- Some models benefit from clearer hierarchy.
- Some models benefit from more natural language framing.
- Some models benefit from direct section labels.
- Some models need stronger constraints to avoid wandering.

Prompt Architect Studio should not pretend every model is the same.

## What The App Should Teach

The app should teach these ideas quietly:

- Rough prompts are not bad; they are unfinished.
- Better prompts make hidden assumptions visible.
- Frameworks help structure intent.
- Model choice matters.
- A copy-ready prompt should be easy to test and reuse.

## What The App Should Avoid Teaching

Avoid:

- Dense prompt engineering jargon.
- Long tutorials before use.
- Claims that one framework is always best.
- Claims that prompts guarantee perfect outputs.
- Overpromising model performance.

## Suggested Microcopy

### Hero

Turn messy ideas into model-ready prompts.

### Input Helper

Paste the rough version. The architect will add structure.

### Framework Helper

Choose a prompt shape, or keep Dynamic when you are not sure.

### Model Helper

Tune the prompt for the model you plan to use.

### Output Helper

Copy this into your target model and run it as your next prompt.

## Product Education Philosophy

Teach through the workflow.

The user should understand prompt architecture because the interface reveals it, not because they had to read a manual first.
