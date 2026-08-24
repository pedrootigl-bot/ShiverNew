"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

export function HeroClarezaOverlay({
  hero,
  panel,
}: {
  hero: ReactNode;
  panel: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [booting, setBooting] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const heroEl = root.querySelector<HTMLElement>(".hero");
    const panelEl = root.querySelector<HTMLElement>("[data-overlay-panel]");
    if (!heroEl || !panelEl) {
      setBooting(false);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 900px)");

    const revealHero = () => {
      heroEl.style.setProperty("--hero-p", "1");
      heroEl.style.setProperty("--hero-copy", "1");
      heroEl.classList.add("copy");
    };

    if (reduce.matches) {
      root.classList.add("is-static");
      revealHero();
      const staticBoot = window.setTimeout(() => setBooting(false), 800);
      return () => window.clearTimeout(staticBoot);
    }

    let cancelled = false;
    let trigger: { kill: () => void } | undefined;
    let refreshTrigger: (() => void) | undefined;
    let unhookLenis: (() => void) | undefined;
    let wait: number | undefined;
    let stopWait: number | undefined;

    const apply = (progress: number) => {
      const compact = mobile.matches;
      const styles = getComputedStyle(root);
      const copyHold = readVh(styles.getPropertyValue("--overlay-copy"), compact ? 12 : 60);
      const restHold = readVh(styles.getPropertyValue("--overlay-rest"), compact ? 130 : 40);
      const overlayRun = readVh(styles.getPropertyValue("--overlay-run"), compact ? 100 : 120);
      const total = Math.max(copyHold + restHold + overlayRun, 1);
      const copyEnd = clamp(copyHold / total, 0.03, 0.45);
      const holdEnd = clamp((copyHold + restHold) / total, 0.15, 0.82);
      const heroP = clamp(progress / copyEnd, 0, 1);
      const overlayP = progress <= holdEnd ? 0 : clamp((progress - holdEnd) / (1 - holdEnd), 0, 1);

      heroEl.style.setProperty("--hero-p", heroP.toFixed(3));
      heroEl.style.setProperty("--hero-copy", heroP.toFixed(3));
      heroEl.classList.toggle("copy", heroP > 0.35);

      const scaleTo = compact ? 0.98 : 0.96;
      const blurTo = compact ? 3 : 8;
      const cardsP = clamp((overlayP - (compact ? 0.18 : 0.55)) / (compact ? 0.32 : 0.22), 0, 1);

      root.style.setProperty("--ov-y", `${((1 - overlayP) * 100).toFixed(2)}%`);
      root.style.setProperty("--ov-radius", `${(32 * (1 - overlayP)).toFixed(2)}px`);
      root.style.setProperty("--ov-scale", (1 - overlayP * (1 - scaleTo)).toFixed(4));
      root.style.setProperty("--ov-opacity", (1 - overlayP * 0.65).toFixed(3));
      root.style.setProperty("--ov-blur", `${(overlayP * blurTo).toFixed(2)}px`);
      root.style.setProperty("--ov-scrim", (overlayP * 0.42).toFixed(3));
      root.style.setProperty("--ov-edge", (1 - overlayP).toFixed(3));
      root.style.setProperty("--ov-cards", cardsP.toFixed(3));
      root.style.setProperty("--ov-cards-y", `${((1 - cardsP) * 30).toFixed(1)}px`);
      root.classList.toggle("is-live", progress > 0.02 && progress < 0.98);
    };

    apply(0);

    const bootAt = performance.now();
    let finishTimer = 0;
    let finished = false;
    const finishBoot = () => {
      if (finished || cancelled) return;
      finished = true;
      const remain = Math.max(0, 800 - (performance.now() - bootAt));
      finishTimer = window.setTimeout(() => {
        if (!cancelled) setBooting(false);
      }, remain);
    };

    const boot = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

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
    const bootFailSafe = window.setTimeout(() => finishBoot(), 2800);

    const refresh = () => refreshTrigger?.();
    window.addEventListener("resize", refresh);
    mobile.addEventListener("change", refresh);

    return () => {
      cancelled = true;
      window.clearTimeout(finishTimer);
      window.clearTimeout(bootFailSafe);
      if (wait) window.clearInterval(wait);
      if (stopWait) window.clearTimeout(stopWait);
      window.removeEventListener("resize", refresh);
      mobile.removeEventListener("change", refresh);
      unhookLenis?.();
      trigger?.kill();
      root.classList.remove("is-live");
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

  const preloader = (
    <div
      className={`gsap-preloader${booting ? "" : " is-done"}`}
      role="status"
      aria-live="polite"
      aria-busy={booting}
      aria-label="Carregando"
    >
      <img
        src="/media/preloader-fin.png"
        alt=""
        width={1376}
        height={768}
        decoding="sync"
        fetchPriority="high"
      />
    </div>
  );

  return (
    <div className={`clareza-overlay${booting ? " is-booting" : ""}`} id="plataforma" data-scroll-align="end" ref={rootRef}>
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
