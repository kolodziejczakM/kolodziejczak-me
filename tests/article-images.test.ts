import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat, readdir } from "node:fs/promises";
const output = (path: string) =>
  readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");

test("each article has a localized, responsive hero before reading time", async () => {
  for (const path of [
    "pl/blog/mniej-ale-lepiej",
    "en/blog/less-but-better",
    "pl/blog/bardziej-ludzki-internet",
    "en/blog/a-more-human-internet",
    "pl/blog/montaz-i-interfejsy",
    "en/blog/editing-and-interfaces",
  ]) {
    const html = await output(`${path}/index.html`);
    const hero = html.match(
      /<figure class="article-image article-hero">([\s\S]*?)<\/figure>/,
    )?.[1];
    assert.ok(hero, `Missing hero in ${path}`);
    assert.ok(html.indexOf("article-hero") < html.indexOf("data-reading-time"));
    assert.match(hero, /type="image\/avif"/);
    assert.match(hero, /type="image\/webp"/);
    assert.match(hero, /sizes="[^\"]*100vw/);
    assert.match(hero, /400w/);
    assert.match(hero, /1600w/);
    assert.match(hero, /width="1600" height="900"/);
    assert.match(hero, /alt="[^\"]+"/);
    assert.match(hero, /loading="eager"/);
    assert.match(hero, /fetchpriority="high"/);
    assert.match(hero, /https:\/\/unsplash.com\/photos\//);
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

test("list thumbnails and articles share unique transition names and local photos", async () => {
  const list = await output("pl/blog/index.html");
  const names = [
    ...list.matchAll(/view-transition-name:\s*(article-image-[a-z-]+)/g),
  ].map((match) => match[1]);
  assert.equal(names.length, 3);
  assert.equal(new Set(names).size, 3);
  for (const [key, path] of [
    ["less", "mniej-ale-lepiej"],
    ["web", "bardziej-ludzki-internet"],
    ["film", "montaz-i-interfejsy"],
  ]) {
    assert.ok(names.includes(`article-image-${key}`));
    assert.match(
      await output(`pl/blog/${path}/index.html`),
      new RegExp(`view-transition-name:\\s*article-image-${key}`),
    );
  }
  assert.match(list, /loading="lazy"/);
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
