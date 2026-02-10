import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: "page",
      source: "*.md", // about.md, contact.md, etc (not the slug pages tho)
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        publishedAt: z.string().optional(),
        head: z.any().optional(),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        publishedAt: z.string().optional(),
        head: z.any().optional(),
      }),
    }),
    pagesSiteMap: defineCollection({
      type: "page",
      source: "**/*.md", //finds all the paths + path/slug
    }),
  },
});
