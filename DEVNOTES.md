# Dev Notes

Quick reference for working on the portfolio after time away. Day-to-day stuff:
adding content, tweaking the homepage, theme colors, and how the SEO is wired.

## Commands

| Command | Action |
| :------ | :----- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Build static site to `./dist/` |
| `npm run preview` | Preview the production build locally |

Node 18+ or 20+.

## Content collections

Schemas live in `src/content/config.ts` (validated with Zod). Two collections
power the site:

### Blog posts → `/blogs`

Drop a `.md` file in `src/content/blogs/`. It appears at `/blogs/<filename>`
and in the `/blogs` listing automatically.

```markdown
---
title: "Post title"
description: "One-line summary for SEO and previews"
author: "Bryan Jacinto"   # optional, defaults to this
category: "SEO"            # optional
tags: ["seo", "local"]     # optional
pubDate: 2026-06-24
heroImage: "/hero-images/whatever.webp"  # optional
ogImage: "/hero-images/whatever.webp"    # optional
draft: false               # true = hidden from build
---

Your content here…
```

### Work / case studies → `/work`

Drop an `.mdx` file in `src/content/work/`. Renders at `/work/<filename>`.

```markdown
---
title: "Project title"
summary: "One-line project summary"
client: "Client Name"         # optional
industry: "SaaS"              # optional
results: "+45% conversions"    # optional
tags: ["Case Study"]           # see layout note below
pubDate: 2026-06-24
heroImage: "/hero-images/whatever.webp"  # optional (hero: also accepted)
ogImage: "/hero-images/whatever.webp"    # optional
draft: false
---

Case study content…
```

**Layout switch:** the `tags` array picks the layout in `src/pages/work/[slug].astro`:
- includes `"Article"` → renders with the article layout (`BlogLayout`)
- otherwise → renders as a case study (`CaseStudyLayout`)

> ⚠️ **Heads-up — the `posts/` collection.** There's a third folder,
> `src/content/posts/`, served at `/posts/[slug]`, that mirrors a few of the
> `work/` items. It has **no schema** in `config.ts` (it works as an implicit
> collection). It looks like a legacy duplicate. If you're adding new work, use
> `work/`. Worth deciding whether to retire `posts/` at some point.

## Homepage data (`src/pages/index.astro`)

The homepage still holds a few hardcoded arrays in its frontmatter:

- `experienceCards` — the card-stack timeline
- `clientTestimonials` — testimonial cards
- `toolsetData` — the toolset grid (icons live in `public/toolset-icons/`, WebP, ~128×128)

The "currently writing for" companies are inline links in the hero `<p>` (search
for `crafting meaningful content`).

> Future cleanup idea: move `experienceCards` / `clientTestimonials` into content
> collections so edits don't mean touching a 1,600-line file.

## SEO / structured data

`BaseLayout.astro` takes a `jsonLd` prop and renders it as a
`<script type="application/ld+json">`. It's threaded through `BlogLayout` and
`CaseStudyLayout` too. Current schemas:

- **Home** (`index.astro`) — `Person` + `WebSite`
- **Blog posts** (`blogs/[slug].astro`) — `BlogPosting`
- **Work** (`work/[slug].astro`) — `Article` (articles) / `CreativeWork` (case studies)

The production domain is set as `site:` in `astro.config.mjs` — the sitemap and
canonical URLs depend on it being correct.

## Theme colors

CSS variables in `src/styles/global.css` (`:root` for light, `.dark` for dark).
The no-flash theme script lives in `src/layouts/BaseLayout.astro`.

## Navigation

Edit the `nav` array in `src/components/Header.astro`.

## Contact form

Uses EmailJS (`@emailjs/browser`). Credentials are configured client-side in the
homepage's contact section.
