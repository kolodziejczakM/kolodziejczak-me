import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const output = (path: string) =>
  readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");

test("built article contains the MDX body, component and code before any browser JS", async () => {
  const html = await output("pl/blog/mniej-ale-lepiej/index.html");
  assert.match(html, /<h1[^>]*>Mniej kodu\. Więcej myślenia\.<\/h1>/);
  assert.match(html, /Otwierasz edytor\. Masz pomysł, kawę/);
  assert.match(html, /<aside class="callout"/);
  assert.match(html, /Opisz go bez używania nazw technologii/);
  assert.match(html, /<pre[^>]*[\s\S]*const/);
  assert.doesNotMatch(
    html,
    /prototypes\/|id="app"|prototype-switcher|react-dom/,
  );
});
test("static HTML has reciprocal language URLs and native reading fallbacks", async () => {
  const pl = await output("pl/blog/mniej-ale-lepiej/index.html");
  const en = await output("en/blog/less-but-better/index.html");
  assert.match(pl, /<html lang="pl">/);
  assert.match(en, /<html lang="en">/);
  assert.match(
    pl,
    /hreflang="en" href="https:\/\/kolodziejczak.me\/en\/blog\/less-but-better\/"/,
  );
  assert.match(
    en,
    /hreflang="pl" href="https:\/\/kolodziejczak.me\/pl\/blog\/mniej-ale-lepiej\/"/,
  );
  assert.match(pl, /href="\/en\/blog\/less-but-better\/"/);
  assert.match(pl, /<details[^>]+data-dialog="tldr"/);
  assert.match(pl, /<textarea[^>]*id="article-prompt"[^>]*readonly/);
  assert.match(pl, /name="robots" content="noindex,follow"/);
  assert.doesNotMatch(pl, /\?variant=|\?controls=/);
});
test("root language choice and all three translated article routes are physical HTML", async () => {
  const root = await output("index.html");
  assert.match(root, /href="\/pl\/"/);
  assert.match(root, /href="\/en\/"/);
  for (const path of [
    "pl/blog/bardziej-ludzki-internet",
    "en/blog/a-more-human-internet",
    "pl/blog/montaz-i-interfejsy",
    "en/blog/editing-and-interfaces",
  ]) {
    assert.match(await output(`${path}/index.html`), /<article class="prose"/);
  }
});

test("read-next links never point back to the article being read", async () => {
  for (const path of [
    "pl/blog/mniej-ale-lepiej",
    "en/blog/less-but-better",
    "pl/blog/bardziej-ludzki-internet",
    "en/blog/a-more-human-internet",
    "pl/blog/montaz-i-interfejsy",
    "en/blog/editing-and-interfaces",
  ]) {
    const html = await output(`${path}/index.html`);
    const next = html.match(/class="read-next"[\s\S]*?<a href="([^"]+)"/);
    assert.ok(next, `Missing next article in ${path}`);
    assert.notEqual(next[1], `/${path}/`);
    await output(`${next[1].slice(1)}index.html`);
  }
});
