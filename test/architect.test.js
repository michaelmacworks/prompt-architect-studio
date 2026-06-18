import assert from "node:assert/strict";
import test from "node:test";

import { architectPrompt, architectPromptHybrid } from "../functions/api/architect.js";
import { evaluationCorpus } from "./evaluation-corpus.js";

function runArchitect(roughPrompt, framework = "Dynamic") {
  return architectPrompt({
    roughPrompt,
    framework,
    targetModel: "GPT-5.5",
    includeMeta: true,
  });
}

test("does not apply student guardrails to professional grant research", () => {
  const result = runArchitect(
    "Draft a grant research brief using APA-style headings for our lab operations team. This is professional research, not student homework.",
  );

  assert.equal(result.meta.parse.guardrailMode, "standard");
  assert.equal(result.meta.parse.userContext.type, "professional_or_educator_context");
  assert.equal(result.meta.critique.failureTypes.includes("academic_false_positive"), false);
});

test("applies learning support guardrails to clear student graded-work context", () => {
  const result = runArchitect(
    "I am a high school student and this is my graded essay for class. Help me understand the rubric and make a self-review checklist.",
  );

  assert.equal(result.meta.parse.guardrailMode, "student_learning_support");
  assert.match(result.prompt, /Learning support boundaries/i);
});

test("preserves forbidden actions as guardrails", () => {
  const result = runArchitect(
    "Write a research prompt about neighborhood zoning. Do not cite sources and never include private client names.",
  );

  assert.ok(result.meta.parse.forbiddenActions.some((item) => /do not cite sources/i.test(item)));
  assert.ok(result.meta.parse.forbiddenActions.some((item) => /never include private client names/i.test(item)));
  assert.equal(result.meta.critique.failureTypes.includes("constraint_clipped"), false);
});

test("preserves conditional triggers in a dedicated rule path", () => {
  const result = runArchitect(
    "Build an automation prompt for greenhouse monitoring. If the temperature goes above 80 degrees, alert me in Slack and include the sensor name.",
  );

  assert.ok(result.meta.parse.conditionalTriggers.some((item) => /above 80 degrees/i.test(item)));
  assert.match(result.prompt, /Conditional Triggers \/ Rules/i);
  assert.equal(result.meta.critique.failureTypes.includes("missed_conditional_trigger"), false);
});

test("preserves multi-deliverable requests and task-specific style", () => {
  const result = runArchitect(
    "Create a Facebook post, three tips, and one joke for Hidden Valley's Sunday 2-4 plant sale. Make it zippy but neighborly, Gen Z but no slang.",
    "CO-STAR",
  );

  assert.ok(result.meta.parse.deliverables.includes("Facebook post"));
  assert.ok(result.meta.parse.deliverables.includes("tips"));
  assert.ok(result.meta.parse.deliverables.includes("joke"));
  assert.ok(result.meta.parse.variables.some((item) => /Hidden Valley/i.test(item)));
  assert.ok(result.meta.parse.variables.some((item) => /Sunday 2-4/i.test(item)));
  assert.ok(result.meta.parse.styleByTask.some(({ style }) => /zippy but neighborly/i.test(style)));
  assert.equal(result.meta.critique.failureTypes.includes("missing_deliverable"), false);
  assert.equal(result.meta.critique.failureTypes.includes("style_flattened"), false);
});

test("hybrid architect falls back to rule-based output without an API key", async () => {
  const result = await architectPromptHybrid({
    roughPrompt: "Create an Instagram post for a candle sale, but do not mention pricing. Make it cozy.",
    framework: "Dynamic",
    targetModel: "GPT-5.5",
    includeMeta: true,
  });

  assert.equal(result.engine.mode, "rule_based_fallback");
  assert.equal(result.engine.reason, "missing_openai_api_key");
  assert.match(result.prompt, /do not mention pricing/i);
});

test("normalizes legacy model family labels to current presets", () => {
  const claudeResult = architectPrompt({
    roughPrompt: "Create a customer reply about a delayed order. Keep it warm and concise.",
    framework: "RTF",
    targetModel: "Claude",
    includeMeta: true,
  });
  const geminiResult = architectPrompt({
    roughPrompt: "Compare three newsletter ideas in a table for a local bakery.",
    framework: "RTF",
    targetModel: "Gemini",
    includeMeta: true,
  });

  assert.equal(claudeResult.targetModel, "Claude Fable 5");
  assert.match(claudeResult.prompt, /<execution_prompt>/i);
  assert.equal(geminiResult.targetModel, "Gemini 3.5 Flash");
  assert.match(geminiResult.prompt, /# Gemini 3\.5 Flash Execution Prompt/i);
});

test("extracts platform-only social deliverables and tight negative constraints", () => {
  const result = architectPrompt({
    roughPrompt:
      "Make something for my bakery, like maybe instagram and an email. We have sourdough bagels this Saturday 8-11, only 40 packs, cozy but not cheesy, dont mention discounts.",
    framework: "Dynamic",
    targetModel: "GPT-5.5",
    includeMeta: true,
  });

  assert.ok(result.meta.parse.deliverables.includes("Instagram post"));
  assert.ok(result.meta.parse.deliverables.includes("email"));
  assert.ok(result.meta.parse.prohibitedTopics.some((item) => /dont mention discounts/i.test(item)));
  assert.equal(
    result.meta.parse.prohibitedTopics.some((item) => /sourdough bagels/i.test(item)),
    false,
  );
  assert.ok(result.meta.parse.styleByTask.some(({ style }) => /cozy but not cheesy/i.test(style)));
});

test("actually no correction supports learning-safe pivot", () => {
  const result = architectPrompt({
    roughPrompt:
      "Write my essay about Macbeth for 10th grade, actually no, help me understand the assignment and make a study plan. Teacher wants themes and quotes by Friday. Dont write it for me.",
    framework: "Dynamic",
    targetModel: "Gemini 3.5 Flash",
    includeMeta: true,
  });

  assert.equal(result.meta.parse.preprocess.correctionApplied, true);
  assert.equal(result.meta.parse.guardrailMode, "student_learning_support");
  assert.ok(result.meta.parse.deliverables.includes("plan"));
  assert.equal(result.meta.parse.deliverables.includes("essay"), false);
  assert.match(result.prompt, /Learning support boundaries/i);
});

test("customer reply preserves names order numbers and tone", () => {
  const result = architectPrompt({
    roughPrompt:
      "Scratch the linkedin post. Need a customer reply for a ceramics order that arrived cracked. Customer is Maria, order 1842, replacement ships Tuesday, keep it apologetic but calm, dont blame the carrier, include next steps and a short subject line.",
    framework: "CO-STAR",
    targetModel: "Claude Sonnet 4.6",
    includeMeta: true,
  });

  assert.ok(result.meta.parse.deliverables.includes("customer reply"));
  assert.ok(result.meta.parse.deliverables.includes("next steps"));
  assert.equal(result.meta.parse.deliverables.includes("LinkedIn post"), false);
  assert.ok(result.meta.parse.variables.some((item) => /Maria/i.test(item)));
  assert.ok(result.meta.parse.variables.some((item) => /order 1842/i.test(item)));
  assert.ok(result.meta.parse.styleByTask.some(({ style }) => /apologetic but calm/i.test(style)));
  assert.ok(result.meta.parse.forbiddenActions.some((item) => /dont blame the carrier/i.test(item)));
});

test("hybrid architect uses provider output and repairs dropped constraints", async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    return {
      ok: true,
      status: 200,
      json: async () => ({
        output_text: "# GPT-5.5 Execution Prompt\n\nCreate an Instagram post for the candle sale. Make it cozy.",
      }),
    };
  };

  const result = await architectPromptHybrid(
    {
      roughPrompt: "Create an Instagram post for a candle sale, but do not mention pricing. Make it cozy.",
      framework: "Dynamic",
      targetModel: "GPT-5.5",
      includeMeta: true,
    },
    {
      env: {
        OPENAI_API_KEY: "test-key",
        OPENAI_MODEL: "gpt-5.5",
      },
      fetchImpl,
    },
  );

  assert.equal(result.engine.mode, "hybrid");
  assert.equal(result.engine.provider, "openai");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.openai.com/v1/responses");
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-key");
  assert.match(result.prompt, /do not mention pricing/i);
  assert.equal(result.meta.critique.failureTypes.includes("prohibited_topic_dropped"), false);
});

function assertAnyMatch(values, expectedPattern, label) {
  assert.ok(
    values.some((value) => expectedPattern.test(String(value))),
    `${label} should include ${expectedPattern}`,
  );
}

function assertExpectedStrings(values, expectedStrings, label) {
  expectedStrings.forEach((expectedValue) => {
    assert.ok(values.includes(expectedValue), `${label} should include ${expectedValue}`);
  });
}

test("seed evaluation corpus preserves expected parse and critique outcomes", () => {
  evaluationCorpus.forEach(({ name, roughPrompt, framework = "Dynamic", expected }) => {
    const result = runArchitect(roughPrompt, framework);
    const { parse, critique } = result.meta;

    if (expected.guardrailMode) {
      assert.equal(parse.guardrailMode, expected.guardrailMode, `${name}: guardrail mode`);
    }

    if (expected.userContextType) {
      assert.equal(parse.userContext.type, expected.userContextType, `${name}: user context`);
    }

    if (expected.deliverables) {
      assertExpectedStrings(parse.deliverables, expected.deliverables, `${name}: deliverables`);
    }

    if (expected.absentDeliverables) {
      expected.absentDeliverables.forEach((deliverable) => {
        assert.equal(parse.deliverables.includes(deliverable), false, `${name}: unexpected deliverable ${deliverable}`);
      });
    }

    if (expected.forbiddenActions) {
      expected.forbiddenActions.forEach((pattern) => assertAnyMatch(parse.forbiddenActions, pattern, `${name}: forbidden actions`));
    }

    if (expected.prohibitedTopics) {
      expected.prohibitedTopics.forEach((pattern) => assertAnyMatch(parse.prohibitedTopics, pattern, `${name}: prohibited topics`));
    }

    if (expected.prohibitedTasks) {
      assert.equal(parse.prohibitedTasks.length, expected.prohibitedTasks.length, `${name}: prohibited task count`);
      expected.prohibitedTasks.forEach((pattern) => assertAnyMatch(parse.prohibitedTasks, pattern, `${name}: prohibited tasks`));
    }

    if (expected.conditionalTriggers) {
      expected.conditionalTriggers.forEach((pattern) => assertAnyMatch(parse.conditionalTriggers, pattern, `${name}: conditional triggers`));
    }

    if (expected.variables) {
      expected.variables.forEach((pattern) => assertAnyMatch(parse.variables, pattern, `${name}: variables`));
    }

    if (expected.absentVariables) {
      expected.absentVariables.forEach((pattern) => {
        assert.equal(parse.variables.some((value) => pattern.test(String(value))), false, `${name}: unexpected variable ${pattern}`);
      });
    }

    if (expected.styleByTask) {
      const styleValues = parse.styleByTask.map(({ style }) => style);
      expected.styleByTask.forEach((pattern) => assertAnyMatch(styleValues, pattern, `${name}: style by task`));
    }

    if (expected.promptIncludes) {
      expected.promptIncludes.forEach((text) => {
        assert.match(result.prompt, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${name}: prompt includes ${text}`);
      });
    }

    if (expected.promptExcludes) {
      expected.promptExcludes.forEach((text) => {
        assert.doesNotMatch(result.prompt, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `${name}: prompt excludes ${text}`);
      });
    }

    if (expected.metaSegments) {
      expected.metaSegments.forEach((pattern) => assertAnyMatch(parse.preprocess.metaSegments, pattern, `${name}: meta segments`));
    }

    if (expected.metaSegmentsLength !== undefined) {
      assert.equal(parse.preprocess.metaSegments.length, expected.metaSegmentsLength, `${name}: meta segment count`);
    }

    if (expected.retractedSegments) {
      expected.retractedSegments.forEach((pattern) => assertAnyMatch(parse.preprocess.retractedSegments, pattern, `${name}: retracted segments`));
    }

    if (expected.correctionApplied !== undefined) {
      assert.equal(parse.preprocess.correctionApplied, expected.correctionApplied, `${name}: correction applied`);
    }

    if (expected.preservedAnchors !== undefined) {
      assert.equal(parse.preprocess.preservedAnchors, expected.preservedAnchors, `${name}: preserved anchors`);
    }

    if (expected.absentFailureTypes) {
      expected.absentFailureTypes.forEach((failureType) => {
        assert.equal(critique.failureTypes.includes(failureType), false, `${name}: unexpected ${failureType}`);
      });
    }
  });
});
