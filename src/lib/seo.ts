import { site } from "../config/site.ts";
import {
  blogPath,
  homePath,
  text,
  categoryLabel,
  type Locale,
} from "./i18n.ts";
import type { Article } from "./articles.ts";

export interface SeoPage {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  kind: "home" | "blog" | "article" | "language";
  article?: Article;
}

export const absoluteUrl = (path: string): string =>
  new URL(path, site.origin).href;

// JSON in a script element must not contain a literal closing script tag.
export const jsonLd = (value: unknown): string =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export function pageGraph(page: SeoPage, image: string): object {
  const canonical = absoluteUrl(page.path);
  const personId = absoluteUrl("/#author");
  const websiteId = absoluteUrl("/#website");
  const webpageId = `${canonical}#webpage`;
  const graph: object[] = [
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      url: absoluteUrl(homePath(page.locale)),
      sameAs: site.contacts
        .filter(({ name }) =>
          ["Facebook", "Telegram", "LinkedIn"].includes(name),
        )
        .map(({ url }) => url),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: site.domain,
      inLanguage: ["pl", "en"],
      publisher: { "@id": personId },
    },
    {
      "@type":
        page.kind === "home"
          ? "ProfilePage"
          : page.kind === "blog"
            ? "CollectionPage"
            : "WebPage",
      "@id": webpageId,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: page.locale,
      isPartOf: { "@id": websiteId },
      primaryImageOfPage: { "@type": "ImageObject", url: image },
      ...(page.kind === "home" ? { mainEntity: { "@id": personId } } : {}),
    },
  ];
  if (page.kind === "blog" || page.kind === "article") {
    const crumbs = [
      {
        name: text(page.locale, "Strona główna", "Home"),
        item: absoluteUrl(homePath(page.locale)),
      },
      {
        name: text(page.locale, "Artykuły", "Articles"),
        item: absoluteUrl(blogPath(page.locale)),
      },
      ...(page.kind === "article"
        ? [{ name: page.title, item: canonical }]
        : []),
    ];
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        ...crumb,
      })),
    });
  }
  // Samples demonstrate the layout; do not attribute their text to the author.
  if (page.article && !page.article.data.sample) {
    const data = page.article.data;
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      headline: data.title,
      description: data.description,
      image: [image],
      datePublished: data.publishedAt.toISOString(),
      ...(data.updatedAt ? { dateModified: data.updatedAt.toISOString() } : {}),
      inLanguage: page.locale,
      articleSection: categoryLabel(data.category, page.locale),
      author: {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: absoluteUrl(homePath(page.locale)),
      },
      publisher: { "@id": personId },
      mainEntityOfPage: { "@id": webpageId },
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
