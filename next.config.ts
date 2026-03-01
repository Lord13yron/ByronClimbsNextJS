import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // or whatever size you need
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qrlzxwxpceqrycynoyzh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/postImages/**",
      },
      {
        protocol: "https",
        hostname: "qrlzxwxpceqrycynoyzh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/ui-images/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
