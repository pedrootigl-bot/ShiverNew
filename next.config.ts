import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
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
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    if (isDev) {
      return [
        {
          source: "/:path*",
          headers: [
            ...securityHeaders,
            { key: "Cache-Control", value: "no-store, must-revalidate" },
          ],
        },
        {
          source: "/_next/static/:path*",
          headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
        },
      ];
    }

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:all*(ico|png|jpg|jpeg|webp|avif|woff2|mp4)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
