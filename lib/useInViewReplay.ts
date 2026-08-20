"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewReplay<T extends HTMLElement>(
  enterRatio = 0.12,
  rootMargin = "0px",
  replay = false,
) {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }

    const mobile = window.matchMedia("(max-width: 1100px)");
    let visible = false;
    let playFrame = 0;

    const play = () => {
      cancelAnimationFrame(playFrame);
      setOn(false);
      playFrame = requestAnimationFrame(() => {
        void el.offsetWidth;
        playFrame = requestAnimationFrame(() => setOn(true));
      });
    };

    const stop = () => {
      cancelAnimationFrame(playFrame);
      setOn(false);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (replay) {
          if (entry.isIntersecting) {
            if (!visible) {
              visible = true;
              play();
            }
            return;
          }
          if (visible) {
            visible = false;
            stop();
          }
          return;
        }

        const ratio = entry.intersectionRatio;
        if (entry.isIntersecting && (enterRatio <= 0 || ratio >= enterRatio)) {
          setOn(true);
          return;
        }
        if (!entry.isIntersecting && !mobile.matches) setOn(false);
      },
      {
        threshold: replay ? [0, 0.01, 1] : enterRatio <= 0 ? [0, 1] : [0, enterRatio, 1],
        rootMargin: replay
          ? "-18% 0px -36% 0px"
          : mobile.matches
            ? "0px 0px -6% 0px"
            : rootMargin,
      },
    );

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      visible = false;
      stop();
      io.unobserve(el);
      io.observe(el);
    };

    io.observe(el);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      cancelAnimationFrame(playFrame);
      io.disconnect();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [enterRatio, rootMargin, replay]);

  return { ref, on };
}
