import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://kolodziejczak.me",
  output: "static",
  trailingSlash: "always",
  integrations: [mdx()],
  i18n: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  devToolbar: { enabled: false },
});
