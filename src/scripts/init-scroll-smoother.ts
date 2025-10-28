/// <reference types="gsap" />

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const init = async () => {
  if (prefersReducedMotion.matches) return;

  const [{ gsap }, { ScrollTrigger }, { ScrollSmoother }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/ScrollSmoother"),
  ]);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const existing = ScrollSmoother.get();
  if (existing) existing.kill();

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    smoothTouch: 0.1,
    effects: true,
    normalizeScroll: true,
  });

  window.__scrollSmoother = smoother;
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  init();
} else {
  window.addEventListener("DOMContentLoaded", init, { once: true });
}

prefersReducedMotion.addEventListener("change", (event) => {
  if (!event.matches) {
    init();
  }
});

declare global {
  interface Window {
    __scrollSmoother?: import("gsap/ScrollSmoother").ScrollSmoother;
  }
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const trigger = target.closest<HTMLAnchorElement>("[data-scroll-to]");
  if (!trigger) return;

  const selector = trigger.getAttribute("data-scroll-to");
  if (!selector) return;

  const smoother = window.__scrollSmoother;
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) return;

  event.preventDefault();

  const position = trigger.getAttribute("data-scroll-position") ?? "top top";
  const offsetAttr = trigger.getAttribute("data-scroll-offset");
  const offsetValue = offsetAttr ? parseFloat(offsetAttr) : null;

  if (smoother) {
    if (Number.isFinite(offsetValue)) {
      const target = smoother.offset(element, position) - (offsetValue ?? 0);
      smoother.scrollTo(target, true);
    } else {
      smoother.scrollTo(element, true, position);
    }
  } else {
    if (Number.isFinite(offsetValue)) {
      const rect = element.getBoundingClientRect();
      const top = window.scrollY + rect.top - (offsetValue ?? 0);
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

export {};
