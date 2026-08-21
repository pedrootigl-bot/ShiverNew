type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  downlink?: number;
};

function connection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

export function isSlowNetwork() {
  const info = connection();
  if (!info) return false;
  if (info.saveData) return true;
  if (info.effectiveType === "slow-2g" || info.effectiveType === "2g" || info.effectiveType === "3g") return true;
  if (typeof info.downlink === "number" && info.downlink > 0 && info.downlink < 1.2) return true;
  return false;
}

export function canPrefetch() {
  return !isSlowNetwork();
}

export function skipHeroMotion() {
  const info = connection();
  if (!info) return false;
  if (info.saveData) return true;
  if (info.effectiveType === "slow-2g" || info.effectiveType === "2g") return true;
  return false;
}

export function heroMotionDelayMs() {
  const info = connection();
  if (info?.effectiveType === "3g") return 1800;
  if (typeof info?.downlink === "number" && info.downlink > 0 && info.downlink < 1.6) return 1600;
  return 1000;
}
