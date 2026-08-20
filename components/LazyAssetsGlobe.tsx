"use client";

import nextDynamic from "next/dynamic";
import { DeferInView } from "@/components/DeferInView";

const AssetsGlobe = nextDynamic(
  () => import("@/components/AssetsGlobe").then((mod) => ({ default: mod.AssetsGlobe })),
  { ssr: false, loading: () => <div className="assets-globe" aria-hidden><div className="globe-card" /></div> },
);

export function LazyAssetsGlobe() {
  return (
    <DeferInView placeholder={<div className="assets-globe" aria-hidden><div className="globe-card" /></div>}>
      <AssetsGlobe />
    </DeferInView>
  );
}
