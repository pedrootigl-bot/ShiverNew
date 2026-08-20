"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isSlowNetwork } from "@/lib/network";
import { SITE } from "@/lib/site";

export function HeroStage() {
  const wrap = useRef<HTMLElement>(null);

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
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--hero-p", "1");
      el.style.setProperty("--hero-copy", "1");
      el.classList.add("copy");
      return;
    }

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
  }, []);

  return (
    <section className="hero" id="inicio" ref={wrap} aria-label="Introdução Shiver Broker">
      <div className="hero-stage">
        <HeroVideo />
        <div className="hero-vignette" />
        <Image
          className="float-layer fin"
          src="/media/U4p7OneXSqlSqUjx2qEVzJYI8A.webp"
          alt=""
          width={1180}
          height={700}
          quality={70}
          sizes="(max-width: 720px) 90vw, min(1180px, 100vw)"
          style={{ height: "auto" }}
          priority
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
            <a className="btn btn-cta btn-lg" href={SITE.trade.trial}>
              Testar com $10.000 <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (isSlowNetwork()) return;
    setPlayVideo(true);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !playVideo) return;

    const play = () => {
      video.play().catch(() => undefined);
    };

    play();
    const onVis = () => {
      if (document.visibilityState === "visible") play();
      else video.pause();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [playVideo]);

  return (
    <div className="hero-video">
      <Image
        className="hero-poster"
        src="/media/hero-bg.jpg"
        alt=""
        fill
        priority
        quality={60}
        sizes="100vw"
      />
      {playVideo ? (
        <video ref={ref} autoPlay muted loop playsInline preload="metadata" poster="/media/hero-bg.jpg">
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
