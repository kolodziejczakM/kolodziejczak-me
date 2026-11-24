import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { preferredLocale } from "../src/lib/i18n.ts";
import { output } from "./helpers/output.ts";

test("root redirects before loading modules and shows language choices only without JavaScript", async () => {
  const html = await output("index.html");
  const script = html.match(
    /<script\b[^>]*data-language-redirect[^>]*>([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(
    script,
    "The redirect must be inline so it never waits for a module.",
  );
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1];
  assert.ok(body);
  const fallback = body.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
  assert.ok(fallback);
  assert.match(fallback, /href="\/pl\/"/);
  assert.match(fallback, /href="\/en\/"/);
  const beforeRedirect = body.replace(/<noscript>[\s\S]*?<\/noscript>/g, "");
  assert.match(beforeRedirect, /class="background-surface"/);
  assert.doesNotMatch(beforeRedirect, /<(?:main|h1|p|a|img|button)\b/);

  for (const browser of [
    { languages: ["pl-PL", "en"] },
    { languages: ["PL-pl"] },
    { languages: ["en-GB", "pl"] },
    { languages: ["de-DE", "pl"] },
    { languages: [], language: "pl" },
    { language: "fr-FR" },
    {},
  ]) {
    let destination: string | undefined;
    runInNewContext(script, {
      navigator: browser,
      window: {
        location: {
          search: "?utm_source=example",
          hash: "#contact",
          replace: (url: string) => {
            destination = url;
          },
        },
      },
    });
    assert.equal(
      destination,
      `/${preferredLocale(browser)}/?utm_source=example#contact`,
    );
  }
});
