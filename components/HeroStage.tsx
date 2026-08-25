"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isSoftwareGpu } from "@/lib/gpu";
import { heroMotionDelayMs, skipHeroMotion } from "@/lib/network";
import { SITE } from "@/lib/site";
import { scheduleHomeWarmup } from "@/lib/warmup-home";
import { CtaButton } from "@/components/CtaButton";
import { MoltenMetal } from "@/components/MoltenMetal";

export function HeroStage({ overlayDriven = false }: { overlayDriven?: boolean }) {
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => scheduleHomeWarmup(), []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 900px)");
    let stopScroll: (() => void) | undefined;

    const bindScroll = () => {
      let ticking = false;
      const update = () => {
        ticking = false;
        const total = Math.max(el.offsetHeight - window.innerHeight, 1);
        const p = Math.min(Math.max(-el.getBoundingClientRect().top / total, 0), 1);
        const copy = Math.min(1, Math.max(0, (p - 0.08) / 0.5));
        el.style.setProperty("--hero-p", p.toFixed(3));
        el.style.setProperty("--hero-copy", copy.toFixed(3));
        el.classList.toggle("copy", copy > 0.35);
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
    };

    const sync = () => {
      stopScroll?.();
      stopScroll = undefined;
      const overlayOwnsHero = overlayDriven && !mobile.matches && !reduce.matches;
      if (overlayOwnsHero) return;
      if (reduce.matches) {
        el.style.setProperty("--hero-p", "1");
        el.style.setProperty("--hero-copy", "1");
        el.classList.add("copy");
        return;
      }
      stopScroll = bindScroll();
    };

    sync();
    mobile.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      mobile.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      stopScroll?.();
    };
  }, [overlayDriven]);

  return (
    <section className="hero" id="inicio" ref={wrap} aria-label="Introdução Shiver Broker">
      <div className="hero-stage">
        <HeroMetal />
        <div className="hero-vignette" />
        <Image
          className="float-layer fin"
          src="/media/U4p7OneXSqlSqUjx2qEVzJYI8A.webp"
          alt=""
          width={1180}
          height={611}
          quality={70}
          sizes="(max-width: 720px) 90vw, min(1180px, 100vw)"
          style={{ height: "auto" }}
        />
        <div className="hero-content">
          <div className="hero-left">
            <h1>Shiver Broker — o oceano está cheio. Os tubarões já escolheram o lado!</h1>
            <p className="kicker">A demanda é alta. A vaga é sua</p>
          </div>
          <div className="hero-right">
            <p className="lead">
              Enquanto a maioria disputa plataformas medianas, quem performa opera onde o payout chega a{" "}
              <strong>97%, a execução não espera e o acesso não é para todo mundo.</strong> Abra a Shiver e veja o que
              está do outro lado.
            </p>
            <CtaButton href={SITE.trade.trial} size="lg">
              Testar com $10.000 <span aria-hidden>→</span>
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMetal() {
  const wrap = useRef<HTMLDivElement>(null);
  const [loadFx, setLoadFx] = useState(false);
  const [fxReady, setFxReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (skipHeroMotion()) return;
    if (isSoftwareGpu()) return;

    const delay = heroMotionDelayMs();
    let timeout = 0;
    let pageLoaded = document.readyState === "complete";
    let visible = false;

    const clearArm = () => {
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = 0;
      }
    };

    const arm = () => {
      clearArm();
      if (!pageLoaded || !visible) return;
      timeout = window.setTimeout(() => setLoadFx(true), delay);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio > 0.08;
        if (visible) arm();
        else clearArm();
      },
      { threshold: [0, 0.08, 0.2] },
    );
    io.observe(el);

    const onLoad = () => {
      pageLoaded = true;
      arm();
    };

    if (pageLoaded) arm();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      clearArm();
      io.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div className={`hero-video${fxReady ? " is-ready" : ""}`} ref={wrap}>
      <div className={`hero-poster${fxReady ? " is-hidden" : ""}`} aria-hidden="true" />
      {loadFx ? (
        <MoltenMetal
          color1="#062038"
          color2="#2f7bff"
          color3="#7ae2ff"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain={false}
          grainIntensity={0}
          mouseInteraction
          mouseStrength={0.3}
          opacity={1}
          onReady={() => setFxReady(true)}
        />
      ) : null}
    </div>
  );
}
