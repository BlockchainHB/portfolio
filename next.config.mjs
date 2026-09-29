/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    // Exact 1x/2x/3x widths of every tile and card (280, 300, 560, 576 CSS px),
    // so a screen always gets a single clean downscale from the 3x source.
    imageSizes: [280, 300, 560, 576, 600, 840, 900],
    deviceSizes: [640, 750, 828, 1080, 1120, 1152, 1200, 1680, 1728, 1920],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
