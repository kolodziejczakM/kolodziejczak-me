import { publishedArticles } from "../lib/articles";
import { sitemap } from "../lib/discovery";
import { site } from "../config/site";

export async function GET() {
  return new Response(sitemap(await publishedArticles(), site.readyToPublish), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
