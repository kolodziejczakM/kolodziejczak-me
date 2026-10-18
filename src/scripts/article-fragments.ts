import { copyField } from "./clipboard";
import { showFeedback } from "./feedback";

export function setupArticleFragments() {
  const article = document.querySelector<HTMLElement>("[data-reading-content]");
  if (!article) return;
  const field = document.createElement("textarea");
  field.className = "sr-only";
  field.tabIndex = -1;
  field.setAttribute("aria-hidden", "true");
  field.readOnly = true;
  document.body.append(field);
  article
    .querySelectorAll<HTMLButtonElement>("[data-copy-quote]")
    .forEach((button) => {
      button.hidden = false;
      button.addEventListener("click", async () => {
        const quote = button.closest("[data-article-quote]")!;
        field.value = quote
          .querySelector<HTMLElement>(".quote-text")!
          .innerText.trim();
        try {
          await copyField(field);
          showFeedback(button, button.dataset.copied!);
        } catch {
          showFeedback(button, button.dataset.copyError!);
        }
      });
    });
  article
    .querySelectorAll<HTMLAnchorElement>("[data-fragment-link]")
    .forEach((link) => {
      link.addEventListener("click", async (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
          return;
        const url = new URL(link.href);
        field.value = url.href;
        try {
          await copyField(field);
          showFeedback(link, link.dataset.copied!);
        } catch {
          showFeedback(link, link.dataset.copyError!);
        }
      });
    });
  article.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = event.target as HTMLElement;
    if (
      target.closest("a,button,input,textarea,select") ||
      getSelection()?.toString()
    )
      return;
    const section = target.closest<HTMLElement>(
      "[data-article-heading], [data-article-quote]",
    );
    if (!section?.id) return;
    location.hash = section.id;
  });
}
