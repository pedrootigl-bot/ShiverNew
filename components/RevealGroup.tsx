"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useInViewReplay } from "@/lib/useInViewReplay";

const RevealGroupContext = createContext<boolean | null>(null);

export function RevealGroup({
  children,
  className = "",
  replay = false,
}: {
  children: ReactNode;
  className?: string;
  replay?: boolean;
}) {
  const { ref, on } = useInViewReplay<HTMLDivElement>(0.08, "0px 0px -8% 0px", replay);

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
