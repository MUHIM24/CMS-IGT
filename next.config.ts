import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // www.igt-tech.id & igt-tech.id sama-sama nunjuk ke deployment ini (2 A record di DNS Hostinger)
  // tanpa redirect ini Google lihat konten duplikat di 2 host beda dan bingung nentuin canonical.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.igt-tech.id" }],
        destination: "https://igt-tech.id/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
