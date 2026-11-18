// Run against a built preview with an externally installed Playwright package.
// BROWSER_ENGINE=webkit also checks WebKit (desktop port, not physical iOS).
const playwright = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const engine = process.env.BROWSER_ENGINE || "chromium";
const base = process.env.RESPONSIVE_TEST_URL || "http://100.113.202.72:4322";

async function checkLayout(page, label) {
  const state = await page.evaluate(() => {
    const root = document.documentElement;
    const player = document.querySelector(".audio-preview, .narration");
    const bounds = player?.getBoundingClientRect();
    return {
      width: root.clientWidth,
      scrollWidth: root.scrollWidth,
      playerWidth: bounds?.width,
      playerLeft: bounds?.left,
      playerRight: bounds?.right,
      header: [
        ...document.querySelectorAll(".site-header .brand, .site-header nav"),
      ].map((el) => {
        const rect = el.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      }),
    };
  });
  assert.ok(
    state.scrollWidth <= state.width,
    `${label}: page overflows ${JSON.stringify(state)}`,
  );
  for (const bounds of state.header)
    assert.ok(
      bounds.left >= -1 && bounds.right <= state.width + 1,
      `${label}: header outside viewport`,
    );
  if (state.playerWidth !== undefined) {
    assert.ok(
      state.playerWidth <= 560.5,
      `${label}: audio is ${state.playerWidth}px wide, maximum is 560px`,
    );
    assert.ok(
      state.playerLeft >= 0 && state.playerRight <= state.width + 1,
      `${label}: audio outside viewport`,
    );
  }
  // Check actual scrollability too, including after rotating with the page scrolled.
  await page.evaluate(() =>
    window.scrollTo({ left: 10000, top: scrollY, behavior: "instant" }),
  );
  assert.equal(
    await page.evaluate(() => scrollX),
    0,
    `${label}: can scroll horizontally`,
  );
}

(async () => {
  const browser = await playwright[engine].launch(
    engine === "chromium" ? { args: ["--no-sandbox"] } : {},
  );
  try {
    for (const locale of ["pl", "en"]) {
      for (const path of [
        "",
        "blog/",
        `blog/${locale === "pl" ? "mniej-ale-lepiej" : "less-but-better"}/`,
      ]) {
        const page = await browser.newPage({
          viewport: { width: 390, height: 844 },
          isMobile: true,
          hasTouch: true,
          locale: locale === "pl" ? "pl-PL" : "en-GB",
        });
        try {
          await page.goto(`${base}/${locale}/${path}`);
          await page.evaluate(async () => {
            await document.fonts.load("650 28px Bricolage");
            await document.fonts.load("400 16px Hanken");
            await document.fonts.ready;
          });
          for (const [width, height] of [
            [390, 844],
            [844, 390],
            [390, 844],
            [320, 740],
            [760, 360],
            [780, 360],
            [932, 430],
            [1280, 720],
            [1440, 900],
          ]) {
            await page.setViewportSize({ width, height });
            for (const time of [0, 16000, 32000]) {
              await page.evaluate((time) => {
                for (const animation of document.getAnimations()) {
                  animation.pause();
                  animation.currentTime = time;
                }
              }, time);
              await checkLayout(
                page,
                `${locale}/${path} ${width}x${height} animation=${time}`,
              );
            }
            await page.evaluate(() =>
              window.scrollTo({ top: 600, behavior: "instant" }),
            );
          }
          await page.emulateMedia({ reducedMotion: "reduce" });
          await page.setViewportSize({ width: 844, height: 390 });
          await checkLayout(page, `${locale}/${path} reduced motion`);
          console.log(
            `${engine} /${locale}/${path}: portrait, landscape, rotation, desktop passed`,
          );
        } finally {
          await page.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
