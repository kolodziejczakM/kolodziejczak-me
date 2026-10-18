import { locales, type Locale } from "./i18n.ts";

export interface ArticleIdentity {
  data: { locale: Locale; translationKey: string; urlSlug: string };
}

export function articlePath(article: ArticleIdentity): string {
  return `/${article.data.locale}/blog/${article.data.urlSlug}/`;
}

/** Fail the build instead of silently publishing collisions or broken language links. */
export function validateArticleIndex<T extends ArticleIdentity>(
  articles: T[],
): void {
  const paths = new Set<string>();
  const translations = new Map<string, Set<Locale>>();
  for (const article of articles) {
    const { locale, translationKey } = article.data;
    const path = articlePath(article);
    if (paths.has(path)) throw new Error(`Duplicate article URL: ${path}`);
    paths.add(path);
    const languages = translations.get(translationKey) ?? new Set<Locale>();
    if (languages.has(locale))
      throw new Error(`Duplicate translation: ${translationKey}/${locale}`);
    languages.add(locale);
    translations.set(translationKey, languages);
  }
  for (const [key, languages] of translations) {
    for (const locale of locales) {
      if (!languages.has(locale))
        throw new Error(`Missing ${locale} translation: ${key}`);
    }
  }
}

export function translationOf<T extends ArticleIdentity>(
  articles: T[],
  article: T,
  locale: Locale,
): T {
  const translated = articles.find(
    (item) =>
      item.data.translationKey === article.data.translationKey &&
      item.data.locale === locale,
  );
  if (!translated)
    throw new Error(
      `Missing ${locale} translation: ${article.data.translationKey}`,
    );
  return translated;
}
