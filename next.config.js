/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel handles deployment natively — no static export needed
  // output: 'export' is only needed for GitHub Pages
  images: { unoptimized: true },
};

module.exports = nextConfig;
