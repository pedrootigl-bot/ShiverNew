"use client";

import { useEffect, useRef, useState } from "react";
import { skipHeroMotion } from "@/lib/network";

export function AppBolsoVideo() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const wrap = root.current;
    const el = video.current;
    if (!wrap || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (skipHeroMotion()) return;

    const playSafe = () => {
      el.playbackRate = 1;
      void el.play().then(() => setLive(true)).catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          el.pause();
          return;
        }
        if (el.preload !== "auto") {
          el.preload = "auto";
          el.load();
        }
        playSafe();
      },
      { rootMargin: "220px 0px", threshold: 0.12 },
    );
    const onPlaying = () => setLive(true);
    el.addEventListener("playing", onPlaying);
    io.observe(wrap);
    return () => {
      io.disconnect();
      el.removeEventListener("playing", onPlaying);
      el.pause();
    };
  }, []);

  return (
    <div ref={root} className={`app-media-stage${live ? " is-live" : ""}`}>
      <img
        className="app-media-poster"
        src="/media/app-bolso.webp?v=4"
        alt="Plataforma Shiver no celular, com mercados globais ao redor"
        width={1232}
        height={808}
        decoding="async"
        loading="lazy"
      />
      <video
        ref={video}
        className="app-media-video"
        poster="/media/app-bolso.webp?v=4"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/media/app-bolso.webm?v=4" type="video/webm" />
        <source src="/media/app-bolso.mp4?v=4" type="video/mp4" />
      </video>
    </div>
  );
}
