import test from "node:test";
import assert from "node:assert/strict";
import { articlePages, htmlPages, output } from "./helpers/output.ts";
import { site } from "../src/config/site.ts";

// Discover actual output so replacing the sample articles never breaks publishing.
test("articles contain their body, reading tools and reciprocal translations in static HTML", async () => {
  const pages = await articlePages();
  for (const { path, html } of pages) {
    assert.match(html, /<h1[^>]*>[^<]+<\/h1>/);
    assert.match(html, /<article class="prose"[^>]*>[\s\S]*<(p|h2)[ >]/);
    assert.match(html, /<details[^>]+data-accordion="tldr"/);
    assert.match(html, /<textarea[^>]*id="article-prompt"[^>]*readonly/);
    assert.ok(
      html.indexOf('data-accordion="tldr"') <
        html.indexOf('data-accordion="contents"'),
    );
    assert.doesNotMatch(
      html,
      /prototypes\/|prototype-switcher|react-dom|about\.me|\?variant=/,
    );
    const locale = path.startsWith("pl/") ? "pl" : "en";
    const other = locale === "pl" ? "en" : "pl";
    assert.match(html, new RegExp(`<html lang="${locale}">`));
    const otherUrl = html.match(
      new RegExp(`hreflang="${other}" href="([^"]+)"`),
    )?.[1];
    assert.ok(otherUrl);
    const translated = await output(
      `${new URL(otherUrl).pathname.slice(1)}index.html`,
    );
    assert.ok(
      translated.includes(`${site.origin}/${path.replace(/index.html$/, "")}`),
    );
    if (!site.readyToPublish)
      assert.match(html, /name="robots" content="noindex,follow"/);
  }
});

test("root language choice and all local navigation targets are real output files", async () => {
  const root = await output("index.html");
  assert.match(root, /href="\/pl\/"/);
  assert.match(root, /href="\/en\/"/);
  for (const { html } of await htmlPages()) {
    for (const [, href] of html.matchAll(
      /<a\b[^>]*\bhref="(\/[^"#?]*)[^\"]*"/g,
    )) {
      const target = href.endsWith("/")
        ? `${href.slice(1)}index.html`
        : href.slice(1);
      await output(target);
    }
  }
});

test("read-next links exist only when another article is available and never point to themselves", async () => {
  const pages = await articlePages();
  for (const { path, html } of pages) {
    const next = html.match(/class="read-next"[\s\S]*?<a href="([^"]+)"/);
    if (
      pages.filter((page) => page.path.slice(0, 3) === path.slice(0, 3))
        .length > 1
    )
      assert.ok(next);
    if (next) {
      assert.notEqual(next[1], `/${path.replace(/index.html$/, "")}`);
      await output(`${next[1].slice(1)}index.html`);
    }
  }
});

test("unconnected conversation UI remains a preview-only feature", async () => {
  for (const { html } of await articlePages()) {
    assert.match(html, /data-back-top/);
    if (site.readyToPublish)
      assert.doesNotMatch(html, /agent-placeholder|data-audio-preview/);
    else assert.match(html, /agent-placeholder/);
  }
});
