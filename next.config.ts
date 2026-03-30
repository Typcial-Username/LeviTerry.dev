import path from "node:path";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
