# Deployment

## Target Platform

Prompt Architect Studio is prepared for Cloudflare Pages.

## GitHub Repository

```text
https://github.com/michaelmacworks/prompt-architect-studio.git
```

## Cloudflare Pages Settings

Use these settings when connecting the GitHub repository to Cloudflare Pages:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Functions directory: `functions`

## Runtime Pieces

Frontend:

- Vite React app in `src/`
- Static assets in `public/`
- Production output in `dist/`

Backend:

- Cloudflare Pages Function at `functions/api/architect.js`
- Public route: `POST /api/architect`
- Hybrid prompt engine with deterministic fallback and optional OpenAI generation.

## Environment Variables

Set these in Cloudflare Pages before using the model-backed engine:

- `OPENAI_API_KEY` - required for OpenAI-backed prompt generation.
- `OPENAI_MODEL` - optional; defaults to `gpt-5.5`.

If `OPENAI_API_KEY` is missing or the provider request fails, `/api/architect` returns the deterministic rule-based prompt instead of failing the user request.

## Routing

The app uses client-side subpages such as `/trust`, `/frameworks`, and `/use-cases`.

`public/_redirects` maps those routes back to `index.html` so direct visits work after deployment.

## Headers

`public/_headers` adds basic browser security headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Pre-Deploy Checklist

Before deploying:

1. Run `npm install`.
2. Run `npm run build`.
3. Confirm `dist/` is generated.
4. Confirm `_headers` and `_redirects` appear inside `dist/`.
5. Confirm `/api/architect` works in Cloudflare Pages preview.
6. Set `OPENAI_API_KEY` if the deployed app should use model-backed generation.
7. Review trust/privacy copy before public launch.

## Current MVP Notes

- No login.
- No saved prompt history.
- No database.
- OpenAI-backed generation is available when `OPENAI_API_KEY` is configured.
- The deterministic Pages Function remains the fallback path when OpenAI is unavailable.
