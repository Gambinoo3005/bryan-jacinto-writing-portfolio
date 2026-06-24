# Bryan Jacinto — Writing Portfolio

Copywriter and SEO content strategist with seven years of turning complicated topics into copy that ranks *and* reads like a human wrote it. This is the source for my portfolio — written, designed, and built by me.

### → See it live: **[bryanjacinto.com](https://bryanjacinto.com)**

---

## Why this repo exists

Most writers hand you a PDF and a Google Drive link. I wanted to show, not tell — so I built the whole site myself instead of dropping my work into a template. The words are mine. The code is mine. You reading this on GitHub is sort of the point: I can write the copy *and* ship the site it lives on.

It's a static Astro site — fast, accessible, and search-friendly by design, because that's literally the job.

## A few things I'm proud of

- **An experience timeline that behaves like a real deck of cards.** Swipe it, click it, arrow-key through it — there's a hand-built card stack with organic offsets and depth instead of a boring list. It works on a phone without hijacking your scroll, which is harder than it sounds.
- **Built for search, not just for show.** JSON-LD structured data (Person, Article, BlogPosting), a generated sitemap, canonical tags, and proper Open Graph / Twitter cards. The SEO is wired the way I'd wire a client's.
- **Accessible on purpose.** Semantic HTML, ARIA where it counts, full keyboard navigation, and `prefers-reduced-motion` support so the animations never get in the way.
- **Quietly fast.** Astro ships almost no JavaScript by default; the heavier bits (animations, smooth scroll) lazy-load only when they're needed and allowed. Images are WebP, the hero is preloaded, and the theme switches with no flash.
- **Writing that lives in real content collections.** Blog posts and case studies are type-safe MDX (validated with Zod), so adding work is a matter of dropping in a file — no markup surgery.
- **Small touches I couldn't resist.** Hover "Book a Call" and watch it become *me + you*. The details are the brand.

## Built with

**Astro 5** · **TypeScript** · **Tailwind CSS v4** · **MDX** · **GSAP** + **Lenis** (animation & smooth scroll) · deployed on **Vercel**

## Run it locally

<details>
<summary>For the curious — three commands</summary>

```bash
git clone https://github.com/Gambinoo3005/bryan-jacinto-writing-portfolio.git
cd bryan-jacinto-writing-portfolio
npm install
npm run dev      # http://localhost:4321
```

Build with `npm run build`, preview with `npm run preview`. Working on the codebase? See **[DEVNOTES.md](./DEVNOTES.md)**.

</details>

## Let's talk

- **Portfolio:** [bryanjacinto.com](https://bryanjacinto.com)
- **LinkedIn:** [bryan-jacinto-writer](https://www.linkedin.com/in/bryan-jacinto-writer/)
- **Email:** jacintobryan3@gmail.com

## License

© 2026 Bryan Jacinto. All rights reserved. The code is here to be read; the writing and brand are mine — please don't repackage them as your own.
