---
title: "Why I built my portfolio with Astro.js (and why you should consider it too)"
description: "How rebuilding my portfolio with Astro delivered performance, control, and a better developer experience."
author: "Bryan Jacinto"
category: "Tech"
tags: ["Astro", "Web Development", "Portfolio", "Performance"]
pubDate: 2025-10-31
heroImage: "/hero-images/astro.webp"
draft: false
---

I rebuilt my portfolio with [Astro.js](https://astro.build/) about two months ago, and honestly? It was one of the best decisions I made this year.

For a while, I was using Journo Portfolio. It's fine if you need something quick, but I kept hitting walls. The design felt too cookie-cutter, and I couldn't customize things the way I wanted. Every time I tried to tweak something or add a feature, I'd run into limitations. It felt like trying to express yourself with someone else's words.

I only started learning web dev this year, so I'm still pretty new to all of this. I've picked up React, Vue, Next.js, Astro, Tailwind, and the rest of the modern stack everyone mentions. But when I sat down to think about what I actually needed for a portfolio, most of what I'd learned felt like overkill. Did I really need a full React app just to show case studies and blog posts?

That's when I started researching alternatives and stumbled on Astro. Something about it just clicked.

## What even is Astro?

Before I sound like a fanboy, let me explain what Astro actually is.

Astro is a web framework that's built around a simple idea: ship less JavaScript to the browser. By default, Astro renders everything to static HTML at build time. No JavaScript unless you explicitly need it. And when you do need it, you can add it precisely where it matters.

It's not trying to replace React or Vue. In fact, you can use React, Vue, Svelte, or whatever you want inside an Astro project. Astro just acts as the orchestrator, making sure you're only sending what's necessary to the client.

## Why I chose Astro for my portfolio

Coming from Journo Portfolio, I had a clear list of what I needed: complete design control, fast load times, easy content management, and the ability to add custom features without hitting arbitrary platform limitations.

My portfolio isn't complicated. Some pages about my work, a blog section, a dev log, a contact form, maybe some interactive elements here and there. Nothing that needs to be a full-blown single-page application. But I wanted it to feel like mine, not like I picked template #47 from a gallery.

I needed something fast, something that could handle markdown content elegantly, and something that wouldn't force me to ship unnecessary JavaScript. Most of my site is just content: case studies, blog posts, project descriptions. The interactive bits are limited to animations, a card stack component for my work experience, and some scroll-triggered reveals.

With Astro, I'm shipping mostly static HTML. The pages stay lean, and only the bits of JavaScript needed for animations or interactive touches load when they're actually required.

And the best part? I have complete control over every pixel, every interaction, every line of code. No more fighting with platform limitations or settling for "good enough" design.

## The benefits that actually matter

**It's ridiculously fast by default.** You're shipping HTML and CSS. That's it. No framework runtime, no hydration overhead. Just raw speed.

**You can still use your favorite tools.** Need a React component for something interactive? Drop it in. Want to use Vue for a specific feature? Go ahead. Astro doesn't care. You can even mix and match frameworks in the same project, though I wouldn't recommend going too wild with that.

**The developer experience is actually pleasant.** Hot module replacement works great. The file-based routing makes sense immediately. The component syntax is clean and intuitive if you've used any modern framework.

**Content management feels natural.** Astro has built-in support for Markdown and MDX with content collections. My blog posts and dev logs are just `.md` files in folders with strict TypeScript schemas enforcing frontmatter requirements. No complicated CMS setup, no database, no headless CMS subscriptions. Just files with type safety baked in.

Here's what a simple blog post setup looks like:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blogs };
```

Then you can query and display your posts with full type safety:

```astro
---
// src/pages/blogs/index.astro
import { getCollection } from 'astro:content';

const posts = await getCollection('blogs');
const sortedPosts = posts.sort((a, b) => 
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<div class="blog-list">
  {sortedPosts.map((post) => (
    <article>
      <h2>{post.data.title}</h2>
      <p>{post.data.description}</p>
      <time>{post.data.pubDate.toLocaleDateString()}</time>
      <a href={`/blogs/${post.slug}`}>Read more</a>
    </article>
  ))}
</div>
```

If your frontmatter is missing required fields or has the wrong type, the build fails immediately. Saved me from deploying broken posts multiple times.

**Island architecture is genius.** This is Astro's killer feature. You can have a completely static page, then "hydrate" just the interactive bits you need. My portfolio is mostly static HTML with selective islands for GSAP animations and the card stack component. Those only load when `prefers-reduced-motion` allows it and when they're actually needed. Everything else stays pure HTML and CSS.

Here's a real example from my portfolio. The hero section is static HTML with an optional animation island:

```astro
---
// Hero section - mostly static
const roles = ['Copywriter', 'SEO', 'UI / UX', 'Web Dev'];
---

<section class="hero">
  <h1>Bryan Jacinto</h1>
  <ul class="roles">
    {roles.map(role => <li>{role}</li>)}
  </ul>
  <a href="/work" class="cta-button">See my work</a>
  
  <!-- Only hydrate the animation if motion is allowed -->
  <HeroAnimation client:visible />
</section>
```

The `client:visible` directive means the animation component only loads and runs when it scrolls into view. If someone has reduced motion enabled, the script never loads at all. The rest of the hero stays pure HTML.

Compare that to a typical React app where everything gets hydrated, even if it's just static text. With Astro, you opt into JavaScript instead of opting out of it.

## How it compares to other frameworks

I'm not here to trash other frameworks. They all have their place. Here's how I think about them now:

**Astro vs Next.js**

Next.js is powerful, no question. But it's overkill for content-heavy sites or portfolios. Next assumes you need a React app, then lets you opt into static generation. Astro assumes you need static HTML, then lets you opt into interactivity.

Here's what a simple page looks like in Next.js:

```jsx
// pages/about.js - Next.js
export default function About() {
  return (
    <div>
      <h1>About Me</h1>
      <p>I'm a copywriter and web developer...</p>
    </div>
  );
}
```

That ships React's runtime (~40KB gzipped), hydration logic, and framework overhead just to display static text. Even with static generation, the page still hydrates on the client.

Here's the same thing in Astro:

```astro
---
// src/pages/about.astro
const title = "About Me";
---

<div>
  <h1>{title}</h1>
  <p>I'm a copywriter and web developer...</p>
</div>
```

This ships pure HTML. Zero JavaScript unless you explicitly add it. That's the fundamental difference.

For my portfolio, Next would mean shipping React's runtime, hydration logic, and framework overhead just to display text, images, and case studies. That's like bringing a firehose to water a houseplant. Sure, it works, but why?

I'm using GSAP for animations and building custom components with vanilla JavaScript where needed. Astro lets me do that without forcing an entire framework down the pipe.

That said, if you're building an actual web application with tons of client-side interactivity, real-time features, authentication, or complex state management, Next might still be the better choice. But for portfolios, marketing sites, and content-focused projects? Astro wins.

**Astro vs Gatsby**

I haven't used Gatsby personally, but from what I've read and heard from other developers, it's gotten bloated over time. The GraphQL layer seems like unnecessary abstraction for most projects, and build times apparently get slower as sites grow.

Astro feels more straightforward to me: fast static sites with modern tooling, without the extra complexity.

**Astro vs Eleventy**

I haven't worked with Eleventy, but it seems fantastic if you want something simple and JavaScript-minimalist. From what I understand, Astro gives you more modern developer experience with better tooling, component architecture, and the option to add interactivity when you need it.

Eleventy feels like building with raw HTML and templates. Astro feels like building with modern components. Both approaches are valid, just depends on what you prefer and what you're comfortable with.

**Astro vs Plain HTML/CSS**

Look, sometimes you don't need a framework at all. But Astro gives you nice things like components, scoped CSS, TypeScript support, and a dev server with HMR while still outputting essentially plain HTML. It's a reasonable middle ground.

## When Astro makes sense (and when it doesn't)

**Astro is great for:**
- Marketing sites and landing pages
- Blogs and documentation sites
- Portfolios and personal sites
- Content-heavy websites
- E-commerce sites where most pages are static product listings

**Astro might not be ideal for:**
- Heavily interactive dashboards
- Real-time collaborative apps
- Social media platforms with endless scrolling and instant updates
- Projects where you're already deep in a React ecosystem and need tight integration

## The learning curve

If you know HTML, CSS, and JavaScript, you can pick up Astro pretty quickly. I'm still learning, but I had the basics down in a couple of days.

The component syntax is straightforward. The frontmatter section at the top handles your logic and data fetching. The template below renders your HTML. Scoped styles go in a `<style>` tag. If you've used any modern framework, it feels familiar immediately.

The documentation is actually good, which is rarer than it should be. Clear examples, sensible defaults, not overly abstract. When I got stuck, I usually found answers quickly either in the docs or by searching around.

I had my portfolio rebuilt and deployed in a weekend. Most of that time was spent on design decisions and content, not fighting with the framework. The actual Astro setup and build configuration took maybe an hour.

## Real performance gains

Let me give you some actual numbers from my portfolio. These are from PageSpeed Insights and Lighthouse Metrics, tested in October 2025:

**Desktop (PageSpeed Insights):**
- Performance: 99
- First Contentful Paint: 0.7s
- Largest Contentful Paint: 0.7s
- Total Blocking Time: 0ms
- Cumulative Layout Shift: 0.005

**Mobile (Lighthouse Metrics - Global):**
- Performance scores range from 82 to 97 depending on region
- US West: 93 (FCP: 2.5s, LCP: 2.5s)
- Germany: 97 (FCP: 944ms, LCP: 1.5s)
- Australia: 82 (FCP: 1s, LCP: 1.2s)
- Total Blocking Time: 0ms to 739ms depending on region
- Cumulative Layout Shift: 0 to 0.01

**Other scores across the board:**
- Accessibility: 93-95
- Best Practices: 96
- SEO: 100

**Total page weight:** 153KB transferred (348KB total resource size) with only 20 requests

The JavaScript execution time is just 0.1 seconds on desktop. Most of the page is static HTML and CSS. The interactive pieces, such as GSAP animations or the card stack component, only load when needed.

These aren't synthetic benchmarks. This is my actual site, hosted on Vercel, tested from multiple regions around the world with real content and animations. The performance holds up pretty well globally, even on mobile connections.

## The ecosystem is growing

Astro's still relatively young, but the ecosystem is solid and growing fast. There are integrations for Tailwind, Markdown, MDX, image optimization, sitemap generation, and all the other staples you'd expect.

The community is helpful and active. When I've had questions, I usually find answers quickly either in the docs or on their Discord.

## Things that could be better

Look, nothing's perfect. Here are some rough edges I've hit:

**Content collections are strict.** This is mostly good because type safety prevents runtime errors. But if you forget a required frontmatter field in a markdown file, the entire build fails. I learned this the hard way when I published a blog post without a proper `pubDate` in ISO format. Build crashed until I fixed it.

**The routing could be more flexible.** File-based routing is great until you need something custom or dynamic beyond what the file system can express. Possible, but requires more manual work than I'd like.

**View transitions are still experimental.** They work well enough, but you might hit edge cases. Nothing deal-breaking, but worth knowing if you're planning to use them heavily.

**Build times can get slow with huge sites.** If you're building a site with thousands of pages, builds might take a while. Not unique to Astro, but worth considering for very large projects.

## Would I use it again?

Absolutely. I haven't built any other sites with Astro yet, and my portfolio has only been live for two months, but I'm already planning my next projects with it.

I'm thinking about using it for a documentation site and maybe a landing page for a local business. The combination of speed, control, and simplicity makes it feel like the right tool for most content-focused projects I'd take on.

I'm still learning and figuring things out, but Astro's been the easiest framework to work with so far. That counts for a lot when you're just starting out.

## Takeaway

Astro isn't the answer to everything, but for content-focused sites where performance matters and you don't need a full client-side application, it's worth checking out. It lets you build fast, ship fast, and keep things simple. My portfolio loads in under a second with perfect SEO and strong Lighthouse scores globally.

The code's cleaner, the build process is straightforward, and even as someone still learning, it hasn't felt overwhelming. If you're outgrowing a portfolio platform or building something content-heavy from scratch, give Astro a shot.

And if you want to get started yourself, head over to the [official Astro docs](https://docs.astro.build/en/getting-started/).
