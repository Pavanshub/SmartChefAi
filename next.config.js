/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Removed output: 'export' to allow API routes to work
  // API routes require server-side functionality and cannot be statically exported
};

module.exports = nextConfig;