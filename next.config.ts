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
  turbopack: {
    rules: {
      "*yaml": {
        loaders: [
          {
            loader: "yaml-loader",
            options: {},
          },
        ],
      },
    },
  },
};

module.exports = nextConfig;
