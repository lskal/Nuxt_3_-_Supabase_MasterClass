import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  // collections: {
  //   content: defineCollection({
  //     type: "page",
  //     source: "**/*.md", --> SOLUTION WORKS ON ANY PAGE
  //     schema: z.object({
  //       date: z.string(),
  //     }),
  //   }),
  // },

  collections: {
    pages: defineCollection({
      type: "page",
      source: "*.md", // about.md, contact.md, etc
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
  },
});
