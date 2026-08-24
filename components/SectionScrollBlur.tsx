"use client";

import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/lenis-instance";

const MAX_BLUR_PX = 22;
const MAX_BLUR_PX_TOUCH = 16;

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
}

export function SectionScrollBlur({
  sectionId,
}: {
  sectionId: string;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const section = document.getElementById(sectionId);
    if (!overlay || !section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const maxBlur = touch ? MAX_BLUR_PX_TOUCH : MAX_BLUR_PX;
    const items = [...section.querySelectorAll<HTMLElement>("[data-unblur]")];
    const seen = new WeakMap<HTMLElement, number>();
    let pending = reduced ? 0 : items.length;
    let raf = 0;

    if (reduced) {
      for (const el of items) {
        el.style.filter = "none";
        el.style.willChange = "auto";
      }
    } else {
      for (const el of items) {
        el.style.willChange = "filter";
      }
    }

    const apply = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      const inView = r.bottom > 0 && r.top < vh && visible >= vh * 0.08;

      if (!inView) {
        overlay.style.visibility = "hidden";
      } else {
        overlay.style.visibility = "visible";
        overlay.style.clipPath = `inset(${Math.max(0, r.top)}px ${Math.max(0, vw - r.right)}px ${Math.max(0, vh - r.bottom)}px ${Math.max(0, r.left)}px)`;
      }

      if (reduced || pending === 0) return;
      const start = vh * (touch ? 1.18 : 0.94);
      const end = vh * (touch ? 0.68 : 0.38);
      for (const el of items) {
        const prev = seen.get(el) ?? 0;
        if (prev >= 1) continue;
        const box = el.getBoundingClientRect();
        const y = box.top + box.height * (touch ? 0.06 : 0.18);
        const next = Math.max(prev, smoothstep(start, end, y));
        if (next - prev < 0.015 && next < 1) continue;
        seen.set(el, next);
        if (next >= 1) {
          pending -= 1;
          el.style.filter = "none";
          el.style.willChange = "auto";
          continue;
        }
        el.style.filter = `blur(${((1 - next) * maxBlur).toFixed(1)}px)`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.visualViewport?.addEventListener("scroll", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);

    let offLenis: (() => void) | undefined;
    const bindLenis = () => {
      const lenis = getLenis();
      if (!lenis || offLenis) return;
      lenis.on("scroll", onScroll);
      offLenis = () => lenis.off("scroll", onScroll);
    };
    bindLenis();
    const lenisTimer = window.setTimeout(bindLenis, 0);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(lenisTimer);
      offLenis?.();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
    };
  }, [sectionId]);

  return (
    <div ref={overlayRef} className="section-scroll-blur" aria-hidden="true">
      <div className="section-scroll-blur__edge section-scroll-blur__edge--top" />
      <div className="section-scroll-blur__edge section-scroll-blur__edge--bottom" />
    </div>
  );
}
