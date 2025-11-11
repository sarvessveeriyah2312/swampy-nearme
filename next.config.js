/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedDevOrigins: [
      'http://localhost:3000',
      'http://192.168.0.23:3000', // 👈 replace with your LAN IP if different
    ],
  },
};

module.exports = nextConfig;
