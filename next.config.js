/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force explicit relative .next directory to avoid Vercel path duplication
  distDir: '.next',

  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
