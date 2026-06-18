import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const siteUrl = "https://promptarchitectstudio.com";
const defaultSeo = {
  title: "Prompt Architect Studio | Model-Ready AI Prompt Builder",
  description:
    "Prompt Architect Studio turns rough ideas into structured, model-ready prompts for current GPT, Claude, Gemini, and other leading AI tools.",
};

const routeSeo = {
  "/": defaultSeo,
  "/studio": {
    title: "Prompt Studio | Prompt Architect Studio",
    description:
      "Paste a rough idea, choose a prompt framework, select a target model, and generate a copy-ready AI prompt.",
  },
  "/how-it-works": {
    title: "How Prompt Architect Studio Works",
    description:
      "See how Prompt Architect Studio turns messy notes into structured prompts with clearer context, constraints, and output format.",
  },
  "/frameworks": {
    title: "AI Prompt Frameworks | Prompt Architect Studio",
    description:
      "Use Dynamic, CO-STAR, RTF, RASC, and Agentic-Goal prompt styles to shape better instructions for AI models.",
  },
  "/use-cases": {
    title: "AI Prompt Builder Use Cases | Prompt Architect Studio",
    description:
      "Explore prompt-building use cases for everyday AI users, small businesses, marketers, creators, and educators.",
  },
  "/trust": {
    title: "Trust and Privacy | Prompt Architect Studio",
    description:
      "Review Prompt Architect Studio's MVP privacy posture, data-safety guidance, and responsible-use reminders.",
  },
};

const frameworks = [
  {
    value: "Dynamic",
    name: "Dynamic",
    outcome: "Auto Execute",
    bestFor: "When you are not sure which structure fits.",
    description: "Adapts the prompt shape to the task, then makes intent, context, and output format visible.",
  },
  {
    value: "CO-STAR",
    name: "CO-STAR",
    outcome: "Audience Fit",
    bestFor: "Audience-aware content and communication.",
    description: "Organizes prompts around context, objective, style, tone, audience, and response.",
  },
  {
    value: "RTF",
    name: "RTF",
    outcome: "Quick Task",
    bestFor: "Direct execution and quick work outputs.",
    description: "Keeps the prompt focused on role, task, and format when speed matters.",
  },
  {
    value: "RASC",
    name: "RASC",
    outcome: "Precision",
    bestFor: "Process-heavy work and constraints.",
    description: "Defines role, action, steps, and constraints for plans, SOPs, and research workflows.",
  },
  {
    value: "Agentic-Goal",
    name: "Agentic-Goal",
    outcome: "Deep Strategy",
    bestFor: "Autonomous or multi-step tasks.",
    description: "Sets mission, autonomy, plan, checkpoints, and completion criteria for deeper work.",
  },
];

const models = [
  {
    value: "GPT-5.5",
    description: "OpenAI flagship shaping for complex reasoning, coding, clear deliverables, and production-ready output.",
  },
  {
    value: "Claude Fable 5",
    description: "Anthropic's top widely released Claude shaping for demanding reasoning, long-horizon goals, and nuance.",
  },
  {
    value: "Claude Sonnet 4.6",
    description: "Claude shaping for speed, clarity, visible constraints, and dependable everyday work.",
  },
  {
    value: "Gemini 3.5 Flash",
    description: "Gemini shaping for grounded sections, tables, agentic tasks, coding, and scan-friendly structure.",
  },
];

const examples = [
  "Write a friendly email announcing new weekend hours for my neighborhood bakery.",
  "Help me turn scattered notes into a simple weekly plan I can actually follow.",
  "Create a prompt for comparing three options before I buy new software for my shop.",
  "Turn messy client notes into a clear marketing action plan.",
  "Create a prompt for converting raw meeting notes into decisions, owners, risks, and next steps.",
];

const workflowSteps = [
  ["Paste a rough idea", "Start with the messy version. Notes, fragments, or a half-formed task are enough."],
  ["Choose a framework", "Use Dynamic by default, or pick CO-STAR, RTF, RASC, or Agentic-Goal for a known shape."],
  ["Select your model", "Tune the prompt for GPT-5.5, Claude Fable/Sonnet, or Gemini 3.5 before you run it."],
  ["Copy the result", "Take the structured prompt into your AI tool and use it as your next instruction."],
];

const useCases = [
  ["Everyday AI users", "Emails, plans, summaries, research prompts, rewrites, and decisions that need clearer instructions."],
  ["Small businesses", "Customer updates, service descriptions, local promotions, hiring notes, and practical operating checklists."],
  ["Marketers", "Campaign briefs, landing page direction, content calendars, audience research, and message tests."],
  ["Creators and educators", "Newsletters, scripts, lesson outlines, explainers, workshops, and audience-aware content."],
];

const footerPages = [
  ["Home", "/"],
  ["Studio", "/studio"],
  ["How it works", "/how-it-works"],
  ["Frameworks", "/frameworks"],
  ["Use cases", "/use-cases"],
  ["Trust", "/trust"],
];

const subpages = {
  "/studio": {
    eyebrow: "Studio",
    title: "Paste the rough version and transform it.",
    intro:
      "The studio is the core workbench: one large input, a prompt style, a target model, and a copy-ready output.",
    cta: ["Open the workbench", "/#studio"],
    sections: [
      ["Rough input", "Start with notes, fragments, or a half-formed task. The app is designed for imperfect context."],
      ["Prompt style", "Auto Execute is the default. Power users can choose a more specific outcome style."],
      ["Model-ready output", "The generated prompt is formatted so it can be pasted into your selected target model."],
    ],
  },
  "/how-it-works": {
    eyebrow: "How it works",
    title: "A simple path from rough thought to usable instruction.",
    intro:
      "Prompt Architect Studio keeps the process short: paste the messy version, choose the shape, tune for a model, and copy the result.",
    cta: ["Start architecting", "/#studio"],
    sections: workflowSteps,
  },
  "/frameworks": {
    eyebrow: "Frameworks",
    title: "Outcome styles for different kinds of work.",
    intro:
      "The app exposes friendly outcome labels while preserving the underlying prompt frameworks for structure and consistency.",
    cta: ["Try a framework", "/#studio"],
    sections: frameworks.map((item) => [
      `${item.outcome} (${item.name})`,
      `${item.bestFor} ${item.description}`,
    ]),
  },
  "/use-cases": {
    eyebrow: "Use cases",
    title: "Built for repeatable work, not prompt theory.",
    intro:
      "The strongest use cases are everyday moments where a better prompt reduces rework and makes the model easier to steer.",
    cta: ["Load an example", "/#studio"],
    sections: useCases,
  },
  "/trust": {
    eyebrow: "Trust",
    title: "Use the tool with care.",
    intro:
      "This MVP has no account and no saved prompt history. When AI generation is enabled, prompts are processed by an AI/API provider to generate the result.",
    cta: ["Return to the studio", "/#studio"],
    sections: [
      ["Privacy posture", "Do not paste passwords, API keys, confidential client data, regulated data, or private personal information."],
      ["AI processing", "Prompts may be sent to OpenAI for generation, then checked locally against the app's preservation and guardrail rules."],
      ["Output responsibility", "Generated prompts are provided as-is and should be reviewed before use."],
      ["Future policy page", "A full privacy, disclaimer, and terms page should be added before public launch."],
    ],
  },
};

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [roughPrompt, setRoughPrompt] = useState("");
  const [framework, setFramework] = useState("Dynamic");
  const [targetModel, setTargetModel] = useState("GPT-5.5");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleNavigation = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  useEffect(() => {
    applyRouteMetadata(path);
  }, [path]);

  const cleanPrompt = roughPrompt.trim();
  const canSubmit = cleanPrompt.length >= 8 && !isLoading;

  const selectedFramework = useMemo(
    () => frameworks.find((item) => item.value === framework) || frameworks[0],
    [framework],
  );

  const selectedModel = useMemo(
    () => models.find((item) => item.value === targetModel) || models[0],
    [targetModel],
  );

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    setError("");
    setResult("");
    setCopied(false);

    try {
      const response = await fetch("/api/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roughPrompt: cleanPrompt, framework, targetModel }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "The architect endpoint could not transform this prompt.");
      }

      setResult(payload.prompt);
    } catch (requestError) {
      setError(requestError.message || "The architect endpoint is unavailable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Copy failed. Select the generated prompt and copy it manually.");
    }
  }

  function loadExample() {
    const nextExample = examples[Math.floor(Math.random() * examples.length)];
    setRoughPrompt(nextExample);
    setError("");
    setCopied(false);
  }

  const subpage = subpages[path];

  if (subpage) {
    return (
      <main className="page-shell">
        <SiteHeader />
        <section className="subpage-hero" aria-labelledby="subpage-title">
          <p className="eyebrow">{subpage.eyebrow}</p>
          <h1 id="subpage-title">{subpage.title}</h1>
          <p>{subpage.intro}</p>
          <a className="primary-link" href={subpage.cta[1]}>
            {subpage.cta[0]}
          </a>
        </section>
        <section className="subpage-content" aria-label={`${subpage.eyebrow} details`}>
          {subpage.sections.map(([title, text], index) => (
            <article className="subpage-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="page-shell">
      <SiteHeader />

      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Model-aware prompt workbench</p>
          <h1 id="hero-title">Turn messy ideas into model-ready prompts.</h1>
          <p className="hero-lede">
            Choose a framework, choose a current model family, and get a structured prompt you can paste into
            GPT-5.5, Claude Fable or Sonnet, or Gemini 3.5 Flash.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#studio">
              Start Architecting
            </a>
            <a className="secondary-link" href="#how">
              See How It Works
            </a>
          </div>
        </div>

        <div className="prompt-preview" aria-label="Before and after prompt example">
          <div className="preview-card before-card">
            <span>Paste the rough version</span>
            <p>“Make this client note into a useful marketing plan.”</p>
          </div>
          <div className="preview-arrow" aria-hidden="true">
            -&gt;
          </div>
          <div className="preview-card after-card">
            <span>Model-ready prompt</span>
            <p>Role, task, context, assumptions, constraints, output format, and completion criteria.</p>
          </div>
        </div>
      </section>

      <section className="studio-section" id="studio" aria-labelledby="studio-title">
        <div className="section-heading">
          <p className="eyebrow">Studio</p>
          <h2 id="studio-title">Paste the rough version.</h2>
          <p>
            Build the prompt before you run the model. Prompt Architect Studio turns loose context into a
            clearer brief for the model you plan to use.
          </p>
        </div>

        <form className="studio-grid" onSubmit={handleSubmit}>
          <div className="input-panel">
            <div className="panel-topline">
              <label htmlFor="rough-prompt">Rough prompt</label>
              <button className="text-button" type="button" onClick={loadExample}>
                Load example
              </button>
            </div>

            <textarea
              id="rough-prompt"
              value={roughPrompt}
              onChange={(event) => setRoughPrompt(event.target.value)}
              placeholder="Paste the messy prompt, idea, or half-formed task you want to upgrade..."
              rows={9}
            />

            <div className="input-meta">
              <span>{cleanPrompt.length} characters</span>
              <span>{canSubmit ? "Ready to architect" : "Enter at least 8 characters"}</span>
            </div>

            <p className="privacy-note">
              Do not paste passwords, API keys, private client data, or sensitive personal information.
            </p>

            <div className="control-area">
              <fieldset>
                <legend>Prompt style</legend>
                <div className="framework-picker">
                  {frameworks.map((item) => (
                    <button
                      className={framework === item.value ? "choice-button active" : "choice-button"}
                      key={item.value}
                      type="button"
                      onClick={() => setFramework(item.value)}
                    >
                      <span>{item.outcome}</span>
                      <small>{item.name}</small>
                    </button>
                  ))}
                </div>
                <p className="helper-text">
                  <strong>{selectedFramework.bestFor}</strong> {selectedFramework.description}
                </p>
              </fieldset>

              <fieldset>
                <legend>Target model</legend>
                <div className="model-picker">
                  {models.map((item) => (
                    <label className={targetModel === item.value ? "model-choice active" : "model-choice"} key={item.value}>
                      <input
                        type="radio"
                        name="target-model"
                        value={item.value}
                        checked={targetModel === item.value}
                        onChange={() => setTargetModel(item.value)}
                      />
                      <span>{item.value}</span>
                    </label>
                  ))}
                </div>
                <p className="helper-text">{selectedModel.description}</p>
              </fieldset>
            </div>

            <button className="submit-button" type="submit" disabled={!canSubmit}>
              {isLoading ? "Transforming..." : "Transform Prompt"}
            </button>
          </div>

          <div className="output-panel" aria-live="polite" aria-label="Architected prompt output">
            <div className="panel-topline">
              <div>
                <span className="output-kicker">Output</span>
                <h3>Copy-ready prompt</h3>
              </div>
              <button className="copy-button" type="button" onClick={copyResult} disabled={!result}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {error && <p className="error-box">{error}</p>}

            <pre className={result ? "code-block has-result" : "code-block"}>
              <code>
                {result ||
                  "Your model-ready prompt will appear here, ready to copy into your target model."}
              </code>
            </pre>
          </div>
        </form>
      </section>

      <section className="how-section" id="how" aria-labelledby="how-title">
        <div className="section-heading compact">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title">A simple path from rough thought to usable instruction.</h2>
        </div>
        <div className="step-grid">
          {workflowSteps.map(([title, text], index) => (
            <article className="step-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="framework-section" id="frameworks" aria-labelledby="frameworks-title">
        <div className="section-heading">
          <p className="eyebrow">Frameworks</p>
          <h2 id="frameworks-title">Outcome styles for different kinds of work.</h2>
          <p>
            Auto Execute is the safe default. The underlying frameworks stay available when the task needs a
            specific kind of thinking.
          </p>
        </div>
        <div className="framework-card-grid">
          {frameworks.map((item) => (
            <article className="framework-card" key={item.value}>
              <span>Best for</span>
              <h3>{item.outcome}</h3>
              <p className="framework-name">{item.name}</p>
              <p className="best-for">{item.bestFor}</p>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section" aria-labelledby="why-title">
        <div className="why-copy">
          <p className="eyebrow">Why it matters</p>
          <h2 id="why-title">Rough prompts hide the decisions models need.</h2>
          <p>
            Most prompt failures are not caused by bad ideas. They come from missing context, unclear
            constraints, invisible assumptions, and vague output expectations. Prompt Architect Studio makes
            those decisions visible before the model starts answering.
          </p>
        </div>
        <div className="anatomy-card">
          <span>Prompt anatomy</span>
          <ul>
            <li>Intent and task</li>
            <li>Role and context</li>
            <li>Constraints and assumptions</li>
            <li>Output format and completion criteria</li>
          </ul>
        </div>
      </section>

      <section className="use-case-section" id="use-cases" aria-labelledby="use-cases-title">
        <div className="section-heading compact">
          <p className="eyebrow">Use cases</p>
          <h2 id="use-cases-title">Built for repeatable work, not prompt theory.</h2>
        </div>
        <div className="use-case-grid">
          {useCases.map(([title, text]) => (
            <article className="use-case-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-section" aria-labelledby="trust-title">
        <div>
          <p className="eyebrow">Trust and privacy</p>
          <h2 id="trust-title">No account. No saved prompt history in this MVP.</h2>
        </div>
        <p>
          Prompts may be processed by an AI/API provider to generate your output. Keep secrets,
          regulated data, and confidential client details out of the input.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Prompt Architect Studio home">
        <span className="brand-mark">PA</span>
        <span>Prompt Architect Studio</span>
      </a>
      <nav className="site-nav" aria-label="Page sections">
        <a href="/how-it-works">How it works</a>
        <a href="/frameworks">Frameworks</a>
        <a href="/use-cases">Use cases</a>
        <a className="nav-cta" href="/#studio">Start</a>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a className="brand" href="/" aria-label="Prompt Architect Studio home">
            <span className="brand-mark">PA</span>
            <span>Prompt Architect Studio</span>
          </a>
          <p className="built-by">
            Built by{" "}
            <a href="https://michaeljmcateer.com" target="_blank" rel="noreferrer">
              Michael J McAteer
            </a>
          </p>
          <a className="footer-email" href="mailto:michael.mcateer@proton.me">
            michael.mcateer@proton.me
          </a>
        </div>

        <nav className="footer-links" aria-label="Footer pages">
          {footerPages.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="footer-disclaimer">
          <p>
            Basic disclaimer: do not paste sensitive, confidential, regulated, or private information.
            Prompts may be processed by an AI/API provider. Outputs are provided as-is and should be reviewed before use.
          </p>
          <p>
            Prompt Architect Studio is not responsible for decisions, claims, or actions taken from generated
            prompts. A full privacy and disclaimer page should be added before public launch.
          </p>
        </div>
      </div>
    </footer>
  );
}

function applyRouteMetadata(path) {
  const seo = routeSeo[path] || defaultSeo;
  const canonicalUrl = new URL(path === "/" ? "/" : path, siteUrl).href;
  const imageUrl = new URL("/og-image.png", siteUrl).href;

  document.title = seo.title;
  upsertMeta("name", "description", seo.description);
  upsertMeta("name", "robots", "index, follow");
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", "Prompt Architect Studio");
  upsertMeta("property", "og:title", seo.title);
  upsertMeta("property", "og:description", seo.description);
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:image", imageUrl);
  upsertMeta("property", "og:image:alt", "Prompt Architect Studio prompt workbench preview");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", seo.title);
  upsertMeta("name", "twitter:description", seo.description);
  upsertMeta("name", "twitter:image", imageUrl);
  upsertLink("canonical", canonicalUrl);
}

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

createRoot(document.getElementById("root")).render(<App />);
