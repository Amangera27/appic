import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.33", "192.168.1.37"],
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appicsoftwares-image.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
