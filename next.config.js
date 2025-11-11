/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  // ✅ Keep this to enable future appDir/stable features if needed
  experimental: {},
};

module.exports = nextConfig;
