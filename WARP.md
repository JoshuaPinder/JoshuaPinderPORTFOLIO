# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This repo contains a static portfolio site for Joshua Pinder (BSc Computer Science (AI), Plymouth University).
All site files live under `Portfolio/` and are plain HTML, CSS, and JavaScript with no build tooling or test framework configured.

## How to run / preview the site

All commands assume the git root of this repo.

- Change into the site directory:
  - PowerShell: `cd Portfolio`
- Quick preview by opening directly in a browser:
  - Open `Portfolio/index.html` in a browser (no server required, though some features like `navigator.clipboard` work best over HTTP/HTTPS).
- Serve via a simple local HTTP server (recommended for realistic behavior):
  - If Python is available: `cd Portfolio; python -m http.server 8000`
    - Then open `http://localhost:8000/index.html`.

There are **no** project-specific commands for build, lint, or tests defined (no `package.json`, `Makefile`, or similar).
Any additional tooling (formatters, linters, test runners) must be added explicitly before use.

## Code and file structure

High-level layout:

- `README.md` – short repository description.
- `Portfolio/` – root for the static site.
  - `index.html` – main landing page summarising skills and featuring highlighted projects.
  - `projects.html` – project index, grouped into “Featured”, “Web & Applications”, and “Systems & Low-level” sections.
  - `project-*.html` – individual detail pages for key projects:
    - `project-wyttle.html`
    - `project-trail-microservices.html`
    - `project-restaurant-app.html`
    - `project-password-manager.html`
  - `assets/` – shared assets for all pages:
    - `styles.css` – global styling, layout, and component classes.
    - `main.js` – small behavior layer (nav highlighting + copy-email helper).

## Frontend architecture

This is a purely static, multi-page site with light shared behavior:

- **Layout & components (`Portfolio/assets/styles.css`)**
  - Defines a dark theme with CSS custom properties (color palette, shadows) and a glassmorphism-like background.
  - Provides layout primitives:
    - `.container` for centered, max-width content.
    - CSS grid utilities `.grid`, `.col-4`, `.col-6`, `.col-8`, `.col-12` for responsive columns.
    - `.card`, `.card.pad` for reusable card UI used across hero, project tiles, and detail sections.
  - Navigation and buttons:
    - Sticky `<header>` with `.nav` for top navigation.
    - `.navlinks a.active` is styled as the active route; class is set at runtime by `main.js`.
    - `.button` / `.button.primary` standardise CTAs across pages.
  - Reusable presentation helpers:
    - `.project`, `.tag`, `.chip`, `.stack`, `.pillrow`, `.notice`, `.muted`, `.small`, and `.footer` classes define project cards, badges, chip-style tech tags, and footer styling.

- **Behavior (`Portfolio/assets/main.js`)**
  - Immediately-invoked function that attaches simple, global behaviors on page load.
  - **Active nav link highlighting**:
    - Computes the current path from `location.pathname` and compares it to each `[data-nav]` link's `href`.
    - Adds `.active` to the link whose `href` ends with the current file name (e.g. `index.html`, `projects.html`).
    - All pages include matching `data-nav` attributes in their navigation markup so the same script works everywhere.
  - **Copy email button** (on `index.html`):
    - Looks for an element with `[data-copy-email]` and, if present, adds a click listener.
    - Attempts to copy the email from `data-copy-email` to the clipboard via `navigator.clipboard.writeText`.
    - On success, temporarily changes the button text to “Email copied ✅”, then reverts to “Copy email”.
    - On failure (e.g. clipboard unavailable), falls back to `mailto:` navigation.
    - Note: the visible contact email for recruiters is the `mailto:` link under the “Contact” section; the `data-copy-email` attribute is the value copied by the button.

## Page responsibilities

- **`Portfolio/index.html`**
  - Primary entry point and summary for recruiters.
  - Contains:
    - Hero section with headline, short profile, and quick tech-stack snapshot.
    - “Featured projects” grid that links to individual project pages and, where relevant, public GitHub repos.
    - “Contact” card with email and GitHub links; footer notes Cloudflare Pages hosting.
  - Includes the dynamic year script to keep the copyright year current.

- **`Portfolio/projects.html`**
  - Structured catalogue of work broken into sections (“Featured”, “Web & Applications”, “Systems & Low-level”).
  - Each project card either links to a local `project-*.html` page or acts as a placeholder (“Add screenshots later”, “Upload report later”) to be filled in with more detail.
  - Shares the same navigation, styling, and year-updating pattern as `index.html`.

- **`Portfolio/project-*.html` pages**
  - Each page focuses on a single project with consistent layout:
    - Top card summarising the project, stack chips, and a link to the external GitHub repo (where available).
    - Secondary section with two-column layout: overview / key features, and “what to highlight” or similar narrative.
  - Designed so content can be iteratively enriched (screenshots, diagrams, more detailed responsibilities) without changing overall structure.

## Notes for future agents working in this repo

- There is no bundler or framework: changes to HTML/CSS/JS take effect immediately when reloading in the browser or static server.
- When adding new pages:
  - Place them under `Portfolio/`.
  - Reuse the existing `<header>`, `<footer>`, and container/card/grid classes to maintain visual consistency.
  - Ensure nav links that should be highlighted include `data-nav` and an `href` that ends with the page filename so `main.js` can set `.active` correctly.
- When editing navigation or contact details, update them consistently across:
  - `index.html` (hero buttons and `#contact` section).
  - `projects.html` (nav links).
  - All `project-*.html` headers.
- If you introduce new tooling (e.g. Node-based build, CSS preprocessor, tests), update this `WARP.md` with the concrete commands so future agents know the canonical way to build, lint, and test.