"use client";

import { useEffect } from "react";
import { isSlowNetwork } from "@/lib/network";

export function ParallaxRoot() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isSlowNetwork()) return;
    const nodes = () => document.querySelectorAll<HTMLElement>("[data-parallax]");
    let ticking = false;
    const update = () => {
      const mid = window.innerHeight / 2;
      nodes().forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.06);
        const rect = el.getBoundingClientRect();
        const delta = (rect.top + rect.height / 2 - mid) / mid;
        el.style.setProperty("--py", `${(delta * speed * 36).toFixed(2)}px`);
      });
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}
