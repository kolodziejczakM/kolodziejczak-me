import type { SatteriProcessorOptions } from "@astrojs/markdown-satteri";
type Plugin = Extract<
  NonNullable<SatteriProcessorOptions["hastPlugins"]>[number],
  { name: string }
>;

/** Per-document state: an unrelated edit or reordering does not change quote IDs. */
export function articleFragments(): Plugin {
  const counts = new Map<string, number>();
  return {
    name: "article-fragments",
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote"],
      async visit(node, ctx) {
        const en = ctx.data.astro?.frontmatter.locale === "en";
        if (node.tagName === "blockquote") {
          if (typeof node.properties.id === "string") return;
          const text = ctx.textContent(node).replace(/\s+/g, " ").trim();
          const digest = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(text),
          );
          const hash = Array.from(new Uint8Array(digest), (byte) =>
            byte.toString(16).padStart(2, "0"),
          ).join("");
          const base = `quote-${hash.slice(0, 12)}`;
          const count = (counts.get(base) ?? 0) + 1;
          counts.set(base, count);
          ctx.setProperty(node, "id", count === 1 ? base : `${base}-${count}`);
          return;
        }
        const id = node.properties.id;
        if (typeof id !== "string") return;
        ctx.setProperty(node, "data-article-heading", true);
        // CSS supplies the decorative # so it does not enter the table of contents.
        ctx.appendChild(node, {
          type: "element",
          tagName: "a",
          properties: {
            href: `#${id}`,
            className: ["heading-permalink"],
            "aria-label": en ? "Link to this section" : "Link do tej sekcji",
          },
          children: [],
        });
      },
    },
  };
}
