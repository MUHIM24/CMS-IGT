import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/content/site-settings";

// "/tim" ditunda dari sitemap — belum ada foto tim asli, lihat app/tim/page.tsx.
const routes = ["", "/tentang", "/layanan", "/portfolio", "/kontak", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteSettings.siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
