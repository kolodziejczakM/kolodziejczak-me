import { site } from "../src/config/site.ts";

const actual = new URL(
  process.env.PAGES_BASE_URL ?? "https://invalid.invalid/",
);
const expected = new URL(site.origin);
if (
  actual.hostname !== expected.hostname ||
  actual.pathname.replace(/\/$/, "") !== ""
) {
  throw new Error(
    `Set the GitHub Pages custom domain to ${expected.hostname} before deploying. This site uses the root of the custom domain, not a /repository/ base path.`,
  );
}
console.log(`GitHub Pages custom domain confirmed: ${expected.hostname}`);
