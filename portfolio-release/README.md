# Prompt Architect Studio release

Tool-first deterministic brief builder. No AI service, API function, secret, account, or app storage required.

Build: `npm ci && PAS_RELEASE=production npm run build`
Cloudflare Pages build root: `portfolio-release`; build command: `PAS_RELEASE=production npm run build`; output: `dist-production`.

Local preview uses the separate noindex `dist` build. Production output is prerendered HTML, bundled React/CSS, and local static assets with canonical metadata, robots, sitemap and truthful schema. Preserve the Cloudflare previous production deployment for rollback.
