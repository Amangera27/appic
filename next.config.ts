import type { NextConfig } from "next";
import os from "os";

const getLocalIPs = () => {
  const interfaces = os.networkInterfaces();
  const ips: string[] = ["localhost", "127.0.0.1"];
  for (const key in interfaces) {
    const netList = interfaces[key];
    if (netList) {
      for (const net of netList) {
        if (net.family === "IPv4") {
          ips.push(net.address);
        }
      }
    }
  }
  return ips;
};

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: getLocalIPs(),
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
