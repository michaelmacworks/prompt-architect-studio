# Prompt Architect Studio

Prompt Architect Studio is a Vite React SaaS MVP that turns rough user prompts into structured, model-aware prompts for GPT-5.5, Claude, and Gemini.

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
