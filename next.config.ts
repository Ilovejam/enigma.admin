import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Build sırasında ESLint hatalarını yok say
  },
  images: {
    domains: ['coin-images.coingecko.com'], // Dış kaynaklı görseller için izin verilen alan adları
  },
};

export default nextConfig;
