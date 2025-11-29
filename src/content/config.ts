import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    hero: z.string().optional(),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    client: z.string().optional(),
    results: z.string().optional(), // e.g., "+31% sign-ups in 90 days"
    industry: z.string().optional(),
    challenges: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

const blogs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default("Bryan Jacinto"),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, blogs };
