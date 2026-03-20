// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Required for Cloudflare Pages static deployment
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export mode
  },
  eslint: {
    // Re-enable strict linting checks
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Re-enable strict type checking
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;