# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Moustafa Elgammal, hosted on GitHub Pages at `elgx.me` (configured via `CNAME`). Plain static site — no build tooling, no package manager, no framework.

## Development

The Writing section on the homepage uses `fetch('blog/index.json')`, so it requires an HTTP server (not `file://`). Use:

```bash
npx serve .          # or
python -m http.server
```

Deploy by pushing to `master`.

## Architecture

- `index.html` — single-page portfolio. The Writing section is rendered dynamically by JS fetching `blog/index.json`.
- `css/normalize.css` — cross-browser reset (do not edit).
- `css/app.css` — complete design system: CSS variables, dark mode, layout, all component styles. This is the only stylesheet to edit for visual changes.
- `blog/index.json` — auto-generated manifest of all articles (sorted newest first). Regenerate with `node scripts/scan-blogs.js` after adding a new post.
- `scripts/scan-blogs.js` — Node.js scanner (no dependencies). Reads `blog/*.html`, extracts metadata, writes `blog/index.json`.

## Adding a blog article

1. Create `blog/<slug>.html` as a full HTML page — copy `blog/effective_leadership_blog.html` as a template.
2. Set these `<meta>` tags in the `<head>`:
   ```html
   <meta name="description"       content="One-sentence summary.">
   <meta name="blog:category"     content="Category label">
   <meta name="blog:date"         content="Month YYYY">
   <meta name="blog:date-iso"     content="YYYY-MM-DD">
   <meta name="blog:readtime"     content="N min read">
   <!-- for AI-generated posts: -->
   <meta name="blog:ai-generated" content="true">
   <meta name="blog:ai-tool"      content="Claude">
   <meta name="blog:license"      content="CC BY 4.0">
   ```
3. If AI-generated, include the `.ai-disclosure` block and `.article-license-footer` in the HTML (already in the template).
4. Run `node scripts/scan-blogs.js` to regenerate `blog/index.json`.
5. Commit both the new HTML file and the updated `blog/index.json`.

## Licenses

Dual-licensed — see `LICENSE.txt`:
- **MIT** for site code (CSS, JS, HTML structure)
- **CC BY 4.0** for blog content (`/blog`)

AI-generated articles carry a visible `.ai-disclosure` block (⚡ banner between meta and hero) and a `.article-license-footer`. The homepage card shows a small **Claude** badge pulled from `aiTool` in `blog/index.json`.

## Dark mode

`body.dark` class toggled by `toggleMode()` in each page's inline `<script>`. Persisted via `localStorage` key `mode`. All theming is driven by CSS variables in `app.css` (`:root` for light, `body.dark` for dark).
