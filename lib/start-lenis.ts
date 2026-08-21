import { getLenis, setLenis } from "@/lib/lenis-instance";

function shouldSkipSmooth() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return true;
  return false;
}

export function startLenis() {
  let destroyed = false;
  let booting = false;

  const start = () => {
    if (destroyed || booting || getLenis() || shouldSkipSmooth()) return;
    booting = true;
    void import("lenis").then(({ default: Lenis }) => {
      booting = false;
      if (destroyed || getLenis() || shouldSkipSmooth()) return;
      const lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.12,
        wheelMultiplier: 0.92,
        anchors: false,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true,
        prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
      });
      setLenis(lenis);
    });
  };

  const stop = () => {
    const lenis = getLenis();
    if (!lenis) return;
    lenis.destroy();
    setLenis(null);
  };

  const sync = () => {
    if (shouldSkipSmooth()) stop();
    else start();
  };

  sync();

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = window.matchMedia("(hover: none) and (pointer: coarse)");
  motion.addEventListener("change", sync);
  coarse.addEventListener("change", sync);

  return () => {
    destroyed = true;
    motion.removeEventListener("change", sync);
    coarse.removeEventListener("change", sync);
    stop();
  };
}

export function resizeLenis() {
  getLenis()?.resize();
}
