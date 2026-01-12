import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repo = "new-website";

const nextConfig: NextConfig = {
  // Only use static export and basePath for production builds
  ...(isProduction && {
    output: "export",
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
  }),
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? `/${repo}` : "",
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
