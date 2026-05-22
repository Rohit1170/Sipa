/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "domf5oio6qrcr.cloudfront.net" },
      { protocol: "https", hostname: "www.sipanutrition.com" },
    ],
  },
};

export default nextConfig;
