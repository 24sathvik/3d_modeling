// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep default .next directory (do NOT use absolute paths)
  // distDir: '.next', // optional — keep it relative if you uncomment

  reactStrictMode: true,
  swcMinify: true,

  // Avoid any code that sets absolute paths like '/vercel/path0'
};

export default nextConfig;
