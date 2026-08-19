"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useInViewReplay } from "@/lib/useInViewReplay";

const RevealGroupContext = createContext<boolean | null>(null);

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, on } = useInViewReplay<HTMLDivElement>(0);

  return (
    <RevealGroupContext.Provider value={on}>
      <div ref={ref} className={`reveal-group ${className}`.trim()}>
        {children}
      </div>
    </RevealGroupContext.Provider>
  );
}

export function useGroupReveal() {
  return useContext(RevealGroupContext);
}
