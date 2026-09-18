"use client";

import { type ReactNode } from "react";
import { AppBolsoVideo } from "@/components/AppBolsoVideo";
import { Reveal } from "@/components/Reveal";
import { RevealGroup } from "@/components/RevealGroup";

export function AppSec({ children }: { children: ReactNode }) {
  return (
    <section className="section app-sec" id="tecnologia">
      <div className="wrap">{children}</div>
    </section>
  );
}

export function AppSplit({ children }: { children: ReactNode }) {
  return (
    <RevealGroup className="app-split">
      {children}
    </RevealGroup>
  );
}

export function AppMediaReveal() {
  return (
    <Reveal variant="scale" delay={120} className="app-media">
      <div className="app-media-frame">
        <AppBolsoVideo />
      </div>
    </Reveal>
  );
}

export function AppCopyReveal({ children }: { children: ReactNode }) {
  return (
    <Reveal variant="left" className="app-copy">
      {children}
    </Reveal>
  );
}
