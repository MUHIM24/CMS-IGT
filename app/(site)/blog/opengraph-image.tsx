import { ogSize, renderOgImage } from "@/lib/og-image";
import { pageSeo } from "@/lib/content/page-seo";

export const alt = pageSeo.blog.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(pageSeo.blog.og);
}
