import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Node-only dependencies out of Next.js' browser/server bundle graph.
  // pg relies on built-in Node modules such as `tls` at runtime.
  serverExternalPackages: ["pg"],
};

export default nextConfig;
