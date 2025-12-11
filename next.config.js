/** @type {import('next').NextConfig} */
const nextConfig = {
  // explicit relative distDir avoids Vercel/Netlify path bugs
  distDir: '.next',

  reactStrictMode: true,

  // IMPORTANT: prevent Next.js from running ESLint during `next build`
  // This avoids the circular-structure ESLint crash during CI builds.
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
