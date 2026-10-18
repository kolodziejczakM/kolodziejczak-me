import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categories } from "./lib/i18n";

const audio = z.object({
  src: z.string().regex(/^\/audio\/[a-zA-Z0-9/_-]+\.(mp3|wav|ogg)$/),
  durationSeconds: z.number().int().positive(),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      hero: z.object({
        src: image(),
        alt: z.string().min(1),
        photographer: z.string().min(1),
        source: z.url(),
      }),
      title: z.string().min(1),
      description: z.string().min(1).max(300),
      locale: z.enum(["pl", "en"]),
      translationKey: z.string().regex(/^[a-z0-9-]+$/),
      // `slug` is reserved by the content loader; keep route slugs independent of IDs.
      urlSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      publishedAt: z.coerce.date(),
      category: z.enum(categories),
      draft: z.boolean().default(false),
      sample: z.boolean().default(false),
      summary: z.array(z.string().min(1)).length(5),
      prompt: z.string().min(1),
      audio: z
        .object({ pl: audio.optional(), en: audio.optional() })
        .optional(),
    }),
});

export const collections = { articles };
