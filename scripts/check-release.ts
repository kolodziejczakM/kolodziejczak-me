import { readFile } from "node:fs/promises";
import { site } from "../src/config/site.ts";

if (!site.readyToPublish) {
  throw new Error(
    "Premiera zablokowana: readyToPublish jest false. Najpierw zastąp próbki prawdziwymi artykułami, potem włącz publikację i przebuduj stronę.",
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
    new URL(`../dist/${path}`, import.meta.url),
    "utf8",
  );
  if (/name="robots" content="[^"]*noindex/.test(html))
    throw new Error(
      `Release still has noindex: ${path}. Rebuild after changing readyToPublish.`,
    );
}
const design = await readFile(
  new URL("../dist/design/index.html", import.meta.url),
  "utf8",
);
if (!design.includes('content="noindex,nofollow"'))
  throw new Error("Design reference must remain noindex.");
const sitemap = await readFile(
  new URL("../dist/sitemap.xml", import.meta.url),
  "utf8",
);
if (!sitemap.includes("<url>")) throw new Error("Release sitemap is empty.");
console.log(
  "Build gotowy do publikacji. DNS, TLS, przekierowania, 404 i odtwarzanie z serwera trzeba jeszcze sprawdzić na docelowym hoście.",
);
