import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import { articleFragments } from "./src/lib/article-fragments.ts";
import { site } from "./src/config/site.ts";

export default defineConfig({
  site: site.origin,
  output: "static",
  trailingSlash: "always",
  integrations: [mdx()],
  markdown: {
    processor: satteri({
      hastPlugins: [satteriHeadingIdsPlugin(), articleFragments],
    }),
  },
  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
