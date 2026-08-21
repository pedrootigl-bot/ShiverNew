"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewReplay<T extends HTMLElement>(
  enterRatio = 0.12,
  rootMargin = "0px",
  replay = false,
  enabled = true,
) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (replay) {
          setOn(entry.isIntersecting);
          return;
        }

        const ratio = entry.intersectionRatio;
        if (entry.isIntersecting && (enterRatio <= 0 || ratio >= enterRatio)) {
          setOn(true);
          io.disconnect();
        }
      },
      {
        threshold: replay ? [0, 0.08, 1] : enterRatio <= 0 ? [0, 1] : [0, enterRatio, 1],
        rootMargin,
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [enterRatio, rootMargin, replay, enabled]);

  return { ref, on };
}
