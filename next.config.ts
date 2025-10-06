import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint errors during build
  },
};

export default nextConfig;
