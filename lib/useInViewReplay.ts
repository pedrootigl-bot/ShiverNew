"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewReplay<T extends HTMLElement>(enterRatio = 0.12, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (enterRatio <= 0 || entry.intersectionRatio >= enterRatio)) {
          setOn(true);
          return;
        }
        if (!entry.isIntersecting) setOn(false);
      },
      { threshold: enterRatio <= 0 ? [0, 1] : [0, enterRatio, 1], rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [enterRatio, rootMargin]);

  return { ref, on };
}
