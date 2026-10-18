import { copyField } from "./clipboard";
import { showFeedback } from "./feedback";

export function setupSharing() {
  document.querySelectorAll<HTMLElement>("[data-sharing]").forEach((root) => {
    const button = root.querySelector<HTMLButtonElement>(
      "[data-share-action]",
    )!;
    const field = root.querySelector<HTMLInputElement>("[data-share-url]")!;
    const fallback = root.querySelector<HTMLDetailsElement>(
      "[data-share-fallback]",
    )!;
    field.value = location.href;
    field.className = "sr-only";
    field.tabIndex = -1;
    field.setAttribute("aria-hidden", "true");
    // Keep the fallback copy field focusable for older HTTP copy commands.
    root.append(field);
    fallback.hidden = true;
    button.hidden = false;
    const data = { title: button.dataset.title, url: location.href };
    const canShare =
      typeof navigator.share === "function" &&
      (!navigator.canShare || navigator.canShare(data));
    button.dataset.shareMode = canShare ? "native" : "copy";
    if (!canShare)
      button.querySelector("[data-share-label]")!.textContent =
        button.dataset.copyLabel!;
    button.addEventListener("click", async () => {
      if (canShare) {
        try {
          await navigator.share(data);
          return;
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError")
            return;
        }
      }
      try {
        await copyField(field);
        showFeedback(button, button.dataset.copied!);
      } catch {
        showFeedback(button, button.dataset.copyError!);
      }
    });
  });
}
