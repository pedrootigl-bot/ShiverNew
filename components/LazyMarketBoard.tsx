"use client";

import nextDynamic from "next/dynamic";
import { DeferInView } from "@/components/DeferInView";

const MarketBoard = nextDynamic(
  () => import("@/components/MarketBoard").then((mod) => ({ default: mod.MarketBoard })),
  { ssr: false, loading: () => <div className="market-board" aria-hidden /> },
);

export function LazyMarketBoard() {
  return (
    <DeferInView placeholder={<div className="market-board" aria-hidden />}>
      <MarketBoard />
    </DeferInView>
  );
}
