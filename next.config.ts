import type { NextConfig } from "next";

const modernPolyfill = "./src/lib/modern-polyfill.ts";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": modernPolyfill,
      "next/dist/build/polyfills/polyfill-module": modernPolyfill,
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": modernPolyfill,
      "next/dist/build/polyfills/polyfill-module": modernPolyfill,
    };
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  async headers() {
    const staticAssetCache = "public, max-age=31536000, immutable";

    return [
      {
        source: "/logos/:path*",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/team/:path*",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.svg",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.jpg",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.ico",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
