import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.LALAH_STATIC_EXPORT === "true" ? "export" : undefined,
  trailingSlash: true,
};

export default nextConfig;
