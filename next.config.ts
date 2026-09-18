import type { NextConfig } from "next";

/**
 * Export estático para Hostinger (mesmo modelo Bull-ex).
 * Produção na raiz: https://www.shiverbroker.com/
 * Subpasta opcional: BASE_PATH=/minha-pasta npm run build
 */
const isDev = process.env.NODE_ENV === "development";
const rawBasePath =
  process.env.BASE_PATH !== undefined
    ? process.env.BASE_PATH
    : isDev
      ? ""
      : "";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  allowedDevOrigins: ["127.0.0.1"],
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 60, 65, 70, 75, 80],
    localPatterns: [
      { pathname: "/media/**" },
      { pathname: "/icon.png" },
      { pathname: "/og.png" },
    ],
  },
};

export default nextConfig;
