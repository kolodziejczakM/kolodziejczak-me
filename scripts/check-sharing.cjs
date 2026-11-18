// Exercises browser share routing; OS sheets are stubbed because headless Chromium
// cannot automate platform UI. Clipboard copying is checked separately.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const upstream = process.env.CLIPBOARD_TEST_URL || "http://100.113.202.72:4322";
const origin = "https://share-preview.test";
(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  try {
    // First-click HTTP fallback must keep its tooltip through queued auto-scroll.
    const httpPage = await browser.newPage({
      locale: "pl-PL",
      viewport: { width: 390, height: 900 },
      reducedMotion: "reduce",
    });
    await httpPage.goto(upstream + "/pl/blog/mniej-ale-lepiej/");
    await httpPage.evaluate(() => document.fonts.ready);
    await httpPage.locator("[data-share-action]").click();
    await httpPage.waitForTimeout(150);
    assert.equal(
      await httpPage.locator('[role="tooltip"]').isVisible(),
      true,
      "HTTP copy tooltip disappeared after click auto-scroll",
    );
    await httpPage.close();
    console.log("http-tooltip: passed");
    for (const mode of ["shared", "cancelled", "failed", "unsupported"]) {
      const context = await browser.newContext({
        locale: "en-GB",
        reducedMotion: "reduce",
      });
      try {
        await context.grantPermissions(["clipboard-read", "clipboard-write"], {
          origin,
        });
        await context.route(origin + "/**", async (route) => {
          const url = new URL(route.request().url());
          await route.fulfill({
            response: await route.fetch({
              url: upstream + url.pathname + url.search,
            }),
          });
        });
        await context.addInitScript((mode) => {
          window.shareCalls = [];
          window.copyCalls = 0;
          const write = navigator.clipboard.writeText.bind(navigator.clipboard);
          Object.defineProperty(navigator.clipboard, "writeText", {
            value: (text) => {
              window.copyCalls++;
              return write(text);
            },
          });
          Object.defineProperty(navigator, "canShare", {
            value: () => mode !== "unsupported",
          });
          Object.defineProperty(navigator, "share", {
            value: async (data) => {
              window.shareCalls.push({
                ...data,
                active: navigator.userActivation.isActive,
              });
              if (mode === "cancelled")
                throw new DOMException("Test cancellation", "AbortError");
              if (mode === "failed")
                throw new DOMException("Test failure", "NotAllowedError");
            },
          });
        }, mode);
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(origin + "/en/blog/less-but-better/");
        await page.evaluate(() => document.fonts.ready);
        await page.locator("[data-share-action]").click();
        await page.waitForFunction(
          () => window.shareCalls.length > 0 || window.copyCalls > 0,
        );
        if (mode === "failed" || mode === "unsupported")
          await page.waitForSelector('[role="tooltip"]');
        const state = await page.evaluate(() => ({
          calls: window.shareCalls,
          copies: window.copyCalls,
          modal: !!document.querySelector("dialog[open]"),
          tooltip: document.querySelector('[role="tooltip"]')?.textContent,
        }));
        assert.equal(state.modal, false);
        assert.equal(state.calls.length, mode === "unsupported" ? 0 : 1);
        if (state.calls.length) {
          assert.equal(state.calls[0].active, true);
          assert.equal(
            state.calls[0].url,
            origin + "/en/blog/less-but-better/",
          );
          assert.equal(state.calls[0].title, "Less code. More thinking.");
        }
        assert.equal(
          state.copies,
          mode === "failed" || mode === "unsupported" ? 1 : 0,
        );
        if (mode === "cancelled" || mode === "shared")
          assert.equal(state.tooltip, undefined);
        else assert.match(state.tooltip, /Link copied/);
        assert.deepEqual(errors, []);
        console.log(mode + ": passed");
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
