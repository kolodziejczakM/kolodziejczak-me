import { readFile } from "node:fs/promises";
import { site } from "../src/config/site.ts";

if (!site.readyToPublish) {
  throw new Error(
    "Run npm run release:check to create and verify an explicit production build.",
  );
}
for (const path of [
  "index.html",
  "pl/index.html",
  "en/index.html",
  "pl/blog/index.html",
  "en/blog/index.html",
]) {
  const html = await readFile(
    new URL(`../dist-production/${path}`, import.meta.url),
    "utf8",
  );
  if (/name="robots" content="[^"]*noindex/.test(html))
    throw new Error(
      `Release still has noindex: ${path}. Rebuild with SITE_ENV=production.`,
    );
}
const design = await readFile(
  new URL("../dist-production/design/index.html", import.meta.url),
  "utf8",
);
if (!design.includes('content="noindex,nofollow"'))
  throw new Error("Design reference must remain noindex.");
const sitemap = await readFile(
  new URL("../dist-production/sitemap.xml", import.meta.url),
  "utf8",
);
if (!sitemap.includes("<url>")) throw new Error("Release sitemap is empty.");
console.log(
  "Production build verified in dist-production/. Only this directory can be deployed to GitHub Pages.",
);
