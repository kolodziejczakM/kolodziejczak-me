import type {
  SatteriProcessorOptions,
  satteriCollectHastText,
} from "@astrojs/markdown-satteri";
type Plugin = Extract<
  NonNullable<SatteriProcessorOptions["hastPlugins"]>[number],
  { name: string }
>;
type HeadingChild = Extract<
  Parameters<typeof satteriCollectHastText>[0],
  { type: "element" }
>["children"][number];

/** Split at a text offset without discarding emphasis, code or existing links. */
function splitHeading(
  children: readonly HeadingChild[],
  offset: number,
  textContent: (node: HeadingChild) => string,
): [HeadingChild[], HeadingChild[]] {
  const before: HeadingChild[] = [];
  const after: HeadingChild[] = [];
  for (const child of children) {
    const length = textContent(child).length;
    if (offset <= 0) after.push(child);
    else if (offset >= length) before.push(child);
    else if (child.type === "text") {
      before.push({ ...child, value: child.value.slice(0, offset) });
      after.push({ ...child, value: child.value.slice(offset) });
    } else if ("children" in child) {
      const [start, end] = splitHeading(child.children, offset, textContent);
      before.push({ ...child, children: start });
      after.push({ ...child, children: end });
    }
    offset -= length;
  }
  return [before, after];
}

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
        const lastWord = ctx.textContent(node).match(/\S+\s*$/);
        if (!lastWord) return;
        const [before, tail] = splitHeading(
          node.children,
          lastWord.index!,
          (child) => ctx.textContent(child),
        );
        // CSS supplies the decorative # so it does not enter the table of contents.
        const link: HeadingChild = {
          type: "element",
          tagName: "a",
          properties: {
            href: `#${id}`,
            className: ["heading-permalink"],
            "aria-label": en ? "Link to this section" : "Link do tej sekcji",
          },
          children: [],
        };
        return {
          ...node,
          properties: { ...node.properties, "data-article-heading": true },
          children: [
            ...before,
            {
              type: "element",
              tagName: "span",
              properties: { className: ["heading-tail"] },
              children: [...tail, link],
            },
          ],
        };
      },
    },
  };
}
