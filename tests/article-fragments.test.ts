import test from "node:test";
import assert from "node:assert/strict";
import {
  createSatteriMarkdownProcessor,
  satteriHeadingIdsPlugin,
} from "@astrojs/markdown-satteri";
import { articleFragments } from "../src/lib/article-fragments.ts";

async function render(source: string) {
  const renderer = await createSatteriMarkdownProcessor({
    syntaxHighlight: false,
    hastPlugins: [satteriHeadingIdsPlugin(), articleFragments],
  });
  return renderer.render(source);
}
const ids = (html: string) =>
  [...html.matchAll(/<blockquote id="([^"]+)"/g)].map((match) => match[1]);

test("quote fragments survive unrelated edits and duplicate quotes get separate links", async () => {
  const source = "> A thought worth sharing.\n\n> A second thought.";
  const original = ids((await render(source)).code);
  const shifted = ids((await render("A new introduction.\n\n" + source)).code);
  const reversed = ids(
    (await render("> A second thought.\n\n> A thought worth sharing.")).code,
  );
  assert.equal(original.length, 2);
  assert.deepEqual(shifted, original);
  assert.deepEqual(reversed, [...original].reverse());
  const duplicates = ids(
    (await render("> Same thought.\n\n> Same thought.")).code,
  );
  assert.equal(duplicates.length, 2);
  assert.notEqual(duplicates[0], duplicates[1]);
});

test("heading links preserve generated slugs and clean table-of-contents labels", async () => {
  const result = await render(
    "## A heading\n\n### Another heading\n\n## A heading",
  );
  assert.match(result.code, /href="#a-heading"/);
  assert.match(result.code, /href="#another-heading"/);
  assert.equal(
    (result.code.match(/class="heading-permalink"/g) ?? []).length,
    3,
  );
  assert.deepEqual(
    result.metadata.headings.map((heading) => heading.text),
    ["A heading", "Another heading", "A heading"],
  );
  assert.equal(
    new Set(result.metadata.headings.map((heading) => heading.slug)).size,
    3,
  );
});

test("heading permalinks stay with the final word and preserve inline formatting", async () => {
  const result = await render(
    [
      "## Najpierw dobre pytanie",
      "## Projekt *na próbę*",
      "## Jak działa `AbortController`?",
      "## A [linked heading](https://example.com)",
      "## Pro**gramowanie**!",
      "## Jednowyrazowy",
    ].join("\n\n"),
  );
  assert.match(result.code, /<span class="heading-tail">pytanie<a /);
  assert.match(
    result.code,
    /<em>na <\/em><span class="heading-tail"><em>próbę<\/em><a /,
  );
  assert.match(
    result.code,
    /<span class="heading-tail"><code>AbortController<\/code>\?<a /,
  );
  assert.match(
    result.code,
    /<span class="heading-tail"><a href="https:\/\/example.com">heading<\/a><a /,
  );
  assert.match(
    result.code,
    /<span class="heading-tail">Pro<strong>gramowanie<\/strong>!<a /,
  );
  assert.match(result.code, /<span class="heading-tail">Jednowyrazowy<a /);
  assert.deepEqual(
    result.metadata.headings.map((heading) => heading.text),
    [
      "Najpierw dobre pytanie",
      "Projekt na próbę",
      "Jak działa AbortController?",
      "A linked heading",
      "Programowanie!",
      "Jednowyrazowy",
    ],
  );
});
