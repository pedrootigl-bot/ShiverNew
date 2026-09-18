"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { PAY_METHODS } from "@/lib/site";

const LOOPS = 3;

export function PayMethodsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 720px)");
    reduceRef.current = reduce.matches;

    const setWidth = () => {
      const first = scroller.querySelector<HTMLElement>("[data-pay-set]");
      return first?.offsetWidth ?? 0;
    };

    const centerLoop = () => {
      if (!mobile.matches) return;
      const width = setWidth();
      if (width > 0) scroller.scrollLeft = width;
    };

    const onReduce = () => {
      reduceRef.current = reduce.matches;
    };
    const onMobile = () => {
      if (mobile.matches) centerLoop();
      else scroller.scrollLeft = 0;
    };

    reduce.addEventListener("change", onReduce);
    mobile.addEventListener("change", onMobile);
    centerLoop();
    requestAnimationFrame(centerLoop);

    let frame = 0;
    const tick = () => {
      if (mobile.matches && !pausedRef.current && !reduceRef.current) {
        scroller.scrollLeft += 0.5;
        const width = setWidth();
        if (width > 0 && scroller.scrollLeft >= width * 2) {
          scroller.scrollLeft -= width;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);

    let resumeTimer = 0;
    const pause = () => {
      pausedRef.current = true;
      window.clearTimeout(resumeTimer);
    };
    const resume = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pausedRef.current = false;
      }, 1600);
    };

    const onScroll = () => {
      if (!mobile.matches) return;
      const width = setWidth();
      if (width <= 0) return;
      if (scroller.scrollLeft <= 2) scroller.scrollLeft += width;
      else if (scroller.scrollLeft >= width * 2 - 2) scroller.scrollLeft -= width;
    };

    scroller.addEventListener("pointerdown", pause);
    scroller.addEventListener("touchstart", pause, { passive: true });
    scroller.addEventListener("pointerup", resume);
    scroller.addEventListener("pointercancel", resume);
    scroller.addEventListener("touchend", resume);
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", centerLoop);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resumeTimer);
      reduce.removeEventListener("change", onReduce);
      mobile.removeEventListener("change", onMobile);
      scroller.removeEventListener("pointerdown", pause);
      scroller.removeEventListener("touchstart", pause);
      scroller.removeEventListener("pointerup", resume);
      scroller.removeEventListener("pointercancel", resume);
      scroller.removeEventListener("touchend", resume);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", centerLoop);
    };
  }, []);

  const sets = Array.from({ length: LOOPS }, (_, setIndex) => (
    <div
      className="pay-methods-set"
      data-pay-set={setIndex === 0 ? "" : undefined}
      key={`set-${setIndex}`}
      aria-hidden={setIndex === 0 ? undefined : true}
    >
      {PAY_METHODS.map((method) => (
        <article className="pay-method" key={`${setIndex}-${method.name}`}>
          <Image
            src={method.image}
            alt={setIndex === 0 ? `Depósito via ${method.name} na Shiver Broker` : ""}
            width={400}
            height={400}
            quality={65}
            sizes="(max-width: 720px) 68vw, 180px"
            loading={setIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
          <h3>{method.name}</h3>
          <p>{method.text}</p>
        </article>
      ))}
    </div>
  ));

  return (
    <div className="pay-methods-carousel" aria-label="Métodos de depósito">
      <div className="pay-methods-scroller" ref={scrollerRef} data-lenis-prevent>
        <div className="pay-methods-track">{sets}</div>
      </div>
      <p className="pay-methods-hint">Deslize para ver os métodos</p>
    </div>
  );
}
