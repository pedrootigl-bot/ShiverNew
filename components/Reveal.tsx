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
  solo = false,
  enterRatio = 0.12,
  rootMargin = "0px",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  solo?: boolean;
  enterRatio?: number;
  rootMargin?: string;
}) {
  const grouped = useGroupReveal();
  const own = useInViewReplay<HTMLDivElement>(enterRatio, rootMargin);
  const independent = solo || grouped === null;
  const on = independent ? own.on : grouped;

  return (
    <div
      ref={independent ? own.ref : undefined}
      className={`reveal reveal-${variant}${on ? " in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
