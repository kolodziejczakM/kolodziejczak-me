import test from "node:test";
import assert from "node:assert/strict";
import { stat, readdir } from "node:fs/promises";
import { output, articlePages } from "./helpers/output.ts";

test("every article has a localized, responsive, local hero image", async () => {
  for (const { path, html } of await articlePages()) {
    const hero = html.match(
      /<figure class="article-image article-hero">([\s\S]*?)<\/figure>/,
    )?.[1];
    assert.ok(hero, `Missing hero in ${path}`);
    assert.match(hero, /type="image\/avif"/);
    assert.match(hero, /type="image\/webp"/);
    assert.match(hero, /sizes="[^\"]*100vw/);
    assert.match(hero, /400w/);
    assert.match(hero, /1600w/);
    assert.match(hero, /width="1600" height="900"/);
    assert.match(hero, /alt="[^\"]+"/);
    assert.match(hero, /loading="eager"/);
    assert.match(hero, /fetchpriority="high"/);
    assert.doesNotMatch(hero, /src="https?:/);
    for (const asset of new Set(
      hero.match(/\/_astro\/[a-zA-Z0-9_.-]+\.(?:avif|webp|jpg)/g),
    )) {
      assert.ok(
        (await stat(new URL(`../dist${asset}`, import.meta.url))).size > 0,
      );
    }
  }
});

test("list thumbnails and articles share unique transition names and reduced-motion support", async () => {
  const pages = await articlePages();
  for (const locale of ["pl", "en"]) {
    const list = await output(`${locale}/blog/index.html`);
    const names = [
      ...list.matchAll(/view-transition-name:\s*(article-image-[a-z0-9-]+)/g),
    ].map((match) => match[1]);
    assert.equal(new Set(names).size, names.length);
    const localPages = pages.filter(({ path }) =>
      path.startsWith(`${locale}/`),
    );
    assert.equal(names.length, localPages.length);
    for (const { html } of localPages)
      assert.ok(
        names.some((name) => html.includes(`view-transition-name: ${name}`)),
      );
    if (localPages.length) assert.match(list, /loading="lazy"/);
  }
  const files = await readdir(new URL("../dist/_astro/", import.meta.url));
  const css = (
    await Promise.all(
      files
        .filter((file) => file.endsWith(".css"))
        .map((file) => output(`_astro/${file}`)),
    )
  ).join("\n");
  assert.match(css, /@view-transition\s*\{\s*navigation:\s*auto/);
  assert.match(
    css,
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*navigation:\s*none/,
  );
});
