import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true
  },
  // eslint: {
  //   ignoreDuringBuild: true
  // }
};

export default nextConfig;
