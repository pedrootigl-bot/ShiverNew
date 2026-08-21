"use client";

import { onIdle } from "@/lib/idle";
import { isSlowNetwork } from "@/lib/network";

const WARM_IMAGES = [
  "/media/shiver-platform-notebook.webp",
  "/media/matter-cards.webp",
];

function prefetchImage(src: string) {
  if (typeof document === "undefined") return;
  const img = document.createElement("img");
  img.decoding = "async";
  img.src = src;
}

export function warmupHome() {
  if (isSlowNetwork()) return;
  WARM_IMAGES.forEach(prefetchImage);
}

export function scheduleHomeWarmup() {
  return onIdle(warmupHome, 1600);
}
