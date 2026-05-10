#!/usr/bin/env bash
# Usage: bash scripts/scan-blogs.sh
# Works from any directory inside the repo.
#
# Steps:
#   1. Scan blog/*.html → blog/index.json
#   2. Generate sitemap.xml from blog/index.json

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# ── 1. Scan blogs ─────────────────────────────────────────────────────────────
echo "→ Scanning blogs in ${REPO_ROOT}/blog/"
node "${REPO_ROOT}/scripts/scan-blogs.js"

# ── 2. Generate sitemap.xml ───────────────────────────────────────────────────
echo "→ Generating sitemap.xml…"

REPO_ROOT="${REPO_ROOT}" node <<'EOF'
const fs      = require('fs');
const path    = require('path');
const root    = process.env.REPO_ROOT;
const SITE    = 'https://elgx.me';
const today   = new Date().toISOString().slice(0, 10);

const articles = JSON.parse(
  fs.readFileSync(path.join(root, 'blog/index.json'), 'utf8')
);

const urls = [
  { loc: `${SITE}/`,      lastmod: today, priority: '1.0' },
  { loc: `${SITE}/blog/`, lastmod: today, priority: '0.9' },
  ...articles.map(a => ({
    loc:      `${SITE}/blog/${a.file}`,
    lastmod:  a.dateIso || today,
    priority: '0.8',
  })),
];

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u =>
    `  <url>\n` +
    `    <loc>${u.loc}</loc>\n` +
    `    <lastmod>${u.lastmod}</lastmod>\n` +
    `    <priority>${u.priority}</priority>\n` +
    `  </url>`
  ).join('\n') +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`  Wrote ${urls.length} URLs → sitemap.xml`);
urls.forEach(u => console.log(`    ${u.priority}  ${u.loc}`));
EOF

echo "✓ Done"
