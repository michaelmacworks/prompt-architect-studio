# Prompt Architect Studio Product Strategy

## 1. Working Folder

The working folder for this project is:

`/Users/mcateermarshall.edu/Documents/Playground/prompt-architect-studio`

All app files, product notes, design strategy, and deployment configuration should live inside this folder unless the user explicitly chooses a different location.

## 2. Product Definition

Prompt Architect Studio is a lightweight SaaS-style web app that turns rough user prompts into structured, model-aware prompts.

The user enters a messy idea, chooses a prompt framework, chooses a target model, and receives a polished copyable prompt. The app is not trying to teach prompt engineering as a course. It is trying to give users a faster way to convert intent into usable AI instructions.

The default end user is an average person who uses AI but does not know prompt engineering. They may be a small business owner, marketer, creator, educator, consultant, operator, student, or professional knowledge worker, but the product should not assume a strictly B2B audience.

## 3. Who It Is For

Primary users:

- Everyday AI users who know what they want but struggle to ask for it clearly.
- Small business owners, marketers, creators, educators, consultants, and professionals who use AI for practical work.
- People who know what they want from an AI model but do not always know how to structure the request.
- Nontechnical users who want better outputs without learning prompt theory.

Secondary users:

- Teams that need repeatable prompt patterns across different models.
- Agencies building reusable AI workflows for clients.
- Product teams documenting internal AI processes.
- Power users who want consistent prompt formats.

## 4. Why They Should Use It

Most rough prompts fail because they hide important decisions:

- What is the real goal?
- What context does the model need?
- What constraints matter?
- What format should the answer follow?
- How autonomous should the model be?
- Which model is the prompt intended for?

Prompt Architect Studio makes those decisions visible. It helps users move from vague instruction to structured execution without friction.

The product promise:

> Paste a rough idea. Choose the shape. Get a prompt that is ready to run.

## 5. Core Workflow

1. User enters a rough prompt.
2. User selects a framework:
   - Dynamic
   - CO-STAR
   - RTF
   - RASC
   - Agentic-Goal
3. User selects a target model:
   - GPT-5.5
   - Claude
   - Gemini
4. The API applies the Universal Prompt Architect rules.
5. The app returns a clean, copyable prompt.

## 6. Product Positioning

Prompt Architect Studio should feel like a practical workbench, not a novelty AI toy.

It should communicate:

- Clarity over cleverness.
- Speed without shallowness.
- Structure without academic heaviness.
- Model awareness without jargon overload.
- Broad usefulness without assuming a B2B, SaaS, or enterprise context.
- A little personality, but always in service of usefulness.

## 7. Design Strategy Before Coding

Website design should come from the product strategy and the user's product/web/SaaS app development docs, not arbitrary visual trends.

Current source-doc signals reviewed:

- `TradesLook/Global Site Settings (The Vibe).md`
  - Strong visual hook.
  - Minimal navigation.
  - Heavy, confident typography.
  - Clear CTA.
  - Product ecosystem sections.
  - Trust-building founder/product context.

- `Neighborhood.CC/prd.md`
  - One phase at a time.
  - No speculative coding.
  - Stop and verify before advancing.
  - Keep the implementation simple.

- `Marketing-Clarity-OS-Master-v2.md`
  - Product should explain the structural problem, not just list features.
  - Use narrative framing around chaos becoming a system.
  - Treat the product as infrastructure that makes work more predictable.

Pending:

- Confirm whether these are the correct product/web/SaaS development docs for this app.
- If there is a specific design system or SaaS app development document, use that as the primary design source before further UI work.

## 8. Design Direction

The interface should be built around the product workflow:

- A concise hero that explains what the app does and why prompt architecture matters.
- A primary studio workspace where the user can immediately perform the core task.
- Supporting context that explains frameworks and model-aware prompting.
- No decorative elements that do not map to the product.

Bento-style layouts can be used only if each tile represents a real product idea:

- Rough input.
- Framework selection.
- Model calibration.
- Architect rules.
- Copy-ready output.

Avoid meaningless photo insets, generic abstract visuals, or borrowed layouts that do not explain the app.

## 9. MVP Scope

In scope:

- Vite React frontend.
- No login.
- Responsive layout.
- Framework selector.
- Target model selector.
- API endpoint for prompt transformation.
- Copyable result block.
- Cloudflare Pages deployability.
- Clear product context and design strategy.

Out of scope for the first MVP:

- Accounts.
- Saved prompt history.
- Billing.
- Team workspaces.
- Prompt marketplace.
- Multi-step onboarding.
- Complex dashboard navigation.

## 10. Next Design Step

Before more frontend coding, create a design brief derived from this strategy:

- Page structure.
- Messaging hierarchy.
- Visual references that actually map to the product.
- Color and typography direction.
- Components needed.
- Mobile behavior.

Only after that design brief is approved should the interface be revised.
