"use client";

import { type ReactNode } from "react";
import { LazyTradingOrbit } from "@/components/LazyTradingOrbit";

export function AppSec({ children }: { children: ReactNode }) {
  return (
    <section className="section app-sec" id="tecnologia">
      <div className="wrap">{children}</div>
    </section>
  );
}

export function AppSplit({ children }: { children: ReactNode }) {
  return <div className="app-split">{children}</div>;
}

export function AppMediaReveal() {
  return (
    <div className="app-media">
      <div className="app-media-frame">
        <div className="app-media-zoom">
          <LazyTradingOrbit />
        </div>
      </div>
    </div>
  );
}

export function AppCopyReveal({ children }: { children: ReactNode }) {
  return <div className="app-copy">{children}</div>;
}
