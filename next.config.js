/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep default .next directory (explicit is fine)
  distDir: '.next',

  reactStrictMode: true,
  // NOTE: do not include swcMinify (Netlify runtime complains)
  // swcMinify: true, // <-- removed
};

module.exports = nextConfig;
