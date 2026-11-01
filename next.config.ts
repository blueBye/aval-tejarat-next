import type { NextConfig } from 'next';

// No server runtime, database, API routes, or Cloudflare Workers needed.
// Cloudflare Pages serves the generated /out folder directly.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
