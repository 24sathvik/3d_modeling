// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Do NOT set an absolute distDir. Use default or a relative path.
  // If you don't need a custom distDir, you can simply omit it.
  // distDir: '.next',

  reactStrictMode: true,
  swcMinify: true,

  // Add other Next.js-safe options here if you need them,
  // but avoid absolute path settings referencing /vercel/path0 .
};

export default nextConfig;
