const observer = document.querySelector<HTMLElement>(".hero-observer");
const head = observer?.querySelector<SVGGElement>("[data-observer-head]");
const eyes = observer?.querySelector<SVGGElement>("[data-observer-eyes]");

if (observer && head && eyes) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  let visible = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let angle = 0;
  let pointerX = 0;
  let pointerAt = -Infinity;

  function pose(turn: number, eye: number, blink = false) {
    head!.style.transform = `rotate(${turn.toFixed(3)}deg)`;
    eyes!.style.transform = `translate(${eye.toFixed(3)}px, -0.7px)`;
    eyes!.style.opacity = blink ? "0" : "1";
  }

  function tick(now: number) {
    frame = 0;
    const delta = Math.min((now - last) / 1000 || 0, 0.05);
    last = now;
    elapsed += delta;
    const following = fine.matches && now - pointerAt < 2200;
    const target = following
      ? pointerX * 8
      : Math.sin(elapsed * 0.52) * 4.5 + Math.sin(elapsed * 0.19) * 1.5;
    angle += (target - angle) * (1 - Math.exp(-delta * 4));
    pose(
      angle,
      following ? pointerX * 1.5 : Math.sin(elapsed * 0.52) * 0.65,
      elapsed % 6.8 > 6.65,
    );
    if (!reduced.matches && visible && !document.hidden) {
      frame = requestAnimationFrame(tick);
    }
  }

  function sync() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (reduced.matches) {
      angle = 0;
      pose(0, 0);
    }
    if (!reduced.matches && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  document.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      pointerX = Math.max(
        -1,
        Math.min(1, (event.clientX - innerWidth / 2) / (innerWidth / 2)),
      );
      pointerAt = performance.now();
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => {
    pointerAt = -Infinity;
  });
  fine.addEventListener("change", () => {
    pointerAt = -Infinity;
  });
  reduced.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(observer);
  sync();
}
