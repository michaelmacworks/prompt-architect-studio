# Prompt Architect Studio

Prompt Architect Studio is a Vite React SaaS MVP that turns rough user prompts into structured, model-aware prompts for current GPT, Claude, and Gemini models.

The app is designed for everyday AI users, small business owners, marketers, creators, educators, consultants, and professionals who want better outputs without learning prompt engineering.

## Local Development

```bash
npm install
npm run dev
```

Local app:

```text
http://127.0.0.1:5173/
```

The plain Vite dev server does not run Cloudflare Pages Functions. To test the live `/api/architect`
endpoint locally, use:

```bash
npm run pages:dev
```

## AI Engine

The API uses a hybrid engine:

- A deterministic parser extracts deliverables, constraints, variables, style cues, and guardrails.
- If `OPENAI_API_KEY` is configured, the Pages Function sends the parsed request to OpenAI for stronger prompt generation.
- The local critique/repair pass checks the provider output so required details and constraints are not dropped.
- If the provider is unavailable or no key is configured, the endpoint falls back to the deterministic prompt.

Environment variables:

- `OPENAI_API_KEY` - required for provider-backed generation.
- `OPENAI_MODEL` - optional; defaults to `gpt-5.6`.

Current target-model presets:

- `GPT-5.6 Sol`
- `Claude Fable 5`
- `Claude Sonnet 5`
- `Gemini 3.7 Flash`

The API still accepts older labels such as `GPT-5.5`, `Claude`, `Claude Opus 4.8`, `Claude Sonnet 4.6`, `Gemini`, `Gemini 3.1 Pro`, and `Gemini 3.5 Flash` as aliases so existing callers do not break.

## Production Build

```bash
npm run build
```

The production output is written to:

```text
dist
```

## Cloudflare Pages

Recommended Cloudflare Pages settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Functions directory: `functions`

The API endpoint is implemented as a Cloudflare Pages Function:

```text
POST /api/architect
```

Static Cloudflare config lives in `public/` so Vite copies it into `dist`:

- `public/_headers`
- `public/_redirects`

## Project Docs

Planning and strategy documents live in `docs/`. Start with:

- `docs/README.md`
- `docs/PRODUCT_STRATEGY.md`
- `docs/DEVELOPMENT_PLAN.md`
- `docs/DEPLOYMENT.md`
