const ALLOWED_FRAMEWORKS = new Set(["Dynamic", "CO-STAR", "RTF", "RASC", "Agentic-Goal"]);
const ALLOWED_MODELS = new Set(["GPT-5.5", "Claude", "Gemini"]);

const UNIVERSAL_RULES = [
  "Preserve the user's original intent and meaningful domain language.",
  "Preserve explicit variable data such as names, places, dates, time windows, colors, quantities, objects, and examples.",
  "Capture every requested deliverable or task; do not collapse multi-part requests into one primary task.",
  "Prioritize explicit nouns, platforms, channels, constraints, and audience labels from the source text over inferred defaults.",
  "Treat expressive wording, metaphors, and vibe cues as requirements, not decoration.",
  "Do not safe-wash creative language into generic professional defaults.",
  "If information is missing, fill only low-risk operational gaps; preserve deliberate ambiguity and mark major assumptions as optional.",
  "Do not ask clarification questions unless the request is fundamentally unclear or impossible to execute.",
  "Turn vague asks into observable tasks, constraints, and success criteria.",
  "Explicitly promote tone, style, audience, voice, and vibe descriptors into a primary Style/Tone constraint block.",
  "Keep the user's personality visible when it helps the output sound like it came from the person who asked.",
  "Never leave personality, humor, brand voice, or audience cues buried in background context.",
  "Prefer crisp instructions, bounded scope, and a concrete output format.",
  "Keep the final prompt ready to paste into the target model and capable of producing a complete answer in one run.",
];

const ACADEMIC_INTEGRITY_RULES = [
  "Treat this as learning support, not assignment completion.",
  "Do not write, draft, outline, or structure an essay, paper, discussion post, lab report, book report, application essay, or other submit-ready academic work.",
  "Do not generate thesis statements, topic sentences, body paragraphs, introductions, conclusions, abstracts, titles, or transitions for academic submission.",
  "Do not provide citations, source lists, bibliographies, works cited entries, quoted evidence, or fabricated references.",
  "Do not solve homework, exam, quiz, worksheet, or take-home problems directly. Explain the concept, ask guiding questions, or show a similar non-assigned example instead.",
  "Do not impersonate a student voice or produce text that could be pasted into a class assignment.",
  "Allowed support: explain concepts, clarify instructions, create study questions, suggest reading strategies, provide self-review checklists, give feedback on a student-provided draft without rewriting it, and guide the learner through their own reasoning.",
];

const FRAMEWORK_ALIASES = {
  "Auto Execute": "Dynamic",
  "Quick Task": "RTF",
  Precision: "RASC",
  RESC: "RASC",
  "Deep Strategy": "Agentic-Goal",
  Tarr: "Agentic-Goal",
  TARR: "Agentic-Goal",
  "Audience Fit": "CO-STAR",
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function normalizePrompt(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitPromptSegments(roughPrompt) {
  return roughPrompt
    .split(/(?<=[.!?])\s+|\n+/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function splitPromptClauses(roughPrompt) {
  return roughPrompt
    .split(/(?<=[.!?])\s+|\n+|;|,(?=\s*(?:and|plus|also|then|with|write|draft|create|make|build|generate|turn|convert|rewrite|plan|outline|summarize|design|develop|prepare|compose|produce)\b)/i)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function isFillerSegment(segment) {
  const normalized = segment
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return true;

  const fillerPatterns = [
    /^(hey|hi|hello|yo|ok|okay|so|alright|quick question|question|help|please|thanks|thank you)( there)?$/,
    /^(can you|could you|would you|will you|please)?\s*(help me|help us|i need help|we need help)( with this| out)?$/,
    /^(i have|we have)?\s*(a rough idea|a messy prompt|some notes|a thing|this idea)$/,
  ];

  return fillerPatterns.some((pattern) => pattern.test(normalized));
}

function cleanObjectiveSegment(segment) {
  return segment
    .replace(
      /^(?:hey|hi|hello|yo|ok|okay|so|alright)[,\s.!-]+/i,
      "",
    )
    .replace(
      /^(?:(?:can|could|would|will)\s+you\s+)?(?:please\s+)?(?:help\s+(?:me|us)\s+)?/i,
      "",
    )
    .replace(/^(?:i|we)\s+(?:need|want|would like)\s+(?:you\s+to\s+)?/i, "")
    .trim();
}

function truncateValue(value, maxLength = 220) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 3).trim()}...` : value.trim();
}

function isStyleInstruction(segment) {
  return /\b(?:make it|tone|voice|vibe|style|energy|sound(?:s)? like|feel(?:s)? like|not corporate|no slang)\b/i.test(segment);
}

function detectAcademicContext(roughPrompt) {
  const academicSignals = matchTerms(roughPrompt, [
    "academic",
    "academy",
    "assignment",
    "book report",
    "class",
    "classroom",
    "college",
    "course",
    "discussion post",
    "essay",
    "exam",
    "final paper",
    "grade",
    "graded",
    "high school",
    "homework",
    "in class",
    "lab report",
    "lesson",
    "midterm",
    "paper",
    "professor",
    "quiz",
    "rubric",
    "school",
    "student",
    "students",
    "teacher",
    "term paper",
    "thesis",
    "university",
    "worksheet",
  ]);

  const citationSignals = matchTerms(roughPrompt, [
    "APA",
    "bibliography",
    "citation",
    "citations",
    "cite",
    "cited",
    "MLA",
    "references",
    "sources",
    "works cited",
  ]);

  const writingShortcutSignals = matchTerms(roughPrompt, [
    "draft",
    "outline",
    "write",
    "generate",
    "solve",
    "answer",
    "answers",
    "complete",
    "do my",
  ]);

  const signals = normalizeList([...academicSignals, ...citationSignals]);
  const shortcutSignals = normalizeList(writingShortcutSignals);

  return {
    active: signals.length > 0,
    signals,
    shortcutSignals,
  };
}

function inferObjective(roughPrompt) {
  const taskClauses = inferTaskClauses(roughPrompt);
  const executionClauses = taskClauses.filter((clause) => !isStyleInstruction(clause));

  if (executionClauses.length > 1) {
    return truncateValue(`Complete a multi-part request: ${executionClauses.join("; ")}`, 260);
  }

  if (executionClauses.length === 1) {
    return truncateValue(executionClauses[0]);
  }

  const segments = splitPromptSegments(roughPrompt);
  const actionPattern =
    /\b(write|draft|create|make|build|generate|turn|convert|translate|rewrite|plan|outline|summarize|design|develop|prepare|compose|produce)\b/i;
  const deliverablePattern =
    /\b(newsletter|email|prompt|plan|strategy|brief|caption|post|landing page|campaign|sop|summary|proposal|script|outline|framework|response|copy|article|memo)\b/i;

  const ranked = segments
    .filter((segment) => !isFillerSegment(segment))
    .map((segment, index) => {
      let score = 0;
      if (actionPattern.test(segment)) score += 3;
      if (deliverablePattern.test(segment)) score += 3;
      if (/\b(for|to|about|that)\b/i.test(segment)) score += 1;
      if (/\b(zippy|neighborly|playful|warm|funny|witty|casual|smart|not corporate|no slang)\b/i.test(segment)) {
        score += 1;
      }
      return { segment: cleanObjectiveSegment(segment), score, index };
    })
    .filter(({ segment }) => segment)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const objective = ranked[0]?.segment || segments.find((segment) => !isFillerSegment(segment)) || roughPrompt;
  return truncateValue(objective, 180);
}

function uniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeList(values) {
  return uniqueValues(
    values
      .map((value) => String(value || "").replace(/\s+/g, " ").replace(/\s+([,.!?;:])/g, "$1").trim())
      .filter(Boolean),
  );
}

function removeSubsumedValues(values) {
  return values.filter((value) => {
    const normalized = value.toLowerCase();
    return !values.some((candidate) => {
      const candidateNormalized = candidate.toLowerCase();
      return candidateNormalized !== normalized && candidateNormalized.includes(normalized);
    });
  });
}

function matchTerms(text, terms) {
  const normalized = text.toLowerCase();
  return terms.filter((term) => normalized.includes(term.toLowerCase()));
}

function matchPhrases(text, patterns) {
  return uniqueValues(
    patterns
      .map((pattern) => text.match(pattern)?.[0])
      .filter(Boolean)
      .map((value) => value.trim()),
  );
}

function titleCase(value) {
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const DELIVERABLE_PATTERNS = [
  [/\bfacebook post\b/i, "Facebook post"],
  [/\binstagram post\b/i, "Instagram post"],
  [/\blinkedin post\b/i, "LinkedIn post"],
  [/\btiktok script\b/i, "TikTok script"],
  [/\bfollow-up email\b/i, "follow-up email"],
  [/\bnext steps?\b/i, "next steps"],
  [/\ba few tips?\b|\btips?\b/i, "tips"],
  [/\bjokes?\b/i, "joke"],
  [/\bchecklists?\b/i, "checklist"],
  [/\btemplates?\b/i, "template"],
  [/\bexamples?\b/i, "examples"],
  [/\bFAQs?\b|\bfrequently asked questions?\b/i, "FAQ"],
  [/\brecommendations?\b|\brecommend\b/i, "recommendations"],
  [/\bideas?\b/i, "ideas"],
  [/\boptions?\b/i, "options"],
  [/\bbullets?\b|\bbullet points?\b/i, "bullet points"],
  [/\bheadlines?\b/i, "headlines"],
  [/\btaglines?\b/i, "taglines"],
  [/\bsteps?\b/i, "steps"],
  [/\bautomation prompt\b/i, "automation prompt"],
  [/\bnewsletter\b/i, "newsletter plan"],
  [/\bemail\b/i, "email"],
  [/\bcaption\b/i, "caption"],
  [/\bpost\b/i, "post"],
  [/\blanding page\b/i, "landing page"],
  [/\bcampaign\b/i, "campaign brief"],
  [/\bsop\b/i, "SOP"],
  [/\bmeeting notes\b/i, "meeting summary"],
  [/\bexecutive update\b/i, "executive update"],
  [/\bresearch\b/i, "research brief"],
  [/\bcomparison\b/i, "comparison"],
  [/\bplan\b/i, "plan"],
  [/\bstrategy\b/i, "strategy"],
  [/\bscript\b/i, "script"],
  [/\boutline\b/i, "outline"],
  [/\barticle\b/i, "article"],
  [/\bessays?\b/i, "essay"],
  [/\bpapers?\b/i, "paper"],
  [/\bdiscussion posts?\b/i, "discussion post"],
  [/\blab reports?\b/i, "lab report"],
  [/\bbook reports?\b/i, "book report"],
  [/\banswers?\b/i, "answers"],
  [/\bmemo\b/i, "memo"],
  [/\bprompt\b/i, "prompt"],
];

function inferDeliverableLabels(text) {
  return DELIVERABLE_PATTERNS.filter(([pattern]) => pattern.test(text)).map(([, label]) => label);
}

function inferDeliverable(roughPrompt, taskClauses = inferTaskClauses(roughPrompt)) {
  const deliverables = [
    ...inferDeliverableLabels(roughPrompt),
    ...taskClauses.flatMap((clause) => inferDeliverableLabels(clause)),
  ];

  return removeSubsumedValues(normalizeList(deliverables));
}

function inferDeliverableSummary(roughPrompt) {
  const deliverables = inferDeliverable(roughPrompt);
  return deliverables.length ? deliverables.join("; ") : "best-fit work product";
}

function inferTaskClauses(roughPrompt) {
  const actionPattern =
    /\b(write|draft|create|make|build|generate|turn|convert|translate|rewrite|plan|outline|summarize|design|develop|prepare|compose|produce|give|include|add|recommend|list)\b/i;
  const deliverablePattern = new RegExp(
    DELIVERABLE_PATTERNS.map(([pattern]) => pattern.source).join("|"),
    "i",
  );

  const clauses = splitPromptClauses(roughPrompt)
    .filter((segment) => !isFillerSegment(segment))
    .filter((segment) => actionPattern.test(segment) || deliverablePattern.test(segment))
    .map(cleanObjectiveSegment)
    .map((segment) => segment.replace(/^(?:and|also|plus|then)\s+/i, ""))
    .filter(Boolean);

  return normalizeList(clauses).map((task) => truncateValue(task, 180));
}

function listOrFallback(values, fallback = "Not specified; use a low-risk default only if needed.") {
  return values.length ? values.join("; ") : fallback;
}

function extractRegexValues(text, patterns) {
  return normalizeList(patterns.flatMap((pattern) => Array.from(text.matchAll(pattern), (match) => match[0])));
}

function extractQuotedPhrases(text) {
  return normalizeList(Array.from(text.matchAll(/["'“”‘’]([^"'“”‘’]{2,90})["'“”‘’]/g), (match) => match[1]));
}

function extractNamedDetails(roughPrompt) {
  const stopPhrases = new Set([
    "Facebook",
    "Instagram",
    "Instagram DMs",
    "TikTok",
    "LinkedIn",
    "YouTube",
    "Slack",
    "Notion",
    "HubSpot",
    "Salesforce",
    "Klaviyo",
    "Mailchimp",
    "Google Sheets",
    "Airtable",
  ]);
  const capitalizedPhrases = extractRegexValues(roughPrompt, [
    /\b(?:[A-Z][a-z0-9]+|[A-Z]{2,})(?:\s+(?:[A-Z][a-z0-9]+|[A-Z]{2,}|[&-])){1,4}\b/g,
  ]).filter((phrase) => !stopPhrases.has(phrase));

  return normalizeList([...capitalizedPhrases, ...extractQuotedPhrases(roughPrompt)]);
}

function extractTimeDetails(roughPrompt) {
  return extractRegexValues(roughPrompt, [
    /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(?:morning|afternoon|evening|night|\d{1,2}(?::\d{2})?\s*(?:am|pm)?(?:\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?)\b/gi,
    /\b(?:today|tomorrow|tonight|this\s+(?:morning|afternoon|evening|week|month|quarter|year)|next\s+(?:week|month|quarter|year))\b/gi,
    /\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/gi,
    /\b\d{1,2}\s*[-–]\s*\d{1,2}\s*(?:am|pm)?\b/gi,
  ]);
}

function extractObjectDetails(roughPrompt) {
  return extractRegexValues(roughPrompt, [
    /\b(?:lime green|dark green|light green|forest green|navy blue|sky blue|royal blue|bright red|deep red|hot pink|pale pink|bright yellow|gold|orange|purple|black|white|gray|grey|silver|wood|metal|marble|retro|vintage|modern|1970s|80s|90s)\s+[a-z][a-z0-9-]*(?:\s+[a-z][a-z0-9-]*){0,3}\b/gi,
    /\b\d+(?:\.\d+)?\s*(?:x|by)\s*\d+(?:\.\d+)?\s*(?:inch|inches|ft|feet|cm|mm|px)?\b/gi,
  ]);
}

function extractSpecificDetails(roughPrompt) {
  return removeSubsumedValues(
    normalizeList([
      ...extractNamedDetails(roughPrompt),
      ...extractTimeDetails(roughPrompt),
      ...extractObjectDetails(roughPrompt),
    ]),
  );
}

function inferFactSheet(roughPrompt) {
  const normalized = roughPrompt.toLowerCase();
  const academicContext = detectAcademicContext(roughPrompt);
  const platforms = uniqueValues(
    matchTerms(roughPrompt, [
      "Shopify",
      "Instagram",
      "Instagram DMs",
      "Facebook",
      "Facebook Groups",
      "TikTok",
      "LinkedIn",
      "YouTube",
      "Pinterest",
      "Twitter",
      "Threads",
      "Slack",
      "Notion",
      "HubSpot",
      "Salesforce",
      "Klaviyo",
      "Mailchimp",
      "Google Sheets",
      "Airtable",
      "website",
      "blog",
      "SMS",
    ]),
  );
  const industries = removeSubsumedValues(
    uniqueValues(
      matchTerms(roughPrompt, [
        "B2B software",
        "software",
        "artisanal candles",
        "candles",
        "plant care",
        "plants",
        "accounting SaaS",
        "SaaS",
        "small business",
        "local business",
        "bakery",
        "restaurant",
        "coffee shop",
        "yoga studio",
        "landscaping",
        "home services",
        "retail",
        "online shop",
        "consulting",
        "manufacturing",
        "customer support",
        "ecommerce",
        "creator",
      "education",
      "class",
      "school",
      "college",
      "university",
      "high school",
      "workshop",
    ]).map(titleCase),
    ),
  );
  const audiences = uniqueValues(
    matchTerms(roughPrompt, [
      "millennial",
      "Gen Z",
      "founders",
      "operators",
      "marketers",
      "consultants",
      "plant parents",
      "neighbors",
      "local customers",
      "students",
      "student",
      "high school student",
      "college student",
      "teacher",
      "professor",
      "beginners",
      "parents",
      "B2B",
      "prospect",
      "prospects",
      "customers",
      "clients",
      "executives",
    ]),
  );
  const tone = uniqueValues(
    matchTerms(roughPrompt, [
      "Brooklyn Sister",
      "zippy",
      "neighborly",
      "casual",
      "smart",
      "human",
      "approachable",
      "plainspoken",
      "funny",
      "encouraging",
      "playful",
      "witty",
      "professional",
      "confident",
      "warm",
      "concise",
      "friendly",
      "Gen Z",
      "millennial",
      "pop",
      "disaster",
      "1970s",
    ]),
  );
  const vibeSignals = uniqueValues([
    ...tone,
    ...extractQuotedPhrases(roughPrompt),
    ...matchPhrases(roughPrompt, [
      /\b(?:like|as if|feels? like|sounds? like)\s+[^.!?\n]{3,90}/i,
      /\b(?:vibe|voice|tone|style|energy)\s*(?:is|as|like|should be|:)\s*[^.!?\n]{3,90}/i,
      /\bmake it\s+[^.!?\n]{3,90}/i,
      /\b(?:not too|not so|not)\s+[^.!?\n,;]{3,60}/i,
      /\b(?:no|without)\s+[^.!?\n,;]{3,50}/i,
      /\b(?:but|and)\s+no\s+[^.!?\n,;]{3,50}/i,
    ]),
  ]);
  const styleGuardrails = uniqueValues([
    normalized.includes("gen z") && normalized.includes("no slang") ? "Gen Z energy without slang" : "",
    normalized.includes("no slang") ? "No slang" : "",
    normalized.includes("not too corporate") || normalized.includes("not corporate") ? "Avoid corporate polish" : "",
    normalized.includes("not too polished") || normalized.includes("too polished") ? "Avoid over-polishing the user's voice" : "",
    normalized.includes("sounds like me") ? "Sound like the user, not a generic brand" : "",
  ]);
  const painMatches = [
    ["support", "support volume"],
    ["orders", "orders"],
    ["returns", "returns"],
    ["too many projects", "too many competing projects"],
    ["generic", "generic AI output"],
    ["inconsistent", "inconsistent output"],
    ["messy", "messy source context"],
    ["launch", "launch planning"],
  ];
  const painPoints = uniqueValues(
    painMatches.filter(([term]) => normalized.includes(term)).map(([, label]) => label),
  );
  const constraints = uniqueValues(
    [
      normalized.includes("do not overpromise") || normalized.includes("does not overpromise")
        ? "Do not overpromise"
        : "",
      normalized.includes("no overpromising") ? "No overpromising" : "",
      normalized.includes("concise") ? "Keep it concise" : "",
      normalized.includes("no slang") ? "No slang" : "",
      normalized.includes("not too corporate") || normalized.includes("not corporate") ? "Not corporate" : "",
    ].filter(Boolean),
  );
  const budgetMatch = roughPrompt.match(/(?:under|below|less than|budget of|budget:?)\s*\$?\s*[\d,]+/i);
  const cadenceMatch = roughPrompt.match(/\b\d+\s*[- ]?(?:week|day|month|part|step)s?\b/i);
  const taskClauses = inferTaskClauses(roughPrompt);
  const deliverables = inferDeliverable(roughPrompt, taskClauses);
  const specificDetails = extractSpecificDetails(roughPrompt);

  const facts = [
    ["Primary Intent / Overall Goal", inferObjective(roughPrompt)],
    ["Deliverables / Tasks", listOrFallback(deliverables, "Best-fit work product")],
    ["Task Clauses to Preserve", listOrFallback(taskClauses)],
    ["Learning Support Boundary", academicContext.active ? "Academic context detected; help the learner understand and practice without drafting, outlining, citing sources, or solving graded work directly." : ""],
    ["Academic Signals", academicContext.signals.join(", ")],
    ["Platform / Channels", platforms.join(", ")],
    ["Industry / Domain", industries.join(", ")],
    ["Audience", audiences.join(", ")],
    ["Specific Source Details", listOrFallback(specificDetails)],
    ["Pain Point", painPoints.join(", ")],
    ["Constraints", constraints.join(", ")],
    ["Budget", budgetMatch?.[0]],
    ["Cadence / Scope", cadenceMatch?.[0]],
    ["Style / Tone", tone.join(", ")],
    ["Voice / Vibe Signals", vibeSignals.join(", ")],
    ["Style Guardrails", styleGuardrails.join(", ")],
  ];

  return facts
    .map(([label, value]) => `- ${label}: ${value || "Not specified; use a low-risk default only if needed."}`)
    .join("\n");
}

function modelGuidance(targetModel) {
  const guidance = {
    "GPT-5.5":
      "Use precise hierarchy and a concise internal step-by-step execution plan. Do not reveal hidden reasoning; show only the useful final answer, assumptions, and deliverables.",
    Claude:
      "Use XML-style tags for high-recall structure, such as <context>, <style_tone>, <task>, <constraints>, and <output_format>. Keep nuance and constraints visible.",
    Gemini:
      "Use direct section labels, grounding in supplied context, and structured tables when they make planning, comparison, or execution easier to scan.",
  };

  return guidance[targetModel];
}

function normalizeFramework(value) {
  const framework = String(value || "");
  return FRAMEWORK_ALIASES[framework] || framework;
}

function baseSections({ roughPrompt, targetModel }) {
  const academicContext = detectAcademicContext(roughPrompt);

  return {
    intent: inferObjective(roughPrompt),
    deliverables: inferDeliverableSummary(roughPrompt),
    factSheet: inferFactSheet(roughPrompt),
    academicContext,
    academicRules: academicContext.active ? ACADEMIC_INTEGRITY_RULES.map((rule) => `- ${rule}`).join("\n") : "",
    model: modelGuidance(targetModel),
    rules: UNIVERSAL_RULES.map((rule) => `- ${rule}`).join("\n"),
  };
}

function academicIntegritySection(sections) {
  if (!sections.academicContext.active) return "";

  return `
Learning support boundaries:
${sections.academicRules}

When these boundaries conflict with requested deliverables, follow the boundaries and provide a learning-safe alternative.`;
}

function buildDynamicPrompt(input) {
  const sections = baseSections(input);

  return `You are a creative execution partner, not a form-filling project manager.

Primary intent:
${sections.intent}

Distilled fact sheet:
${sections.factSheet}

Target model calibration:
${sections.model}

Universal Prompt Architect rules:
${sections.rules}
${academicIntegritySection(sections)}

Your task:
1. Look past greetings, filler, and setup language to identify the user's real goals, all requested deliverables, audience, constraints, style cues, and likely missing context.
2. Preserve explicit source variables, including named places, times, colors, objects, quantities, platforms, examples, and unusual phrases.
3. Preserve the user's expressive language where it communicates taste, energy, audience, or voice.
4. Ask clarification questions only if the request cannot be executed without them.
5. Produce the strongest useful output in the format best suited to the request.

Response requirements:
- Start with the finished answer, not a long explanation of your process.
- Include a compact "Assumptions Used" section only when assumptions materially shape the answer; do not replace deliberate ambiguity with generic industry claims.
- Include a dedicated "Style/Tone" section when the user provides vibe, voice, audience, humor, or brand cues, and use the user's own wording when it carries nuance.
- Complete every item in "Deliverables / Tasks" and preserve every item in "Specific Source Details" unless it is directly irrelevant.
- If learning support boundaries are present, satisfy the underlying learning need without generating submit-ready writing, outlines, citations, source lists, or direct answers.
- Use headings, tables, examples, or checklists only when they improve usability.
- Include next steps or decision points when the user needs to act.
- Do not make the user answer setup questions before receiving a useful output.`;
}

function buildCostarPrompt(input) {
  const sections = baseSections(input);

  return `# Audience Fit Prompt

## Fact Sheet
${sections.factSheet}

## Objective
Complete the best possible answer for this intent: ${sections.intent}

Required deliverables:
${sections.deliverables}

## Style/Tone
Extract all voice, personality, humor, audience, and brand cues from the context. If the user implies a vibe, promote it here as a hard constraint. Preserve source phrases that carry nuance, such as "zippy," "neighborly," or "Gen Z but no slang."

${academicIntegritySection(sections)}

Default style if unspecified:
Match the user's provided energy. If no energy is provided, be clear, practical, specific, and audience-aware. Prefer concrete examples over abstractions.

## Audience
Infer the most likely audience from the request. Use low-risk defaults when details are missing, but keep deliberately vague industries or audiences broad instead of inventing specifics.

## Response
Deliver a complete response that follows these Universal Prompt Architect rules:
${sections.rules}

Target model calibration:
${sections.model}

Output format:
- Begin with the final answer.
- Use structured sections with short labels.
- Include assumptions used, not questions, unless execution is impossible.
- Complete every deliverable in the fact sheet.
- Apply explicit channels, names, times, objects, quantities, and examples exactly when supplied.
- If learning support boundaries are present, provide only learning-safe support and do not generate citations, source lists, outlines, or draft academic writing.
- Preserve the intended vibe as a visible constraint.`;
}

function buildRtfPrompt(input) {
  const sections = baseSections(input);

  return `# Quick Task Prompt

## Role
Act as a senior specialist who can turn rough requests into direct, useful outputs.

## Task
Complete this request, including every deliverable and task listed:
${sections.factSheet}

Interpret the core objective as:
${sections.intent}

## Style/Tone
Extract and apply any style, tone, audience, voice, or humor cues from the source request. Keep expressive source wording visible when it carries the intended feel. If none are explicit, use a clear and practical default.

## Format
Return a polished answer with:
- A direct final output.
- Every requested deliverable, not only the first one.
- Smart assumptions filled in where needed.
- A reusable structure suited to the user's goal.
- No fabricated facts or unsupported claims.
- No clarification questions unless the request cannot be completed.

Universal Prompt Architect rules:
${sections.rules}
${academicIntegritySection(sections)}

Target model calibration:
${sections.model}`;
}

function buildRascPrompt(input) {
  const sections = baseSections(input);

  return `# Precision Prompt

## Role
You are a domain-aware execution assistant that is careful with constraints, examples, tone, and edge cases.

## Action
Turn the following distilled fact sheet into a high-quality finished response:
${sections.factSheet}

## Steps
1. Extract the real objective: ${sections.intent}
2. Extract every requested deliverable or secondary task and complete each one.
3. Extract all tone, style, audience, voice, example, platform, object, location, time, and constraint signals into visible instruction blocks, preserving source wording that carries human nuance.
4. Fill only low-risk missing variables; use placeholders or optional assumptions when missing details would materially change the answer.
5. Choose the most useful output structure for the task.
6. Produce the final response with practical details and clear completion criteria.
7. Self-check for relevance, specificity, unsupported claims, formatting quality, secondary task coverage, source-detail preservation, and vibe preservation. Make sure the result sounds like a creative partner understood the user.

## Constraints
- Preserve original intent.
- Preserve explicit source details such as names, places, times, colors, objects, quantities, channels, examples, and constraints.
- Complete all deliverables and secondary tasks in the fact sheet.
- Do not invent private data, metrics, citations, or product details.
- Use reasonable defaults for missing low-risk information.
- Use placeholders like [audience], [deadline], or [brand voice] only when the missing information materially changes the answer.
- Keep the output easy to copy and use.
- Do not ask questions unless execution is blocked.

Universal Prompt Architect rules:
${sections.rules}
${academicIntegritySection(sections)}

Target model calibration:
${sections.model}`;
}

function buildAgenticGoalPrompt(input) {
  const sections = baseSections(input);

  return `# Deep Strategy Prompt

## Mission
Achieve this user goal:
${sections.intent}

## Starting Fact Sheet
${sections.factSheet}

## Operating Principles
${sections.rules}
${academicIntegritySection(sections)}

## Style/Tone
Extract the intended vibe, audience, personality, humor, and brand voice from the starting context. Treat those cues as execution constraints, not background notes.

## Autonomy
Proceed independently. Fill ordinary low-risk gaps with high-probability strategic assumptions, but preserve deliberate ambiguity and avoid generic corporate defaults. Ask concise clarification questions only when the goal is fundamentally non-sensical or impossible to execute.

## Plan
1. Translate the rough prompt into a concrete objective.
2. Determine all deliverables, secondary tasks, source details, constraints, and acceptance criteria.
3. Make the smallest useful assumptions required to move forward.
4. Execute every requested task in the most useful format.
5. Review the output for gaps, ambiguity, actionability, source-detail preservation, and style fidelity. Keep the user's personality in the work when it is part of the request.

## Completion Criteria
- The answer is ready to use without requiring the user to reformat it.
- Any assumptions are explicit and minimal.
- All explicit variables and secondary tasks from the source request are represented in the final answer.
- If learning support boundaries are present, the final answer supports learning without producing submit-ready academic work, outlines, citations, source lists, or direct solutions.
- The output matches the selected target model's strengths.
- The user receives a useful finished result in one run, not a list of homework questions.

Target model calibration:
${sections.model}`;
}

function formatForTargetModel(prompt, targetModel) {
  if (targetModel === "Claude") {
    return `<execution_prompt>
<instruction>
Use the following prompt to produce a complete answer in one run. Preserve the XML-style structure and treat each tag as a high-priority instruction block.
</instruction>

<prompt_body>
${prompt}
</prompt_body>
</execution_prompt>`;
  }

  if (targetModel === "Gemini") {
    return `# Gemini Execution Prompt

Use the following structured prompt. When the task involves planning, comparison, scheduling, research, or prioritization, use tables to make the output easy to scan.

${prompt}`;
  }

  return `# GPT-5.5 Execution Prompt

Use the following structured prompt. Think through the task step by step internally, then return only the useful final answer, assumptions, and deliverables.

${prompt}`;
}

function architectPrompt(payload) {
  const roughPrompt = normalizePrompt(payload.roughPrompt);
  const framework = normalizeFramework(payload.framework);
  const targetModel = String(payload.targetModel || "");

  if (roughPrompt.length < 8) {
    return { error: "Enter a rough prompt with at least 8 characters." };
  }

  if (!ALLOWED_FRAMEWORKS.has(framework)) {
    return { error: "Select a supported framework." };
  }

  if (!ALLOWED_MODELS.has(targetModel)) {
    return { error: "Select a supported target model." };
  }

  const input = { roughPrompt, framework, targetModel };
  const builders = {
    Dynamic: buildDynamicPrompt,
    "CO-STAR": buildCostarPrompt,
    RTF: buildRtfPrompt,
    RASC: buildRascPrompt,
    "Agentic-Goal": buildAgenticGoalPrompt,
  };

  return {
    prompt: formatForTargetModel(builders[framework](input), targetModel),
    framework,
    targetModel,
  };
}

export async function onRequestPost(context) {
  try {
    const payload = await context.request.json();
    const result = architectPrompt(payload);

    if (result.error) {
      return jsonResponse({ error: result.error }, 400);
    }

    return jsonResponse(result);
  } catch (error) {
    return jsonResponse({ error: "Send JSON with roughPrompt, framework, and targetModel." }, 400);
  }
}

export function onRequestGet() {
  return jsonResponse({
    name: "Prompt Architect Studio API",
    usage: "POST /api/architect with roughPrompt, framework, and targetModel.",
    frameworks: Array.from(ALLOWED_FRAMEWORKS),
    models: Array.from(ALLOWED_MODELS),
  });
}
