import type { Metadata } from "next";
import { siteSettings } from "@/lib/content/site-settings";

// Metadata standar per halaman: title, description, canonical, plus Open Graph & Twitter
// (Next tidak mengisi og:title/og:description otomatis dari title/description).
// Gambar OG default diambil otomatis dari app/opengraph-image.tsx.
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "id_ID",
      siteName: siteSettings.companyName,
      url: path,
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}
