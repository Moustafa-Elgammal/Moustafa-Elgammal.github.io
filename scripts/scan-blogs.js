#!/usr/bin/env node
// Run from repo root: node scripts/scan-blogs.js
// Scans blog/*.html, reads metadata, writes blog/index.json (newest first).

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../blog');
const output  = path.join(blogDir, 'index.json');

function meta(html, name) {
  const re = new RegExp(
    `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']|` +
    `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`,
    'i'
  );
  const m = html.match(re);
  return m ? (m[1] || m[2]) : null;
}

function title(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  if (!m) return null;
  return m[1]
    .replace(/&mdash;/gi, '—').replace(/&ndash;/gi, '–')
    .replace(/\s*[—–\-]+\s*Moustafa Elgammal\s*$/i, '')
    .trim();
}

const files = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.html'))
  .sort();

const articles = files
  .map(file => {
    const html    = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const dateIso = meta(html, 'blog:date-iso');
    // Only treat files with a blog:date-iso meta tag as articles.
    // This excludes listing pages like index.html.
    if (!dateIso) return null;
    const aiRaw = meta(html, 'blog:ai-generated');
    return {
      file,
      title:       title(html),
      description: meta(html, 'description'),
      category:    meta(html, 'blog:category'),
      date:        meta(html, 'blog:date'),
      dateIso,
      readTime:    meta(html, 'blog:readtime'),
      aiGenerated: aiRaw === 'true' ? true : undefined,
      aiTool:      meta(html, 'blog:ai-tool')  || undefined,
      license:     meta(html, 'blog:license')  || undefined,
    };
  })
  .filter(Boolean)
  .sort((a, b) => {
    // newest first; fall back to filename order if no dateIso
    if (a.dateIso && b.dateIso) return b.dateIso.localeCompare(a.dateIso);
    return 0;
  });

// ── blog/index.json ──────────────────────────────────────────────────────────
fs.writeFileSync(output, JSON.stringify(articles, null, 2) + '\n');
console.log(`Wrote ${articles.length} article(s) to blog/index.json`);
articles.forEach(a => console.log(`  [${a.dateIso || '?'}] ${a.file} — ${a.title}`));

// ── sitemap.xml ───────────────────────────────────────────────────────────────
const SITE = 'https://elgx.me';
const today = new Date().toISOString().slice(0, 10);

const sitemapUrls = [
  { loc: `${SITE}/`,            lastmod: today,   priority: '1.0' },
  { loc: `${SITE}/blog/`,       lastmod: today,   priority: '0.9' },
  ...articles.map(a => ({
    loc:      `${SITE}/blog/${a.file}`,
    lastmod:  a.dateIso || today,
    priority: '0.8',
  })),
];

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapUrls.map(u =>
    `  <url>\n` +
    `    <loc>${u.loc}</loc>\n` +
    `    <lastmod>${u.lastmod}</lastmod>\n` +
    `    <priority>${u.priority}</priority>\n` +
    `  </url>`
  ).join('\n') +
  `\n</urlset>\n`;

const sitemapPath = path.join(__dirname, '../sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml);
console.log(`Updated sitemap.xml (${sitemapUrls.length} URLs)`);
