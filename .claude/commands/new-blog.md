# /new-blog — Generate a new blog post

Generate a complete, publication-ready blog post for elgx.me following the exact
methodology and UI/UX design of `blog/effective_leadership_blog.html`.

**Usage:** `/new-blog <topic or title hint>`

If `$ARGUMENTS` is empty, ask the user for:
- Topic / working title
- One-sentence hook (what's the core provocation?)
- Category label (e.g. "Engineering Leadership", "Product", "Career")
- Estimated read time (6 / 8 / 10 / 12 min)

---

## Step-by-step process

1. **Plan** — Derive slug, final title, subtitle, hero quote, article outline, word-count target.
2. **Write** — Produce the full article content following the Writing Methodology below.
3. **Assemble** — Wrap content in the HTML Template below, filling every placeholder.
4. **Create file** — Write to `blog/<slug>.html`.
5. **Scan** — Run `bash scan-blogs.sh` (works from any directory) to update `blog/index.json`.
6. **Report** — Confirm both files and show the article URL path.

---

## Slug rules

- Lowercase, words separated by underscores.
- 3–5 meaningful words; drop articles/prepositions.
- Examples: `remote_work_future.html`, `hiring_senior_engineers.html`, `tech_debt_hidden_cost.html`

---

## Writing Methodology

### Voice & tone
- Direct and analytical — take a clear position, don't hedge.
- Evidence-grounded — cite patterns, data, real-world examples (even hypothetical ones
  that feel concrete).
- Occasionally provocative — the hero quote should be a statement most readers agree
  with in retrospect but resist at first.
- Short paragraphs (2–4 sentences). Vary sentence length. Avoid walls of text.
- No filler phrases ("it's important to note that", "in conclusion", "at the end of the day").

### Content structure (follow this order)

1. **Hook** (2 paragraphs)
   - Open with a concrete scene: a meeting, a decision, a moment that every reader
     recognises. Use present tense for immediacy.
   - Second paragraph names the pattern — give it a label.

2. **Problem statement** (1–2 paragraphs)
   - State what this pattern costs, why it matters, and the one-line thesis.

3. **[divider]**

4. **Section 1 — Debunk the myth / establish context**
   - Title: challenge received wisdom directly.
   - 3–4 paragraphs. Insert 1 `callout` with the sharpest insight.

5. **[divider]**

6. **Section 2 — The real costs / evidence**
   - Title: use "What X Actually Costs" or similar.
   - Use 2–4 `blog-h3` sub-sections to break down individual costs.
   - End with 1 `warning-box` on the compounding / systemic risk.

7. **[divider]**

8. **Section 3 — The core argument / what good looks like**
   - 3–4 paragraphs.
   - 1 `callout` restating the positive case.

9. **[divider]**

10. **Section 4 — Principle grid**
    - Title: "N Principles of X" or "What X Requires".
    - 4–8 numbered `principle-card` items (01, 02 … padded to 2 digits).
    - Each card: short imperative title + 1–2 sentence body. No card should repeat
      another.

11. **[divider]**

12. **Section 5 — Nuance / the false binary**
    - Acknowledge the strongest counter-argument. Steel-man it briefly, then refine.
    - 2–3 paragraphs. Optional: 1 `callout`.

13. **[divider]**

14. **Section 6 — Practical / "what this looks like"**
    - Concrete, specific. Name observable behaviours, not abstractions.
    - 2–3 paragraphs + 1 `callout`.

15. **[divider]**

16. **Section 7 — Action / hiring / what to do now**
    - Closes the loop on the opening hook.
    - 2–3 paragraphs. No callout here — end directly.

17. **`final-cta` block** — "The bottom line" (or topic-specific heading).
    - 1 tight paragraph. Ends on an active, forward-looking note.

### Word count targets

| Read time | Target words |
|-----------|-------------|
| 6 min     | ~1,200      |
| 8 min     | ~1,600      |
| 10 min    | ~2,000      |
| 12 min    | ~2,400      |

---

## HTML Template

Copy this shell exactly. Replace every `{{ PLACEHOLDER }}` with generated content.
Do NOT add any `<style>` block — all CSS lives in `app.css`.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ PAGE TITLE }} &mdash; Moustafa Elgammal</title>
  <meta name="description"       content="{{ ONE-SENTENCE SUMMARY (≤155 chars) }}">
  <meta name="blog:category"     content="{{ Category Label }}">
  <meta name="blog:date"         content="{{ Month YYYY }}">
  <meta name="blog:date-iso"     content="{{ YYYY-MM-DD }}">
  <meta name="blog:readtime"     content="{{ N min read }}">
  <meta name="blog:ai-generated" content="true">
  <meta name="blog:ai-tool"      content="Claude">
  <meta name="blog:license"      content="CC BY 4.0">

  <!-- SEO -->
  <meta name="author" content="Moustafa Elgammal">
  <link rel="canonical" href="https://elgx.me/blog/{{ SLUG }}.html">

  <!-- Open Graph (Facebook · LinkedIn) -->
  <meta property="og:type"        content="article">
  <meta property="og:site_name"   content="Moustafa Elgammal">
  <meta property="og:url"         content="https://elgx.me/blog/{{ SLUG }}.html">
  <meta property="og:title"       content="{{ ARTICLE TITLE }}">
  <meta property="og:description" content="{{ ONE-SENTENCE SUMMARY (≤155 chars) }}">
  <meta property="og:image"       content="https://elgx.me/img/avatar.jpg">
  <meta property="og:image:alt"   content="Moustafa Elgammal">
  <meta property="article:published_time" content="{{ YYYY-MM-DD }}">
  <meta property="article:author" content="https://elgx.me">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary">
  <meta name="twitter:title"       content="{{ ARTICLE TITLE }}">
  <meta name="twitter:description" content="{{ ONE-SENTENCE SUMMARY (≤155 chars) }}">
  <meta name="twitter:image"       content="https://elgx.me/img/avatar.jpg">
  <meta name="twitter:image:alt"   content="Moustafa Elgammal">

  <!-- Structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{{ ARTICLE TITLE }}",
    "description": "{{ ONE-SENTENCE SUMMARY (≤155 chars) }}",
    "author": { "@type": "Person", "name": "Moustafa Elgammal", "url": "https://elgx.me" },
    "publisher": { "@type": "Person", "name": "Moustafa Elgammal", "url": "https://elgx.me" },
    "datePublished": "{{ YYYY-MM-DD }}",
    "image": "https://elgx.me/img/avatar.jpg",
    "url": "https://elgx.me/blog/{{ SLUG }}.html",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://elgx.me/blog/{{ SLUG }}.html" }
  }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/normalize.css">
  <link rel="stylesheet" href="../css/app.css">
</head>
<body>
  <button class="mode-btn" onclick="toggleMode()" aria-label="Toggle dark mode"></button>

  <div class="site-wrap">

    <div class="blog-page-header">
      <a class="back-link" href="../index.html">&larr; Moustafa Elgammal</a>
    </div>

    <div class="blog-wrap">
      <div class="blog-tag">{{ Category Label }} &middot; {{ N min read }}</div>
      <h1 class="blog-title">{{ ARTICLE TITLE }}</h1>
      <p class="blog-subtitle">{{ SUBTITLE — one punchy sentence, Playfair italic }}</p>
      <div class="blog-meta">
        <span>{{ Month YYYY }}</span>
        <span class="meta-dot"></span>
        <span>~{{ X,XXX }} words</span>
        <span class="meta-dot"></span>
        <span>{{ Tag1 }} &middot; {{ Tag2 }}</span>
      </div>

      <div class="ai-disclosure">
        <span class="ai-disclosure-icon">&#9889;</span>
        <span>Generated with <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a> (Anthropic) &middot; Reviewed and published by the author</span>
      </div>

      <div class="blog-hero">
        <p class="hero-quote">{{ HERO QUOTE — the article's sharpest, most quotable claim }}</p>
        <p class="hero-attr">{{ Hero attribution line — lowercase, displayed uppercase by CSS }}</p>
      </div>

      <div class="blog-body">

        <!-- HOOK — 2 paragraphs -->
        <p>{{ Hook paragraph 1: concrete scene }}</p>
        <p>{{ Hook paragraph 2: name the pattern }}</p>
        <p>{{ Problem statement / thesis }}</p>

        <hr class="blog-divider">

        <h2 class="blog-h2">{{ Section 1 title }}</h2>
        <p>{{ ... }}</p>
        <div class="callout">{{ Key insight — italic, 1–2 sentences }}</div>
        <p>{{ ... }}</p>

        <hr class="blog-divider">

        <h2 class="blog-h2">{{ Section 2 title }}</h2>
        <h3 class="blog-h3">{{ Sub-section A }}</h3>
        <p>{{ ... }}</p>
        <h3 class="blog-h3">{{ Sub-section B }}</h3>
        <p>{{ ... }}</p>
        <h3 class="blog-h3">{{ Sub-section C }}</h3>
        <p>{{ ... }}</p>
        <div class="warning-box">
          <div class="wb-label">&#9888; {{ Warning label — e.g. "The compounding risk" }}</div>
          <p>{{ Warning body — the systemic or long-term danger }}</p>
        </div>

        <hr class="blog-divider">

        <h2 class="blog-h2">{{ Section 3 title }}</h2>
        <p>{{ ... }}</p>
        <div class="callout">{{ Second callout }}</div>
        <p>{{ ... }}</p>

        <hr class="blog-divider">

        <h2 class="blog-h2">{{ N Principles of X }}</h2>
        <div class="principle-grid">
          <div class="principle-card">
            <div class="pc-num">01</div>
            <div class="pc-title">{{ Short imperative title }}</div>
            <div class="pc-body">{{ 1–2 sentences }}</div>
          </div>
          <!-- repeat for 02, 03 … up to 08 -->
        </div>

        <hr class="blog-divider">

        <h2 class="blog-h2">{{ Section 5 — nuance }}</h2>
        <p>{{ ... }}</p>

        <hr class="blog-divider">

        <h2 class="blog-h2">{{ Section 6 — practical }}</h2>
        <p>{{ ... }}</p>
        <div class="callout">{{ Third callout }}</div>
        <p>{{ ... }}</p>

        <hr class="blog-divider">

        <h2 class="blog-h2">{{ Section 7 — action }}</h2>
        <p>{{ ... }}</p>

      </div><!-- /.blog-body -->

      <div class="final-cta">
        <div class="fc-head">The bottom line</div>
        <p>{{ One-paragraph synthesis. End forward-looking and active. }}</p>
      </div>

      <div class="article-license-footer">
        <span class="license-badge">CC BY 4.0</span>
        <span>&copy; {{ YYYY }} Moustafa Elgammal &middot;
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Creative Commons Attribution 4.0</a>
          &middot; <a href="../LICENSE.txt">Full license</a>
        </span>
      </div>

    </div><!-- /.blog-wrap -->
  </div><!-- /.site-wrap -->

  <script>
    if (localStorage.getItem('mode') === 'dark') {
      document.body.classList.add('dark');
    }
    function toggleMode() {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('mode', isDark ? 'dark' : 'light');
    }
  </script>
</body>
</html>
```

---

## Component reference

### `callout` — key insight

Use for the single most important claim in a section. Italic, left-accent border.
Limit: **1 per section**, **3 total** per article.

```html
<div class="callout">The sentence that, if a reader only remembers one thing from
this section, should be this one.</div>
```

### `warning-box` — risk / caveat

Use once per article for the hardest-to-ignore systemic danger.
Always open with `&#9888;` and a short label in `.wb-label`.

```html
<div class="warning-box">
  <div class="wb-label">&#9888; The compounding risk</div>
  <p>One to three sentences on the danger that accumulates quietly and is expensive
  to fix once discovered.</p>
</div>
```

### `principle-grid` — numbered cards

Use for a set of 4–8 parallel, actionable items. Numbers are zero-padded: 01, 02 …
Cards auto-wrap via CSS grid — no manual column control needed.

```html
<div class="principle-grid">
  <div class="principle-card">
    <div class="pc-num">01</div>
    <div class="pc-title">Short imperative</div>
    <div class="pc-body">One to two sentences. Concrete, not abstract.</div>
  </div>
</div>
```

### `blog-hero` — opening quote

One quote only, placed directly after `.ai-disclosure`.
The quote must be the article's sharpest claim — a reader who only reads this
should still walk away with something valuable.

```html
<div class="blog-hero">
  <p class="hero-quote">"The quote goes here — punchy, italicised, 1–2 sentences."</p>
  <p class="hero-attr">A short attribution or framing line</p>
</div>
```

### `blog-h3` — sub-section

Use only inside a section that already has a `blog-h2`. Displayed in accent colour,
uppercase monospace. Do not use consecutively without at least one `<p>` in between.

```html
<h3 class="blog-h3">Sub-section label</h3>
<p>First paragraph of this sub-section.</p>
```

### `final-cta` — conclusion

Always the last content block before `.article-license-footer`.
Heading is usually "The bottom line" but can be topic-specific.
One paragraph only — tight synthesis, ends on an active note.

```html
<div class="final-cta">
  <div class="fc-head">The bottom line</div>
  <p>Synthesis paragraph.</p>
</div>
```

---

## Meta tags the scanner reads

| Meta name            | Required | Example value                        |
|----------------------|----------|--------------------------------------|
| `description`        | ✓        | One-sentence summary, ≤ 155 chars    |
| `blog:category`      | ✓        | `Engineering Leadership`             |
| `blog:date`          | ✓        | `May 2026`                           |
| `blog:date-iso`      | ✓        | `2026-05-10`                         |
| `blog:readtime`      | ✓        | `10 min read`                        |
| `blog:ai-generated`  | ✓        | `true`                               |
| `blog:ai-tool`       | ✓        | `Claude`                             |
| `blog:license`       | ✓        | `CC BY 4.0`                          |

The `<title>` tag must end with ` &mdash; Moustafa Elgammal`
(the scanner strips this suffix to get the display title).

---

## Post-generation checklist

After writing the file, verify before reporting done:

- [ ] Slug is lowercase with underscores, ends in `.html`
- [ ] All 8 `blog:*` meta tags present and populated
- [ ] `<title>` ends with ` &mdash; Moustafa Elgammal`
- [ ] `blog:date-iso` uses real today's date (`YYYY-MM-DD`)
- [ ] No `<style>` block in the HTML (all CSS comes from `app.css`)
- [ ] SEO: `<meta name="author">` and `<link rel="canonical">` present
- [ ] OG: all 8 `og:` / `article:` properties present, `og:title` is the plain title (no site suffix)
- [ ] Twitter: all 5 `twitter:` tags present
- [ ] JSON-LD `<script type="application/ld+json">` block present with correct slug/date/title
- [ ] `ai-disclosure` block present
- [ ] Hero quote present and inside `.blog-hero`
- [ ] At least 4 `principle-card` items
- [ ] Exactly 1 `warning-box`
- [ ] 2–3 `callout` blocks total
- [ ] `final-cta` block present
- [ ] `article-license-footer` present with correct year
- [ ] `bash scripts/scan-blogs.sh` ran successfully (also regenerates `sitemap.xml`)
- [ ] `blog/index.json` updated (confirm article appears)
