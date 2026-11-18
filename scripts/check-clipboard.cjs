// Run against a built preview. Requires a separately installed Playwright/Chromium.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const upstream = process.env.CLIPBOARD_TEST_URL || "http://100.113.202.72:4322";
const probeOrigin = "http://localhost:4399";
const secureOrigin = "https://clipboard-preview.test";

(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  try {
    for (const scenario of ["http", "secure", "async-denied", "all-denied"]) {
      const secure = scenario !== "http";
      const base = secure ? secureOrigin : upstream;
      const context = await browser.newContext({
        locale: "pl-PL",
        reducedMotion: "reduce",
      });
      try {
        // A same-context, trustworthy localhost page reads the real browser clipboard,
        // even when the article itself runs over insecure HTTP.
        await context.grantPermissions(["clipboard-read", "clipboard-write"], {
          origin: probeOrigin,
        });
        await context.route(probeOrigin + "/**", (route) =>
          route.fulfill({
            contentType: "text/html",
            body: "<!doctype html><title>Clipboard probe</title>",
          }),
        );
        if (secure) {
          await context.grantPermissions(
            ["clipboard-read", "clipboard-write"],
            { origin: secureOrigin },
          );
          // Route the real built site through a synthetic HTTPS origin to exercise
          // the native Clipboard API without requiring a deployed TLS certificate.
          await context.route(secureOrigin + "/**", async (route) => {
            const url = new URL(route.request().url());
            const response = await route.fetch({
              url: new URL(url.pathname + url.search, upstream).href,
            });
            await route.fulfill({ response });
          });
        }
        await context.addInitScript((mode) => {
          if (location.hostname === "localhost") return;
          // This regression checks copying rather than the OS share sheet.
          Object.defineProperty(navigator, "share", {
            value: undefined,
            configurable: true,
          });
          window.copyCommandCalls = 0;
          const original = document.execCommand.bind(document);
          document.execCommand = (command, ...args) => {
            if (command === "copy") {
              window.copyCommandCalls++;
              if (mode === "all-denied") return false;
            }
            return original(command, ...args);
          };
          if (mode === "async-denied" || mode === "all-denied") {
            Object.defineProperty(navigator.clipboard, "writeText", {
              value: () =>
                Promise.reject(
                  new DOMException("Test denial", "NotAllowedError"),
                ),
            });
          }
        }, scenario);
        const probe = await context.newPage();
        await probe.goto(probeOrigin + "/probe");
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(base + "/pl/blog/mniej-ale-lepiej/");
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.evaluate(() => isSecureContext), secure);
        assert.equal(await page.evaluate(() => !!navigator.clipboard), secure);
        for (const name of ["prompt", "share"]) {
          await probe.bringToFront();
          await probe.evaluate(() =>
            navigator.clipboard.writeText("clipboard-before-click"),
          );
          await page.bringToFront();
          if (name === "prompt")
            await page.locator('[data-dialog="prompt"] summary').click();
          const button = page.locator(
            name === "prompt" ? "dialog [data-copy]" : "[data-share-action]",
          );
          const fieldId =
            name === "prompt"
              ? await button.getAttribute("data-copy")
              : "article-url";
          const expected = await page.locator("#" + fieldId).inputValue();
          const message = await button.getAttribute(
            scenario === "all-denied" ? "data-copy-error" : "data-copied",
          );
          await button.click();
          await page.waitForFunction(
            (text) =>
              document.querySelector('[role="tooltip"]')?.textContent === text,
            message,
          );
          assert.equal(
            await button.evaluate(
              (element) => element === document.activeElement,
            ),
            true,
          );
          await probe.bringToFront();
          const copied = await probe.evaluate(() =>
            navigator.clipboard.readText(),
          );
          assert.equal(
            copied,
            scenario === "all-denied" ? "clipboard-before-click" : expected,
            `${scenario}/${name}: incorrect clipboard content`,
          );
          await page.bringToFront();
          await page.keyboard.press("Escape");
          console.log(
            `${scenario}/${name}: ${scenario === "all-denied" ? "honest error; clipboard unchanged" : "actual clipboard content verified"}`,
          );
        }
        const legacyCalls = await page.evaluate(() => window.copyCommandCalls);
        assert.equal(legacyCalls, scenario === "secure" ? 0 : 2);
        assert.deepEqual(errors, []);
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
