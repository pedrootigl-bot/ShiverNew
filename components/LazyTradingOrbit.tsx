"use client";

import { useEffect, useRef, useState } from "react";
import { isSoftwareGpu } from "@/lib/gpu";
import { skipHeroMotion } from "@/lib/network";
import { TradingOrbitStage } from "@/components/TradingOrbitStage";

function OrbitPoster() {
  return (
    <img
      className="orbit-poster"
      src="/media/trading-orbit-phone.webp"
      alt=""
      width={690}
      height={1380}
      decoding="async"
      loading="lazy"
    />
  );
}

export function LazyTradingOrbit() {
  const root = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (skipHeroMotion()) return;
    if (isSoftwareGpu()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoad(true);
        io.disconnect();
      },
      { rootMargin: "500px 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className={`orbit-stage${ready ? " is-live" : ""}`}>
      <OrbitPoster />
      {load ? <TradingOrbitStage onReady={() => setReady(true)} /> : null}
    </div>
  );
}
