/** Keep complete code in the static HTML; collapse only when JS can expand it. */
export function enhanceCodeBlocks() {
  const updates: (() => void)[] = [];
  const pl = document.documentElement.lang === "pl";
  document
    .querySelectorAll<HTMLPreElement>(".prose pre")
    .forEach((pre, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "code-block";
      pre.before(wrapper);
      wrapper.append(pre);
      pre.id ||= `article-code-${index + 1}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-toggle";
      button.setAttribute("aria-controls", pre.id);
      button.hidden = true;
      wrapper.append(button);
      let expanded = false;
      function update() {
        const limit = parseFloat(
          getComputedStyle(wrapper).getPropertyValue("--code-preview-height"),
        );
        const long = pre.scrollHeight > limit + 1;
        wrapper.dataset.collapsed = String(long && !expanded);
        button.hidden = !long;
        button.setAttribute("aria-expanded", String(expanded));
        button.textContent = expanded
          ? pl
            ? "Zwiń kod"
            : "Collapse code"
          : pl
            ? "Rozwiń kod"
            : "Expand code";
      }
      button.addEventListener("click", () => {
        expanded = !expanded;
        update();
        if (!expanded && wrapper.getBoundingClientRect().top < 0)
          wrapper.scrollIntoView({ block: "start", behavior: "instant" });
      });
      updates.push(update);
    });
  const updateAll = () => updates.forEach((update) => update());
  document.fonts.ready.then(updateAll);
  window.addEventListener("resize", updateAll);
}
