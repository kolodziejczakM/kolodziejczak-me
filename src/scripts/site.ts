import { hideFeedback, showFeedback } from "./feedback";
import { setupSharing } from "./sharing";
import { setupReadingSwitcher } from "./reading-switcher";
import { copyField } from "./clipboard";
import { enhanceCodeBlocks } from "./code-blocks";

document.documentElement.classList.add("js");
setupReadingSwitcher();
setupSharing();

// The complete document is already HTML. These are optional enhancements only.
const filters = document.querySelector<HTMLElement>("[data-filters]");
if (filters) {
  filters.hidden = false;
  filters.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>(
      "[data-filter]",
    );
    if (!button) return;
    let count = 0;
    document
      .querySelectorAll<HTMLElement>("[data-article-category]")
      .forEach((article) => {
        article.hidden =
          button.dataset.filter !== "all" &&
          article.dataset.articleCategory !== button.dataset.filter;
        if (!article.hidden) count++;
      });
    filters
      .querySelectorAll("button")
      .forEach((item) =>
        item.setAttribute("aria-pressed", String(item === button)),
      );
    const empty = document.querySelector<HTMLElement>("[data-filter-empty]");
    if (empty) empty.hidden = count > 0;
    const status = document.querySelector<HTMLElement>("[data-filter-status]");
    if (status) status.textContent = `${status.dataset.format} ${count}`;
  });
}

const nudge = document.querySelector<HTMLElement>("[data-language-nudge]");
const internalArrival =
  document.referrer && new URL(document.referrer).origin === location.origin;
const preference = (navigator.languages?.[0] ?? navigator.language).slice(0, 2);
if (nudge && !internalArrival && preference === nudge.dataset.otherLocale)
  nudge.hidden = false;
document
  .querySelector("[data-dismiss-language]")
  ?.addEventListener("click", () => {
    if (nudge) nudge.hidden = true;
  });

// Native details are the no-JS fallback. Move the original content into a native
// dialog so IDs, labels and textareas remain unique; restore it when closed.
const dialog = document.querySelector<HTMLDialogElement>("#article-dialog");
let disclosure: HTMLDetailsElement | undefined;
if (dialog && typeof dialog.showModal === "function") {
  document
    .querySelectorAll<HTMLDetailsElement>("details[data-dialog]")
    .forEach((details) => {
      const summary = details.querySelector<HTMLElement>("summary");
      summary?.addEventListener("click", (event) => {
        event.preventDefault();
        disclosure = details;
        dialog.querySelector("#dialog-title")!.textContent =
          summary.textContent?.trim() ?? "";
        const body = details.querySelector<HTMLElement>(".disclosure-body");
        if (!body) return;
        dialog.querySelector("[data-dialog-body]")!.append(body);
        document.body.classList.add("dialog-open");
        dialog.showModal();
      });
    });
  dialog
    .querySelector(".dialog-close")
    ?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const box = dialog.getBoundingClientRect();
      if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
      )
        dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    const body = dialog.querySelector<HTMLElement>(".disclosure-body");
    if (body && disclosure) disclosure.append(body);
    document.body.classList.remove("dialog-open");
    hideFeedback();
    const status = dialog.querySelector<HTMLElement>("[data-dialog-status]");
    if (status) status.textContent = "";
    disclosure?.querySelector("summary")?.focus();
    disclosure = undefined;
  });
}

document
  .querySelectorAll<HTMLButtonElement>("[data-copy]")
  .forEach((button) => {
    button.addEventListener("click", async () => {
      const field = document.getElementById(button.dataset.copy!) as
        HTMLInputElement | HTMLTextAreaElement;
      try {
        await copyField(field);
        showFeedback(button, button.dataset.copied!);
      } catch {
        showFeedback(button, button.dataset.copyError!);
      }
    });
  });
const content = document.querySelector<HTMLElement>("[data-reading-content]");
const progress = document.querySelector<HTMLElement>("[data-reading-progress]");
const topLink = document.querySelector<HTMLElement>("[data-back-top]");
if (content && progress && topLink) {
  let scheduled = false;
  function update() {
    const box = content!.getBoundingClientRect();
    const fraction = Math.max(
      0,
      Math.min(1, -box.top / Math.max(1, box.height - innerHeight)),
    );
    progress!.style.transform = `scaleX(${fraction})`;
    topLink!.hidden = fraction <= 0.5;
    scheduled = false;
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule);
  new ResizeObserver(schedule).observe(content);
  document.fonts.ready.then(update);
  update();
}

// Wait for font loading before moving code nodes into their preview wrappers.
document.fonts.ready.then(enhanceCodeBlocks);
