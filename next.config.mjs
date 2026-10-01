/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    // Exact 1x/2x/3x widths of every tile and card (280, 300, 560, 576 CSS px)
    // and every preview view (266, 342, 560, 600, 608 CSS px), so a screen
    // always gets a single clean downscale from the 3x source.
    imageSizes: [266, 280, 300, 342, 532, 560, 576, 600, 608],
    deviceSizes: [640, 684, 750, 798, 828, 840, 900, 1026, 1080, 1120, 1152, 1200, 1216, 1680, 1728, 1800, 1824, 1920],
  },
  // DataFast through our own domain, so ad blockers leave it alone.
  async rewrites() {
    return [
      { source: "/js/script.cookieless.js", destination: "https://datafa.st/js/script.cookieless.js" },
      { source: "/api/events", destination: "https://datafa.st/api/events" },
    ];
  },
};

export default nextConfig;
