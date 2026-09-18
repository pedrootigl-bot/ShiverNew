"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BootPreloader } from "@/components/BootPreloader";
import { getLenis } from "@/lib/lenis-instance";

function clamp(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function readVh(raw: string, fallback: number) {
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function waitForHeaderReady() {
  try {
    await document.fonts?.ready;
  } catch {
    // ignore font readiness failures
  }

  const header = document.querySelector<HTMLElement>(".header .header-pill, .header");
  if (!header) return;

  await new Promise<void>((resolve) => {
    const done = () => resolve();
    if (header.getBoundingClientRect().height > 0) {
      requestAnimationFrame(() => requestAnimationFrame(done));
      return;
    }
    const io = new ResizeObserver(() => {
      if (header.getBoundingClientRect().height > 0) {
        io.disconnect();
        requestAnimationFrame(() => requestAnimationFrame(done));
      }
    });
    io.observe(header);
    window.setTimeout(() => {
      io.disconnect();
      done();
    }, 1200);
  });
}

const OVERLAY_VARS = [
  "--ov-y",
  "--ov-radius",
  "--ov-scale",
  "--ov-opacity",
  "--ov-blur",
  "--ov-scrim",
  "--ov-edge",
  "--ov-cards",
  "--ov-cards-y",
] as const;

const PRELOADER_MIN_MS = 1800;

export function HeroClarezaOverlay({
  hero,
  panel,
}: {
  hero: ReactNode;
  panel: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dismissTimerRef = useRef(0);
  const [booting, setBooting] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heroEl = root.querySelector<HTMLElement>(".hero");
    const panelEl = root.querySelector<HTMLElement>("[data-overlay-panel]");
    if (!heroEl || !panelEl) {
      void waitForHeaderReady().then(() => setBooting(false));
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 900px)");

    const revealHero = () => {
      heroEl.style.setProperty("--hero-p", "1");
      heroEl.style.setProperty("--hero-copy", "1");
      heroEl.classList.add("copy");
    };

    const clearOverlayVars = () => {
      for (const key of OVERLAY_VARS) root.style.removeProperty(key);
      root.classList.remove("is-live", "is-panel-in");
    };

    let cancelled = false;
    let runtimeStop: (() => void) | undefined;
    let panelRevealIO: IntersectionObserver | undefined;
    let panelRevealed = false;

    const revealPanel = () => {
      if (panelRevealed || cancelled) return;
      panelRevealed = true;
      root.classList.add("is-panel-in");
      panelRevealIO?.disconnect();
      panelRevealIO = undefined;
    };

    const watchPanelReveal = () => {
      panelRevealIO?.disconnect();
      panelRevealed = false;
      root.classList.remove("is-panel-in");

      if (reduce.matches) {
        revealPanel();
        return;
      }

      panelRevealIO = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
            revealPanel();
          }
        },
        { threshold: [0, 0.22, 0.4, 0.6], rootMargin: "0px 0px -12% 0px" },
      );
      panelRevealIO.observe(panelEl);
    };

    const dismissPreloader = async (bootAt: number) => {
      await waitForHeaderReady();
      if (cancelled) return;
      const remain = Math.max(0, PRELOADER_MIN_MS - (performance.now() - bootAt));
      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = window.setTimeout(() => {
        if (!cancelled) setBooting(false);
      }, remain);
    };

    const startStatic = () => {
      root.classList.add("is-static");
      setStacked(true);
      clearOverlayVars();
      if (reduce.matches) revealHero();
      revealPanel();
      void dismissPreloader(performance.now());
      return () => {
        panelRevealIO?.disconnect();
        panelRevealIO = undefined;
        root.classList.remove("is-static", "is-panel-in");
      };
    };

    const apply = (progress: number) => {
      const styles = getComputedStyle(root);
      const copyHold = readVh(styles.getPropertyValue("--overlay-copy"), 60);
      const restHold = readVh(styles.getPropertyValue("--overlay-rest"), 40);
      const overlayRun = readVh(styles.getPropertyValue("--overlay-run"), 120);
      const total = Math.max(copyHold + restHold + overlayRun, 1);
      const copyEnd = clamp(copyHold / total, 0.03, 0.45);
      const holdEnd = clamp((copyHold + restHold) / total, 0.15, 0.82);
      const heroP = clamp(progress / copyEnd, 0, 1);
      const overlayP = progress <= holdEnd ? 0 : clamp((progress - holdEnd) / (1 - holdEnd), 0, 1);

      heroEl.style.setProperty("--hero-p", heroP.toFixed(3));
      heroEl.style.setProperty("--hero-copy", heroP.toFixed(3));
      heroEl.classList.toggle("copy", heroP > 0.35);

      const cardsP = clamp((overlayP - 0.55) / 0.22, 0, 1);

      root.style.setProperty("--ov-y", `${((1 - overlayP) * 100).toFixed(2)}%`);
      root.style.setProperty("--ov-radius", `${(32 * (1 - overlayP)).toFixed(2)}px`);
      root.style.setProperty("--ov-scale", (1 - overlayP * 0.04).toFixed(4));
      root.style.setProperty("--ov-opacity", (1 - overlayP * 0.65).toFixed(3));
      root.style.setProperty("--ov-blur", `${(overlayP * 8).toFixed(2)}px`);
      root.style.setProperty("--ov-scrim", (overlayP * 0.42).toFixed(3));
      root.style.setProperty("--ov-edge", (1 - overlayP).toFixed(3));
      root.style.setProperty("--ov-cards", cardsP.toFixed(3));
      root.style.setProperty("--ov-cards-y", `${((1 - cardsP) * 30).toFixed(1)}px`);
      root.classList.toggle("is-live", progress > 0.02 && progress < 0.98);
      if (overlayP > 0.18) revealPanel();
    };

    const startOverlay = () => {
      root.classList.remove("is-static");
      setStacked(false);
      panelRevealIO?.disconnect();
      panelRevealIO = undefined;
      panelRevealed = false;
      root.classList.remove("is-panel-in");
      apply(0);

      let alive = true;
      let trigger: { kill: () => void } | undefined;
      let refreshTrigger: (() => void) | undefined;
      let unhookLenis: (() => void) | undefined;
      let wait: number | undefined;
      let stopWait: number | undefined;
      let bootFailSafe = 0;
      let finished = false;
      const bootAt = performance.now();

      const finishBoot = () => {
        if (finished || cancelled || !alive) return;
        finished = true;
        void dismissPreloader(bootAt);
      };

      const boot = async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled || !alive) return;

        gsap.registerPlugin(ScrollTrigger);
        refreshTrigger = () => ScrollTrigger.refresh();

        trigger = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => apply(self.progress),
        });
        finishBoot();

        const hookLenis = () => {
          const lenis = getLenis();
          if (!lenis || unhookLenis) return false;
          const onScroll = () => ScrollTrigger.update();
          lenis.on("scroll", onScroll);
          unhookLenis = () => lenis.off("scroll", onScroll);
          ScrollTrigger.refresh();
          return true;
        };

        hookLenis();
        wait = window.setInterval(() => {
          if (hookLenis() && wait) window.clearInterval(wait);
        }, 240);
        stopWait = window.setTimeout(() => {
          if (wait) window.clearInterval(wait);
        }, 4000);
      };

      void boot().catch(() => finishBoot());
      bootFailSafe = window.setTimeout(() => finishBoot(), 2800);

      const refresh = () => refreshTrigger?.();
      window.addEventListener("resize", refresh);

      return () => {
        alive = false;
        window.clearTimeout(bootFailSafe);
        if (wait) window.clearInterval(wait);
        if (stopWait) window.clearTimeout(stopWait);
        window.removeEventListener("resize", refresh);
        unhookLenis?.();
        trigger?.kill();
        clearOverlayVars();
      };
    };

    const sync = () => {
      runtimeStop?.();
      runtimeStop = reduce.matches || mobile.matches ? startStatic() : startOverlay();
    };

    sync();
    mobile.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      cancelled = true;
      window.clearTimeout(dismissTimerRef.current);
      panelRevealIO?.disconnect();
      runtimeStop?.();
      mobile.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("gsap-booting", booting);
    if (!booting) return;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.classList.remove("gsap-booting");
      html.style.overflow = prev;
    };
  }, [booting]);

  const preloader = <BootPreloader done={!booting} />;

  return (
    <div className={`clareza-overlay${booting ? " is-booting" : ""}${stacked ? " is-static" : ""}`} id="plataforma" data-scroll-align="end" ref={rootRef}>
      {mounted ? createPortal(preloader, document.body) : preloader}
      <div className="clareza-overlay__frame">
        <div className="clareza-overlay__prev" data-overlay-prev>
          {hero}
          <div className="clareza-overlay__scrim" aria-hidden />
        </div>
        <section className="clareza-overlay__panel section" data-overlay-panel aria-labelledby="titulo-corretora">
          {panel}
        </section>
      </div>
      <span className="clareza-overlay__mark" aria-hidden />
    </div>
  );
}
