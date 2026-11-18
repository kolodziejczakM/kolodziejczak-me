import { readFile, readdir } from "node:fs/promises";

export const output = (path: string) =>
  readFile(new URL(`../../dist/${path}`, import.meta.url), "utf8");
export async function htmlPages() {
  const files = (
    await readdir(new URL("../../dist/", import.meta.url), { recursive: true })
  ).filter((file) => file.endsWith(".html"));
  return Promise.all(
    files.map(async (path) => ({ path, html: await output(path) })),
  );
}
export async function articlePages() {
  return (await htmlPages()).filter(({ html }) =>
    /<article class="prose"/.test(html),
  );
}
