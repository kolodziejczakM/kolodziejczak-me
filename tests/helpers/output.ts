import { readFile, readdir } from "node:fs/promises";
import { site } from "../../src/config/site.ts";
export const outputRoot = new URL(
  `../../${site.readyToPublish ? "dist-production" : "dist"}/`,
  import.meta.url,
);
export const outputFile = (path: string) =>
  new URL(path.startsWith("/") ? path.slice(1) : path, outputRoot);

export const output = (path: string) => readFile(outputFile(path), "utf8");
export async function htmlPages() {
  const files = (await readdir(outputRoot, { recursive: true })).filter(
    (file) => file.endsWith(".html"),
  );
  return Promise.all(
    files.map(async (path) => ({ path, html: await output(path) })),
  );
}
export async function articlePages() {
  return (await htmlPages()).filter(({ html }) =>
    /<article class="prose"/.test(html),
  );
}
