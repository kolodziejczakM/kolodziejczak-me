import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile, mkdir, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { site } from "../src/config/site.ts";
import { jsonLd, pageGraph } from "../src/lib/seo.ts";
import { rss, sitemap } from "../src/lib/discovery.ts";
import { isPublished, validatePublication } from "../src/lib/publication.ts";
import { articlePages, htmlPages, output } from "./helpers/output.ts";
import type { Article } from "../src/lib/articles.ts";

const article: Article = {
  id: "pl/real",
  collection: "articles",
  data: {
    locale: "pl",
    title: 'Film & AI: "próba" </script>',
    description: "Jedna myśl < druga & trzecia.",
    translationKey: "real",
    urlSlug: "prawdziwy-artykul",
    category: "film",
    sample: false,
    draft: false,
    publishedAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-02"),
    summary: ["1", "2", "3", "4", "5"],
    prompt: "Wyjaśnij.",
    hero: {
      src: { src: "/image.jpg", width: 1600, height: 900, format: "jpg" },
      alt: "Film",
      photographer: site.name,
      source: site.origin,
    },
  },
};

test("JSON-LD cannot close its script and real articles carry author, dates and canonical identity", () => {
  const graph = pageGraph(
    {
      locale: "pl",
      path: "/pl/blog/prawdziwy-artykul/",
      title: article.data.title,
      description: article.data.description,
      kind: "article",
      article,
    },
    `${site.origin}/image.jpg`,
  );
  const encoded = jsonLd(graph);
  assert.doesNotMatch(encoded, /<\/script>/);
  const posting = JSON.parse(encoded)["@graph"].find(
    (entry: { "@type": string }) => entry["@type"] === "BlogPosting",
  );
  assert.equal(posting.headline, article.data.title);
  assert.equal(posting.author.name, site.name);
  assert.equal(posting.datePublished, "2026-01-01T00:00:00.000Z");
  assert.equal(posting.dateModified, "2026-01-02T00:00:00.000Z");
  assert.equal(
    posting.mainEntityOfPage["@id"],
    `${site.origin}/pl/blog/prawdziwy-artykul/#webpage`,
  );
});

test("discovery includes real posts, escapes XML and excludes samples and internal routes", () => {
  const sample: Article = {
    ...article,
    id: "sample",
    data: { ...article.data, sample: true, urlSlug: "sample-only" },
  };
  const feed = rss([article, sample], "pl");
  assert.match(feed, /Film &amp; AI/);
  assert.match(feed, /&lt;\/script&gt;/);
  assert.doesNotMatch(feed, /sample-only|design/);
  assert.doesNotMatch(rss([article], "en"), /<item>/);
  assert.doesNotMatch(sitemap([article], false), /<url>/);
  const map = sitemap([article, sample], true);
  assert.match(map, /\/pl\/blog\/prawdziwy-artykul\//);
  assert.doesNotMatch(map, /design|404|sample-only|rss/);
});

test("publication skips drafts and future dates and blocks release of sample content", async () => {
  const now = new Date("2026-02-01");
  assert.equal(isPublished(article.data, now), true);
  assert.equal(isPublished({ ...article.data, draft: true }, now), false);
  assert.equal(
    isPublished({ ...article.data, publishedAt: new Date("2027-01-01") }, now),
    false,
  );
  await assert.rejects(
    validatePublication(
      [{ ...article, data: { ...article.data, sample: true } }],
      true,
    ),
    /real articles only/,
  );
  await assert.rejects(validatePublication([], true), /real articles only/);
});

test("missing and empty narration fail the build; a nonempty local file passes", async () => {
  const directory = await mkdtemp(`${tmpdir()}/article-audio-`);
  const base = pathToFileURL(`${directory}/`);
  const narrated: Article = {
    ...article,
    data: {
      ...article.data,
      audio: { pl: { src: "/audio/test.wav", durationSeconds: 1 } },
    },
  };
  try {
    await assert.rejects(
      validatePublication([narrated], false, base),
      /Missing or empty audio/,
    );
    await mkdir(`${directory}/audio`);
    await writeFile(`${directory}/audio/test.wav`, "");
    await assert.rejects(
      validatePublication([narrated], false, base),
      /Missing or empty audio/,
    );
    await writeFile(`${directory}/audio/test.wav`, "RIFF");
    await validatePublication([narrated], true, base);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("public pages expose absolute social previews, canonical URLs, feeds and parseable JSON-LD", async () => {
  for (const { path, html } of await htmlPages()) {
    if (path === "404.html" || path.startsWith("design/")) continue;
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /rel="canonical" href="https:\/\/kolodziejczak.me\//);
    assert.match(html, /hreflang="pl"/);
    assert.match(html, /hreflang="en"/);
    assert.match(html, /hreflang="x-default"/);
    assert.match(
      html,
      /property="og:url" content="https:\/\/kolodziejczak.me\//,
    );
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /type="application\/rss\+xml"/);
    const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    assert.ok(image);
    assert.ok(
      (
        await stat(
          new URL(`../dist${new URL(image).pathname}`, import.meta.url),
        )
      ).size > 0,
    );
    const script = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )?.[1];
    assert.ok(script);
    assert.equal(JSON.parse(script)["@context"], "https://schema.org");
    if (!site.readyToPublish)
      assert.match(html, /name="robots" content="noindex,follow"/);
  }
});

test("design reference remains noindex, unlinked, and absent from discovery documents", async () => {
  const design = await output("design/index.html");
  assert.match(design, /name="robots" content="noindex,nofollow"/);
  for (const { path, html } of await htmlPages()) {
    if (!path.startsWith("design/"))
      assert.doesNotMatch(html, /href="\/design\/?["#]/);
  }
  for (const path of ["sitemap.xml", "pl/rss.xml", "en/rss.xml"]) {
    assert.doesNotMatch(await output(path), /\/design/);
  }
  assert.doesNotMatch(await output("robots.txt"), /Disallow:\s*\/design/);
});
