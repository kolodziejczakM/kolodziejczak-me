/** Native details remain the no-JS fallback; enhanced controls share one panel. */
export function setupReadingSwitcher() {
  document
    .querySelectorAll<HTMLElement>("[data-reading-switcher]")
    .forEach((root, group) => {
      const disclosures = [
        ...root.querySelectorAll<HTMLDetailsElement>("details[data-accordion]"),
      ];
      const controls = document.createElement("div");
      controls.className = "reading-switcher-controls";
      const panel = document.createElement("div");
      panel.id = `reading-tools-panel-${group}`;
      panel.className = "reading-switcher-panel";
      panel.setAttribute("role", "region");
      panel.hidden = true;
      const items = disclosures.map((details, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "reading-switcher-trigger";
        button.id = `reading-tools-trigger-${group}-${index}`;
        button.dataset.readingControl = details.dataset.accordion;
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", panel.id);
        const summary = details.querySelector("summary")!;
        button.append(...summary.childNodes);
        const body = details.querySelector<HTMLElement>(".accordion-body")!;
        body.hidden = true;
        panel.append(body);
        controls.append(button);
        return { button, body };
      });
      let active = -1;
      items.forEach(({ button }, index) => {
        button.addEventListener("click", () => {
          active = active === index ? -1 : index;
          items.forEach((item) => {
            const open = item === items[active];
            item.button.setAttribute("aria-expanded", String(open));
            item.body.hidden = !open;
          });
          panel.hidden = active === -1;
          if (active !== -1)
            panel.setAttribute("aria-labelledby", items[active].button.id);
        });
      });
      root.replaceChildren(controls, panel);
    });
}
