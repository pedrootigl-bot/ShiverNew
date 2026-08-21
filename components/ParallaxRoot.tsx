"use client";

import { useEffect } from "react";
import { onIdle } from "@/lib/idle";
import { isSlowNetwork } from "@/lib/network";

export function ParallaxRoot() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isSlowNetwork()) return;

    let nodes: HTMLElement[] = [];
    const collect = () => {
      nodes = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    };
    let ticking = false;
    const update = () => {
      ticking = false;
      const mid = window.innerHeight / 2;
      for (const el of nodes) {
        const speed = Number(el.dataset.parallax || 0.06);
        const rect = el.getBoundingClientRect();
        const delta = (rect.top + rect.height / 2 - mid) / mid;
        el.style.setProperty("--py", `${(delta * speed * 36).toFixed(2)}px`);
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    let later = 0;
    const cancelIdle = onIdle(() => {
      collect();
      update();
      later = window.setTimeout(collect, 1500);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }, 1400);

    return () => {
      cancelIdle();
      window.clearTimeout(later);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
