# Project Structure

This project should stay organized around a simple Vite + Cloudflare Pages layout.

```text
prompt-architect-studio/
  docs/
    README.md
    PRODUCT_STRATEGY.md
    PROJECT_STRUCTURE.md
  functions/
    api/
      architect.js
  public/
  src/
    main.jsx
    styles.css
  index.html
  package.json
  package-lock.json
  vite.config.js
```

## Folder Purposes

### `docs/`

Planning and source-of-truth documents. Product, design, development, and deployment thinking should live here.

### `src/`

React frontend source files. Keep user-facing components, styles, and frontend logic here.

Current files:

- `main.jsx` - React app and UI logic.
- `styles.css` - global styling for the MVP.

As the app grows, split this into:

```text
src/
  components/
  data/
  styles/
  main.jsx
```

Only split when the current files become hard to work with.

### `functions/`

Cloudflare Pages Functions. API endpoints live here.

Current endpoint:

- `functions/api/architect.js` - prompt transformation endpoint.

### `public/`

Static files copied directly into the production build. Use this for favicons, images, and Cloudflare static config files.

### Root Files

Root files should be limited to app configuration and package metadata:

- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `.gitignore`

## Cleanliness Rules

- Keep product and design notes in `docs/`, not the project root.
- Keep API code in `functions/`, not `src/`.
- Keep frontend code in `src/`, not root.
- Do not add new folders until there is a real need.
- Do not split components just to look organized; split when it improves clarity.
- Avoid storing generated build output in planning conversations unless deployment requires it.
