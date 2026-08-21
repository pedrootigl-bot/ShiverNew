import { getLenis } from "@/lib/lenis-instance";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function scrollToTop(options?: { immediate?: boolean }) {
  const immediate = options?.immediate ?? false;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: immediate ? "auto" : scrollBehavior() });
}

export function scrollToId(id: string) {
  if (!id || id === "inicio") {
    scrollToTop();
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const alignEnd = el.dataset.scrollAlign === "end";
  const top = alignEnd
    ? el.getBoundingClientRect().top + window.scrollY + el.offsetHeight - window.innerHeight
    : undefined;
  const lenis = getLenis();
  if (lenis) {
    if (top !== undefined) lenis.scrollTo(top);
    else lenis.scrollTo(el);
    return;
  }
  if (top !== undefined) {
    window.scrollTo({ top, left: 0, behavior: scrollBehavior() });
    return;
  }
  el.scrollIntoView({
    behavior: scrollBehavior(),
    block: "start",
  });
}
