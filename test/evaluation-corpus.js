export const evaluationCorpus = [
  {
    name: "professional grant research avoids student guardrails",
    roughPrompt:
      "Draft a grant research brief using APA-style headings for our lab operations team. This is professional research, not student homework.",
    expected: {
      guardrailMode: "standard",
      userContextType: "professional_or_educator_context",
      absentFailureTypes: ["academic_false_positive"],
      promptIncludes: ["grant research brief", "professional research"],
    },
  },
  {
    name: "student graded essay shifts to learning support",
    roughPrompt:
      "I am a high school student and this is my graded essay for class. Help me understand the rubric and make a self-review checklist.",
    expected: {
      guardrailMode: "student_learning_support",
      promptIncludes: ["Learning support boundaries", "self-review checklist"],
    },
  },
  {
    name: "forbidden citation and private names stay guardrails",
    roughPrompt:
      "Write a research prompt about neighborhood zoning. Do not cite sources and never include private client names.",
    expected: {
      forbiddenActions: [/do not cite sources/i, /never include private client names/i],
      absentFailureTypes: ["constraint_clipped"],
      promptIncludes: ["Prohibited Topics", "private client names"],
    },
  },
  {
    name: "monitoring threshold stays trigger",
    roughPrompt:
      "Build an automation prompt for greenhouse monitoring. If the temperature goes above 80 degrees, alert me in Slack and include the sensor name.",
    expected: {
      conditionalTriggers: [/above 80 degrees/i],
      variables: [/80 degrees/i, /Slack/i],
      absentFailureTypes: ["missed_conditional_trigger"],
      promptIncludes: ["Conditional Triggers / Rules", "sensor name"],
    },
  },
  {
    name: "multi-deliverable local promotion keeps style",
    roughPrompt:
      "Create a Facebook post, three tips, and one joke for Hidden Valley's Sunday 2-4 plant sale. Make it zippy but neighborly, Gen Z but no slang.",
    framework: "CO-STAR",
    expected: {
      deliverables: ["Facebook post", "tips", "joke"],
      variables: [/Hidden Valley/i, /Sunday 2-4/i],
      styleByTask: [/zippy but neighborly/i, /Gen Z but no slang/i],
      absentFailureTypes: ["missing_deliverable", "style_flattened"],
    },
  },
  {
    name: "small business training with academic language stays standard",
    roughPrompt:
      "Create a training workshop outline for my small business team about reading customer feedback. Use lesson-style sections and a short quiz, but this is internal employee training.",
    expected: {
      guardrailMode: "standard",
      userContextType: "professional_or_educator_context",
      deliverables: ["outline"],
      absentFailureTypes: ["academic_false_positive"],
    },
  },
  {
    name: "secret launch notes stay private constraints",
    roughPrompt:
      "Turn these secret launch notes into an executive update. Do not reveal the codename Project Maple, and avoid naming the client.",
    expected: {
      deliverables: ["executive update"],
      forbiddenActions: [/do not reveal the codename Project Maple/i, /avoid naming the client/i],
      variables: [/Project Maple/i],
      absentFailureTypes: ["constraint_clipped", "variable_dropped"],
    },
  },
  {
    name: "if unless customer support rule stays trigger",
    roughPrompt:
      "Create a support SOP for returns. When a customer mentions damaged glass, escalate to a manager unless the order is under $25.",
    expected: {
      deliverables: ["SOP"],
      conditionalTriggers: [/When a customer mentions damaged glass/i],
      variables: [/\$25/i],
      absentFailureTypes: ["missed_conditional_trigger"],
    },
  },
  {
    name: "deliberately broad domain does not invent industry",
    roughPrompt:
      "Help me compare three options before I buy new software. Keep the industry broad because I have not picked a niche yet.",
    expected: {
      guardrailMode: "standard",
      deliverables: ["options"],
      promptIncludes: ["preserve deliberate ambiguity"],
      absentFailureTypes: ["invented_fact"],
    },
  },
  {
    name: "different outputs with distinctive vibe",
    roughPrompt:
      "Write a follow-up email and a short checklist for a client discovery call. The email should sound calm and prestigious; the checklist should be plainspoken and fast.",
    expected: {
      deliverables: ["follow-up email", "checklist"],
      styleByTask: [/calm and prestigious/i, /plainspoken and fast/i],
      absentFailureTypes: ["missing_deliverable", "style_flattened"],
    },
  },
  {
    name: "meeting notes preserve decisions owners risks and next steps",
    roughPrompt:
      "Convert messy meeting notes into decisions, owners, risks, and next steps for the Ops team. Make it concise and not too corporate.",
    expected: {
      deliverables: ["next steps"],
      variables: [/Ops/i],
      styleByTask: [/concise and not too corporate/i],
      absentFailureTypes: ["style_flattened"],
    },
  },
  {
    name: "platform nouns are authoritative",
    roughPrompt:
      "Make a LinkedIn post and an email version for a consulting firm webinar next Thursday afternoon.",
    expected: {
      deliverables: ["LinkedIn post", "email"],
      variables: [/LinkedIn/i, /next Thursday afternoon/i],
      absentFailureTypes: ["missing_deliverable", "variable_dropped"],
    },
  },
  {
    name: "nested constraint with unless stays intact",
    roughPrompt:
      "Draft a customer reply about delayed shipments. Do not offer a refund unless the package is more than 10 days late, and never mention our warehouse vendor.",
    expected: {
      deliverables: ["customer reply"],
      forbiddenActions: [/do not offer a refund unless the package is more than 10 days late/i, /never mention our warehouse vendor/i],
      conditionalTriggers: [/unless the package is more than 10 days late/i],
      variables: [/10 days/i],
      absentFailureTypes: ["constraint_clipped", "missed_conditional_trigger", "variable_dropped"],
    },
  },
  {
    name: "privacy and alert trigger both survive",
    roughPrompt:
      "Build a Slack monitoring prompt for payroll anomalies. Keep employee names private, and if any payout is over $5,000, tell me the department and risk level only.",
    expected: {
      deliverables: ["Slack monitoring prompt"],
      forbiddenActions: [/Keep employee names private/i],
      conditionalTriggers: [/if any payout is over \$5,000/i],
      variables: [/Slack/i, /\$5,000/i],
      absentFailureTypes: ["constraint_clipped", "missed_conditional_trigger"],
    },
  },
  {
    name: "educator curriculum request avoids student guardrails",
    roughPrompt:
      "I am an educator creating curriculum materials. Draft a lesson plan, practice questions, and a rubric for a media literacy workshop, but do not write student answers.",
    expected: {
      guardrailMode: "standard",
      userContextType: "professional_or_educator_context",
      deliverables: ["lesson plan"],
      forbiddenActions: [/do not write student answers/i],
      absentFailureTypes: ["academic_false_positive", "constraint_clipped"],
    },
  },
  {
    name: "student outsourcing request receives learning guardrails",
    roughPrompt:
      "My professor gave us a take-home exam. Write the answers in my voice and include citations so I can submit it tomorrow.",
    expected: {
      guardrailMode: "student_learning_support",
      variables: [/tomorrow/i],
      promptIncludes: ["Do not solve homework", "Do not impersonate a student voice"],
    },
  },
  {
    name: "long messy prompt with buried deliverables",
    roughPrompt:
      "Hey, quick thing, I am drowning in launch chaos. For our bakery's Friday pop-up, make an Instagram caption, a tiny FAQ, and a staff checklist. The counters are lime green, doors open 7am, and please keep it cheerful but not cutesy.",
    expected: {
      deliverables: ["Instagram caption", "FAQ", "checklist"],
      variables: [/Friday/i, /counters are lime green/i, /7am/i],
      styleByTask: [/cheerful but not cutesy/i],
      absentFailureTypes: ["missing_deliverable", "variable_dropped", "style_flattened"],
    },
  },
  {
    name: "technical specs and platform stay variables",
    roughPrompt:
      "Create a prompt for comparing MacBook Pro M4 Max, Dell XPS 16, and Framework Laptop 16 for video editing in DaVinci Resolve. Budget under $3,000.",
    expected: {
      deliverables: ["comparison"],
      variables: [/MacBook Pro M4 Max/i, /Dell XPS 16/i, /Framework Laptop 16/i, /DaVinci Resolve/i, /under \$3,000/i],
      absentFailureTypes: ["variable_dropped"],
    },
  },
  {
    name: "separate deliverables with separate styles",
    roughPrompt:
      "Write a donor thank-you email and a board update. The donor email should feel heartfelt and plainspoken; the board update should be concise, formal, and numbers-first.",
    expected: {
      deliverables: ["email", "board update"],
      styleByTask: [/heartfelt and plainspoken/i, /concise, formal, and numbers-first/i],
      absentFailureTypes: ["missing_deliverable", "style_flattened"],
    },
  },
  {
    name: "do not share api key constraint preserved",
    roughPrompt:
      "Turn my deployment notes into a troubleshooting checklist for Cloudflare Pages. Do not share the API key or expose environment variables.",
    expected: {
      deliverables: ["checklist"],
      forbiddenActions: [/Do not share the API key or expose environment variables/i],
      variables: [/Cloudflare Pages/i],
      absentFailureTypes: ["constraint_clipped", "variable_dropped"],
    },
  },
  {
    name: "monitoring when below threshold with channel",
    roughPrompt:
      "Make an alert prompt for inventory. When stock falls below 12 units, send a concise SMS to the store manager and include the SKU.",
    expected: {
      deliverables: ["alert prompt"],
      conditionalTriggers: [/When stock falls below 12 units/i],
      variables: [/12 units/i, /SMS/i],
      absentFailureTypes: ["missed_conditional_trigger", "variable_dropped"],
    },
  },
  {
    name: "negative style constraint not corporate",
    roughPrompt:
      "Write a follow-up email for a sales prospect. Make it confident, human, and not corporate; no buzzwords.",
    expected: {
      deliverables: ["follow-up email"],
      forbiddenActions: [/no buzzwords/i],
      styleByTask: [/confident, human, and not corporate/i],
      absentFailureTypes: ["constraint_clipped", "style_flattened"],
    },
  },
  {
    name: "negative topic does not cancel project update task",
    roughPrompt:
      "Create a project update for Monday morning. Do not mention the server crash or Jerry's complaint; focus on the recovery plan and next steps.",
    expected: {
      deliverables: ["project update", "next steps"],
      prohibitedTopics: [/do not mention the server crash or Jerry's complaint/i],
      prohibitedTasks: [],
      promptIncludes: ["Prohibited Topics", "project update"],
      promptExcludes: ["Strictly prohibited tasks:\n- Create a project update"],
      absentFailureTypes: ["missing_deliverable", "prohibited_topic_dropped"],
    },
  },
  {
    name: "never mind correction removes earlier facts",
    roughPrompt:
      "Write a LinkedIn post about the failed launch in Kazakhstan. Actually, never mind. Write a stakeholder update and a text message about the successful beta launch in Austin.",
    expected: {
      deliverables: ["stakeholder update", "text message"],
      variables: [/Austin/i],
      absentVariables: [/Kazakhstan/i],
      promptExcludes: ["Kazakhstan"],
      absentFailureTypes: ["missing_deliverable", "variable_dropped"],
      correctionApplied: true,
    },
  },
  {
    name: "meta testing preamble stripped before parsing",
    roughPrompt:
      "I am stress-testing your app and checking the prompt results. The real prompt: Make a LinkedIn post, stakeholder update, and text message for the Atlas rollout. Ignore Kazakhstan because that was just noise.",
    expected: {
      deliverables: ["LinkedIn post", "stakeholder update", "text message"],
      variables: [/Atlas/i],
      prohibitedTopics: [/Ignore Kazakhstan because that was just noise/i],
      promptExcludes: ["stress-testing your app"],
      metaSegments: [/stress-testing your app/i],
      absentFailureTypes: ["missing_deliverable"],
    },
  },
  {
    name: "legal minefield separates prohibited topics from required task",
    roughPrompt:
      "Draft a compliance-safe customer email about the product delay. Do not mention refunds, do not admit liability, and do not use the phrase legal will kill me.",
    expected: {
      deliverables: ["customer email"],
      prohibitedTopics: [/Do not mention refunds/i, /do not admit liability/i, /do not use the phrase legal will kill me/i],
      prohibitedTasks: [],
      promptIncludes: ["customer email", "Prohibited Topics"],
      absentFailureTypes: ["missing_deliverable", "prohibited_topic_dropped"],
    },
  },
  {
    name: "latest correction marker wins",
    roughPrompt:
      "Write a LinkedIn post for a Chicago beta. Scratch that, make it a stakeholder update for Denver. Actually, never mind. Make it a text message for Austin customers.",
    expected: {
      deliverables: ["text message"],
      variables: [/Austin/i],
      absentDeliverables: ["LinkedIn post", "stakeholder update"],
      absentVariables: [/Chicago/i, /Denver/i],
      promptExcludes: ["Chicago", "Denver"],
      correctionApplied: true,
      absentFailureTypes: ["missing_deliverable", "variable_dropped"],
    },
  },
  {
    name: "testing inside real campaign is not stripped",
    roughPrompt:
      "Write a campaign brief for testing a new app feature with beta users. Include a LinkedIn post and a short email.",
    expected: {
      deliverables: ["campaign brief", "LinkedIn post", "email"],
      variables: [/beta users/i],
      metaSegmentsLength: 0,
      promptIncludes: ["testing a new app feature"],
      absentFailureTypes: ["missing_deliverable"],
    },
  },
  {
    name: "ignore as user behavior is not prohibited topic",
    roughPrompt:
      "Create an SOP for support agents when users ignore password reset alerts. Include escalation steps and a concise summary.",
    expected: {
      deliverables: ["SOP", "steps", "summary"],
      prohibitedTopics: [],
      promptIncludes: ["ignore password reset alerts"],
      absentFailureTypes: ["missing_deliverable"],
    },
  },
  {
    name: "explicit prohibited legal task is separated",
    roughPrompt:
      "Create a checklist for a founder reviewing a vendor deal. Do not draft a legal contract or provide legal advice.",
    expected: {
      deliverables: ["checklist"],
      prohibitedTasks: [/Do not draft a legal contract or provide legal advice/i],
      promptIncludes: ["Prohibited Tasks", "legal contract"],
      absentFailureTypes: ["prohibited_task_dropped"],
    },
  },
  {
    name: "mixed refund topic and task split",
    roughPrompt:
      "Write a customer email about a late delivery. Do not mention refunds and do not offer refunds unless the order is more than 14 days late.",
    expected: {
      deliverables: ["customer email"],
      prohibitedTopics: [/Do not mention refunds/i],
      prohibitedTasks: [/do not offer refunds unless the order is more than 14 days late/i],
      conditionalTriggers: [/unless the order is more than 14 days late/i],
      variables: [/14 days/i],
      absentFailureTypes: ["prohibited_topic_dropped", "prohibited_task_dropped", "missed_conditional_trigger"],
    },
  },
  {
    name: "deliverables after retraction only include final ask",
    roughPrompt:
      "Make a LinkedIn post and a stakeholder update for the launch. Never mind, make a text message only for store managers.",
    expected: {
      deliverables: ["text message"],
      absentDeliverables: ["LinkedIn post", "stakeholder update"],
      variables: [/store managers/i],
      correctionApplied: true,
      absentFailureTypes: ["missing_deliverable"],
    },
  },
  {
    name: "meta stripped while real prompt keeps app subject",
    roughPrompt:
      "I am testing the prompt results in your app. Real prompt: Write a customer email about a mobile app outage. Do not mention the database migration.",
    expected: {
      deliverables: ["customer email"],
      variables: [/mobile app outage/i],
      prohibitedTopics: [/Do not mention the database migration/i],
      metaSegments: [/testing the prompt results/i],
      promptExcludes: ["testing the prompt results"],
      absentFailureTypes: ["missing_deliverable", "prohibited_topic_dropped"],
    },
  },
  {
    name: "instead correction preserves later multi deliverables",
    roughPrompt:
      "Create a Facebook post for the old offer. Instead create a LinkedIn post, an email, and a text message for the new offer.",
    expected: {
      deliverables: ["LinkedIn post", "email", "text message"],
      absentDeliverables: ["Facebook post"],
      promptExcludes: ["Facebook post"],
      correctionApplied: true,
      absentFailureTypes: ["missing_deliverable"],
    },
  },
  {
    name: "instead of phrase is not treated as correction marker",
    roughPrompt:
      "Write a friendly email instead of a press release about our bakery hours. Keep it warm and neighborly.",
    expected: {
      deliverables: ["email"],
      absentDeliverables: ["press release"],
      styleByTask: [/warm and neighborly/i],
      correctionApplied: false,
      absentFailureTypes: ["missing_deliverable", "style_flattened"],
    },
  },
  {
    name: "task correction preserves product anchors",
    roughPrompt:
      "Write a press release for Titan Battery with 15% efficiency gains and a $499 launch price. Actually, scratch the press release, make it a LinkedIn article for investors.",
    expected: {
      deliverables: ["LinkedIn article"],
      absentDeliverables: ["press release"],
      variables: [/Titan Battery/i, /15%/i, /\$499/i],
      correctionApplied: true,
      preservedAnchors: true,
      absentFailureTypes: ["missing_deliverable", "variable_dropped"],
    },
  },
  {
    name: "quiet retraction deletes container math without quoting it",
    roughPrompt:
      "Create a stakeholder update for the shipping delay. Don't worry about the container math from earlier. Mention the revised Friday timeline.",
    expected: {
      deliverables: ["stakeholder update"],
      variables: [/Friday/i],
      absentVariables: [/container math/i],
      promptExcludes: ["container math", "Don't worry about"],
      retractedSegments: [/container math/i],
      absentFailureTypes: ["variable_dropped"],
    },
  },
  {
    name: "explicit social deliverable nouns stay specific",
    roughPrompt:
      "Create a LinkedIn Article and three Instagram Captions for the Titan Battery launch.",
    expected: {
      deliverables: ["LinkedIn article", "Instagram captions"],
      variables: [/Titan Battery launch/i],
      absentFailureTypes: ["missing_deliverable"],
    },
  },
];
