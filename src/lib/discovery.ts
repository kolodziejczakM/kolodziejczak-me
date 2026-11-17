import { site } from "../config/site.ts";
import { absoluteUrl } from "./seo.ts";
import { articlePath } from "./article-index.ts";
import { blogPath, text, type Locale } from "./i18n.ts";
import type { Article } from "./articles.ts";

export const xml = (value: string): string =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );

export function sitemap(articles: Article[], release: boolean): string {
  const pages = release
    ? [
        { path: "/" },
        { path: "/pl/" },
        { path: "/en/" },
        { path: "/pl/blog/" },
        { path: "/en/blog/" },
        ...articles
          .filter(({ data }) => !data.sample)
          .map((article) => ({
            path: articlePath(article),
            date: article.data.updatedAt ?? article.data.publishedAt,
          })),
      ]
    : [];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((page: { path: string; date?: Date }) => `<url><loc>${xml(absoluteUrl(page.path))}</loc>${page.date ? `<lastmod>${page.date.toISOString()}</lastmod>` : ""}</url>`).join("")}</urlset>`;
}

export function rss(articles: Article[], locale: Locale): string {
  const items = articles.filter(
    ({ data }) => data.locale === locale && !data.sample,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${site.domain} · ${text(locale, "Artykuły", "Articles")}</title>
<link>${absoluteUrl(blogPath(locale))}</link><description>${xml(site.description[locale])}</description>
<language>${locale}</language><atom:link href="${absoluteUrl(`/${locale}/rss.xml`)}" rel="self" type="application/rss+xml"/>
${items.map((article) => `<item><title>${xml(article.data.title)}</title><link>${xml(absoluteUrl(articlePath(article)))}</link><guid isPermaLink="true">${xml(absoluteUrl(articlePath(article)))}</guid><description>${xml(article.data.description)}</description><pubDate>${article.data.publishedAt.toUTCString()}</pubDate></item>`).join("\n")}
</channel></rss>`;
}
