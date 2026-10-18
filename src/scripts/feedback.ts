let tooltip: HTMLDivElement | undefined;
let anchor: HTMLElement | undefined;
let previousDescription: string | null = null;
let liveStatus: HTMLElement | null = null;
let timer: ReturnType<typeof setTimeout>;

export function hideFeedback() {
  clearTimeout(timer);
  tooltip?.remove();
  tooltip = undefined;
  if (liveStatus) liveStatus.textContent = "";
  liveStatus = null;
  if (anchor) {
    if (previousDescription === null)
      anchor.removeAttribute("aria-describedby");
    else anchor.setAttribute("aria-describedby", previousDescription);
  }
  anchor = undefined;
}

export function showFeedback(button: HTMLElement, message: string) {
  hideFeedback();
  anchor = button;
  previousDescription = button.getAttribute("aria-describedby");
  tooltip = document.createElement("div");
  tooltip.id = "action-tooltip";
  tooltip.className = "action-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.textContent = message;
  const host =
    button.closest<HTMLDialogElement>("dialog[open]") ?? document.body;
  host.append(tooltip);
  // A popover stays above the native dialog and is not clipped by its scroll area.
  if (typeof tooltip.showPopover === "function") {
    tooltip.setAttribute("popover", "manual");
    tooltip.showPopover();
  }
  button.setAttribute(
    "aria-describedby",
    [previousDescription, tooltip.id].filter(Boolean).join(" "),
  );
  const box = button.getBoundingClientRect();
  const size = tooltip.getBoundingClientRect();
  const left = Math.max(
    12,
    Math.min(
      innerWidth - size.width - 12,
      box.left + box.width / 2 - size.width / 2,
    ),
  );
  const above = box.top >= size.height + 20;
  const top = above ? box.top - size.height - 10 : box.bottom + 10;
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${Math.max(8, Math.min(innerHeight - size.height - 8, top))}px`;
  tooltip.dataset.placement = above ? "above" : "below";
  tooltip.style.setProperty(
    "--tooltip-arrow",
    `${Math.max(10, Math.min(size.width - 10, box.left + box.width / 2 - left))}px`,
  );
  liveStatus =
    host === document.body
      ? document.querySelector<HTMLElement>("#status")
      : host.querySelector<HTMLElement>("[data-action-status]");
  const currentTooltip = tooltip;
  requestAnimationFrame(() => {
    if (tooltip === currentTooltip && liveStatus)
      liveStatus.textContent = message;
  });
  timer = setTimeout(hideFeedback, 3000);
}

addEventListener("scroll", hideFeedback, { capture: true, passive: true });
addEventListener("resize", hideFeedback);
addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideFeedback();
});
