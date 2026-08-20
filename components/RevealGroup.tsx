"use client";

import { createContext, Fragment, useContext, useEffect, useRef, useState, type ReactNode } from "react";
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
  const { ref, on } = useInViewReplay<HTMLDivElement>(0, "0px", replay);
  const [cycle, setCycle] = useState(0);
  const wasOn = useRef(false);

  useEffect(() => {
    if (replay && wasOn.current && !on) setCycle((value) => value + 1);
    wasOn.current = on;
  }, [on, replay]);

  return (
    <RevealGroupContext.Provider value={on}>
      <div ref={ref} className={`reveal-group ${className}`.trim()}>
        {replay ? <Fragment key={cycle}>{children}</Fragment> : children}
      </div>
    </RevealGroupContext.Provider>
  );
}

export function useGroupReveal() {
  return useContext(RevealGroupContext);
}
