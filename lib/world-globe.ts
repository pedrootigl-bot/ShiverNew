import { CONTINENT_RINGS } from "@/lib/world-continents";

export type Vec3 = { x: number; y: number; z: number };

export type GlobeMesh = {
  ocean: Vec3[];
  land: Vec3[];
  coasts: Vec3[][];
};

function latLon(lat: number, lon: number): Vec3 {
  const cl = Math.cos(lat);
  return {
    x: cl * Math.sin(lon),
    y: -Math.sin(lat),
    z: cl * Math.cos(lon),
  };
}

function insideRing(lon: number, lat: number, ring: readonly (readonly [number, number])[]): boolean {
  let odd = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i];
    const b = ring[j];
    if (!a || !b) continue;
    const [xi, yi] = a;
    const [xj, yj] = b;
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      odd = !odd;
    }
  }
  return odd;
}

function isLand(lon: number, lat: number): boolean {
  for (const ring of CONTINENT_RINGS) {
    if (insideRing(lon, lat, ring)) return true;
  }
  return false;
}

function densify(ring: readonly (readonly [number, number])[], maxStep: number): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i];
    const b = ring[i + 1];
    if (!a || !b) continue;
    const [x0, y0] = a;
    const [x1, y1] = b;
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(1, Math.ceil(dist / maxStep));
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      out.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
    }
  }
  return out;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function buildGlobeMesh(): GlobeMesh {
  const ocean: Vec3[] = [];
  for (let latDeg = -66; latDeg <= 66; latDeg += 5.6) {
    const lat = toRad(latDeg);
    const count = Math.max(14, Math.round(64 * Math.cos(lat)));
    for (let i = 0; i < count; i++) {
      const lonDeg = -180 + (i / count) * 360;
      if (isLand(lonDeg, latDeg)) continue;
      ocean.push(latLon(lat, toRad(lonDeg)));
    }
  }

  const land: Vec3[] = [];
  for (let latDeg = -54; latDeg <= 74; latDeg += 2.7) {
    const lat = toRad(latDeg);
    const step = 2.7 / Math.max(0.42, Math.cos(lat));
    for (let lonDeg = -180; lonDeg < 180; lonDeg += step) {
      if (!isLand(lonDeg, latDeg)) continue;
      land.push(latLon(lat, toRad(lonDeg)));
    }
  }

  const coasts = CONTINENT_RINGS.map((ring) =>
    densify(ring, 2.4).map(([lon, lat]) => latLon(toRad(lat), toRad(lon))),
  );

  return { ocean, land, coasts };
}

let cached: GlobeMesh | null = null;

export function getGlobeMesh(): GlobeMesh {
  if (!cached) cached = buildGlobeMesh();
  return cached;
}
