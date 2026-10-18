const motionToggle = document.querySelector<HTMLButtonElement>(
  "[data-background-motion-toggle]",
);
if (motionToggle) {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const key = "site.background-motion";
  let paused = false;
  try {
    paused = sessionStorage.getItem(key) === "paused";
  } catch {
    /* Storage may be disabled. */
  }
  function updateMotion() {
    document.documentElement.dataset.backgroundMotion =
      paused || reducedMotion.matches ? "paused" : "running";
    motionToggle!.hidden = reducedMotion.matches;
    motionToggle!.textContent = paused
      ? motionToggle!.dataset.resume!
      : motionToggle!.dataset.pause!;
  }
  motionToggle.addEventListener("click", () => {
    paused = !paused;
    try {
      sessionStorage.setItem(key, paused ? "paused" : "running");
    } catch {
      /* The current page still responds. */
    }
    updateMotion();
  });
  reducedMotion.addEventListener("change", updateMotion);
  updateMotion();
}
