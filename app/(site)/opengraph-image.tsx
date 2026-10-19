import { ogSize, renderOgImage } from "@/lib/og-image";
import { pageSeo } from "@/lib/content/page-seo";

// Gambar preview Beranda (route lain punya opengraph-image.tsx sendiri)
export const alt = pageSeo.home.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(pageSeo.home.og);
}
