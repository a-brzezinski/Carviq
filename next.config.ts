import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blc4l3o4ki.ufs.sh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
