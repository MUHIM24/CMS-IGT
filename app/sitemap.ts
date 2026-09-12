import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/content/site-settings";

const routes = ["", "/tentang", "/layanan", "/portfolio", "/kontak", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteSettings.siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
