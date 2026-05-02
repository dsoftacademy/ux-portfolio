// next.config.js
const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid picking a parent folder when multiple lockfiles exist on the machine
  outputFileTracingRoot: path.join(__dirname),
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