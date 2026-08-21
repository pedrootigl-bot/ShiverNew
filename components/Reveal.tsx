"use client";

import { type CSSProperties, type ReactNode } from "react";
import { useGroupReveal } from "@/components/RevealGroup";
import { useInViewReplay } from "@/lib/useInViewReplay";

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur" | "clip" | "rise" | "tilt";

export function Reveal({
  children,
  className = "",
  delay = 0,
  solo = false,
  enterRatio = 0.1,
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
  const independent = solo || grouped === null;
  const own = useInViewReplay<HTMLDivElement>(enterRatio, rootMargin, false, independent);
  const on = independent ? own.on : grouped;

  return (
    <div
      ref={independent ? own.ref : undefined}
      className={`reveal${on ? " in" : ""} ${className}`.trim()}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
