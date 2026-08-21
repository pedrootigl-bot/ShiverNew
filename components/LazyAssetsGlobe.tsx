"use client";

import nextDynamic from "next/dynamic";
import { DeferInView } from "@/components/DeferInView";

function GlobePoster() {
  return (
    <div className="assets-globe" aria-hidden>
      <div className="globe-card" />
    </div>
  );
}

const AssetsGlobe = nextDynamic(
  () => import("@/components/AssetsGlobe").then((mod) => mod.AssetsGlobe),
  { ssr: false, loading: () => <GlobePoster /> },
);

export function LazyAssetsGlobe() {
  return (
    <DeferInView placeholder={<GlobePoster />} rootMargin="40px">
      <AssetsGlobe />
    </DeferInView>
  );
}
