import { getCollection, type CollectionEntry } from "astro:content";
import { validateArticleIndex } from "./article-index.ts";
import type { Locale } from "./i18n.ts";
import { site } from "../config/site.ts";
import { isPublished, validatePublication } from "./publication.ts";

export type Article = CollectionEntry<"articles">;
export { articlePath, translationOf } from "./article-index.ts";

export async function publishedArticles(): Promise<Article[]> {
  const articles = await getCollection("articles", ({ data }) =>
    isPublished(data),
  );
  validateArticleIndex(articles);
  await validatePublication(articles, site.readyToPublish);
  return articles.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}
export async function articlesFor(locale: Locale): Promise<Article[]> {
  return (await publishedArticles()).filter(
    (article) => article.data.locale === locale,
  );
}
