import { site } from "../config/site";

export function GET() {
  // Keep pages crawlable so crawlers can read noindex, including /design/.
  return new Response(
    `User-agent: *\nAllow: /\n${site.readyToPublish ? `Sitemap: ${site.origin}/sitemap.xml\n` : ""}`,
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
}
