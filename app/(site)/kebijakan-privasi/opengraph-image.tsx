import { ogSize, renderOgImage } from "@/lib/og-image";
import { pageSeo } from "@/lib/content/page-seo";

export const alt = pageSeo.privacy.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(pageSeo.privacy.og);
}
