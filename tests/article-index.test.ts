import test from "node:test";
import assert from "node:assert/strict";
import {
  articlePath,
  translationOf,
  validateArticleIndex,
} from "../src/lib/article-index.ts";
import {
  formatDate,
  formatDuration,
  formatReadingTime,
  preferredLocale,
} from "../src/lib/i18n.ts";

const pl = {
  data: {
    locale: "pl" as const,
    translationKey: "thinking",
    urlSlug: "mniej-ale-lepiej",
  },
};
const en = {
  data: {
    locale: "en" as const,
    translationKey: "thinking",
    urlSlug: "less-but-better",
  },
};

test("browser language uses its first preference, Polish variants or English fallback", () => {
  assert.equal(preferredLocale({ languages: ["pl-PL", "en"] }), "pl");
  assert.equal(preferredLocale({ languages: ["PL-pl"] }), "pl");
  assert.equal(preferredLocale({ languages: ["en-GB", "pl"] }), "en");
  assert.equal(preferredLocale({ languages: ["de-DE", "pl"] }), "en");
  assert.equal(preferredLocale({ languages: [], language: "pl" }), "pl");
  assert.equal(preferredLocale({ language: "fr-FR" }), "en");
  assert.equal(preferredLocale({}), "en");
});

test("language links pair translations by key, with independent localized slugs", () => {
  validateArticleIndex([pl, en]);
  assert.equal(
    articlePath(translationOf([pl, en], pl, "en")),
    "/en/blog/less-but-better/",
  );
  assert.equal(
    articlePath(translationOf([pl, en], en, "pl")),
    "/pl/blog/mniej-ale-lepiej/",
  );
});
test("a missing published translation fails instead of linking to an unrelated article", () => {
  assert.throws(() => validateArticleIndex([pl]), /Missing en translation/);
  assert.throws(() => translationOf([pl], pl, "en"), /Missing en translation/);
});
test("duplicate URLs and duplicate language entries cannot silently shadow each other", () => {
  assert.throws(
    () =>
      validateArticleIndex([
        pl,
        en,
        { data: { ...pl.data, translationKey: "different" } },
      ]),
    /Duplicate article URL/,
  );
  assert.throws(
    () =>
      validateArticleIndex([
        pl,
        en,
        { data: { ...en.data, urlSlug: "another-slug" } },
      ]),
    /Duplicate translation/,
  );
});
test("dates use UTC and narration duration uses supplied seconds", () => {
  assert.equal(
    formatDate(new Date("2026-10-12T00:00:00Z"), "pl"),
    "12.10.2026",
  );
  assert.equal(formatDuration(367), "6:07");
});

test("reading time rounds narration up to whole minutes in the page language", () => {
  assert.equal(formatReadingTime(300, "pl"), "5 minut");
  assert.equal(formatReadingTime(60, "pl"), "1 minuta");
  assert.equal(formatReadingTime(61, "pl"), "2 minuty");
  assert.equal(formatReadingTime(302, "en"), "6 minutes");
});
