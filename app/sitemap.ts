import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/articles";
import { siteSettings } from "@/lib/content/site-settings";

// "/tim" ditunda dari sitemap — belum ada foto tim asli, lihat app/tim/page.tsx.
const routes = ["", "/tentang", "/layanan", "/portfolio", "/kontak", "/blog", "/kebijakan-privasi", "/syarat-layanan"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map((route) => ({
    url: `${siteSettings.siteUrl}${route}`,
    lastModified: new Date(),
  }));
  const posts = articles.map((a) => ({
    url: `${siteSettings.siteUrl}/blog/${a.slug}`,
    lastModified: new Date(a.date),
  }));
  return [...pages, ...posts];
}
