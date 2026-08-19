"use client";

import { useGroupReveal } from "@/components/RevealGroup";
import { useInViewReplay } from "@/lib/useInViewReplay";

export function BlurTitle({ text }: { text: string }) {
  const grouped = useGroupReveal();
  const solo = useInViewReplay<HTMLHeadingElement>(0.28);
  const on = grouped !== null ? grouped : solo.on;

  return (
    <h2
      ref={grouped !== null ? undefined : solo.ref}
      id="titulo-corretora"
      className={`blur-title${on ? " in" : ""}`}
    >
      {Array.from(text).map((char, i) => (
        <span key={`${char}-${i}`} style={{ animationDelay: grouped !== null ? "0ms" : `${i * 26}ms` }}>
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </h2>
  );
}
