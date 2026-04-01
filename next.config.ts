import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true
  },
  // eslint: {
  //   ignoreDuringBuild: true
  // }
};

export default nextConfig;
