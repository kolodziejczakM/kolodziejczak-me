import { publishedArticles } from "../../lib/articles";
import { rss } from "../../lib/discovery";
import { locales, type Locale } from "../../lib/i18n";

export function getStaticPaths() {
  return locales.map((locale) => ({
    params: { lang: locale },
    props: { locale },
  }));
}
export async function GET({ props }: { props: { locale: Locale } }) {
  return new Response(rss(await publishedArticles(), props.locale), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
