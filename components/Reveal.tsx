"use client";

import { type CSSProperties, type ReactNode } from "react";
import { useGroupReveal } from "@/components/RevealGroup";
import { useInViewReplay } from "@/lib/useInViewReplay";

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur" | "clip" | "rise" | "tilt";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const grouped = useGroupReveal();
  const solo = useInViewReplay<HTMLDivElement>(0.12);
  const on = grouped !== null ? grouped : solo.on;

  return (
    <div
      ref={grouped !== null ? undefined : solo.ref}
      className={`reveal reveal-${variant}${on ? " in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
