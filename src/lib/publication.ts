import { stat } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

interface Publication {
  id: string;
  data: {
    draft: boolean;
    sample: boolean;
    publishedAt: Date;
    audio?: Partial<Record<"pl" | "en", { src: string }>>;
  };
}

export function isPublished(
  data: Publication["data"],
  now = new Date(),
): boolean {
  return !data.draft && data.publishedAt <= now;
}

/** Stop broken audio and preview material before they can reach a release. */
export async function validatePublication(
  articles: Publication[],
  release: boolean,
  // Astro bundles this module into dist/.prerender; use the build's working
  // directory rather than a URL relative to that generated bundle.
  publicDirectory = pathToFileURL(`${resolve("public")}${sep}`),
): Promise<void> {
  if (release && articles.some(({ data }) => data.sample)) {
    throw new Error(
      "Public release cannot contain sample articles. Samples must be excluded before validation.",
    );
  }
  for (const article of articles) {
    for (const audio of Object.values(article.data.audio ?? {})) {
      if (!audio) continue;
      // The content schema restricts these paths to /audio/ and forbids traversal.
      const file = new URL(audio.src.slice(1), publicDirectory);
      const info = await stat(file).catch(() => undefined);
      if (!info?.isFile() || !info.size) {
        throw new Error(
          `Missing or empty audio file: ${article.id}: public${audio.src}`,
        );
      }
    }
  }
}
