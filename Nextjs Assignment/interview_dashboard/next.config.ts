import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    domains: ["dummyjson.com"], // 👈 IMPORTANT
  },
};

export default nextConfig;
