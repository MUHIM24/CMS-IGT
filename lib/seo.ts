import type { Metadata } from "next";
import { siteSettings } from "@/lib/content/site-settings";
import { pageSeo } from "@/lib/content/page-seo";

// Title & deskripsi Beranda, juga jadi default situs (dipakai layout root & halaman Pengaturan admin)
export const SITE_TITLE = pageSeo.home.title;
export const SITE_DESCRIPTION = pageSeo.home.description;

// Metadata standar per halaman: title, description, canonical, plus Open Graph & Twitter
// (Next tidak mengisi og:title/og:description otomatis dari title/description).
// Gambar preview TIDAK diisi di sini: tiap halaman punya opengraph-image.tsx di folder route-nya sendiri.
// Wajib di folder yang sama dengan page.tsx, karena openGraph milik halaman menimpa gambar dari layout induk.
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "id_ID",
      siteName: siteSettings.shortName,
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
