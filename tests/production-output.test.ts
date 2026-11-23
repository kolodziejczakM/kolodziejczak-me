import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { site } from "../src/config/site.ts";
import { output, outputFile, htmlPages } from "./helpers/output.ts";

test("production excludes example routes and text while preserving the private example preview", async () => {
  const directory = new URL("../src/content/articles/", import.meta.url);
  for (const path of await readdir(directory, { recursive: true })) {
    if (!path.endsWith(".mdx")) continue;
    const source = await readFile(new URL(path, directory), "utf8");
    if (!/^sample:\s*true\s*$/m.test(source)) continue;
    const locale = source.match(/^locale:\s*"?(pl|en)"?\s*$/m)?.[1];
    const slug = source.match(/^urlSlug:\s*"([a-z0-9-]+)"\s*$/m)?.[1];
    assert.ok(locale && slug);
    const route = `${locale}/blog/${slug}/index.html`;
    if (site.readyToPublish)
      await assert.rejects(access(outputFile(route)), { code: "ENOENT" });
    else if (/^draft:\s*false\s*$/m.test(source))
      await access(outputFile(route));
  }
  if (site.readyToPublish) {
    for (const { html } of await htmlPages())
      assert.doesNotMatch(
        html,
        /data-audio-preview|agent-placeholder|Sample articles showing|Przykładowe publikacje pokazujące/,
      );
  }
});

test("production can launch with no real articles and still has useful navigation", async () => {
  if (!site.readyToPublish) return;
  for (const locale of ["pl", "en"]) {
    const home = await output(`${locale}/index.html`);
    const blog = await output(`${locale}/blog/index.html`);
    if (!/class="article-card"/.test(blog)) {
      assert.doesNotMatch(home, /class="latest"/);
      assert.match(home, /class="button button-primary" href="#contact"/);
      assert.match(
        blog,
        /class="filter-empty" data-filter-empty role="status">/,
      );
      assert.doesNotMatch(blog, /data-filters/);
    }
    assert.match(home, /content="index,follow,max-image-preview:large"/);
  }
});
