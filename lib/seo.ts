import type { Metadata } from "next";
import { siteSettings } from "@/lib/content/site-settings";

// Title & deskripsi Beranda, juga jadi default situs (dipakai layout root & halaman Pengaturan admin)
export const SITE_TITLE = "PT Inovasi Gantarawana Teknologi | Software House dan Jasa Pembuatan Aplikasi";
export const SITE_DESCRIPTION =
  "Mitra teknologi untuk bisnis Anda. Kami merancang dan membangun website, aplikasi mobile, dan sistem bisnis yang aman, andal, dan sudah teruji di produksi.";

// Gambar preview default (WhatsApp, Facebook, LinkedIn, X) dari app/opengraph-image.tsx.
// Harus dipasang eksplisit: openGraph milik halaman menimpa seluruh openGraph layout, termasuk gambar dari file konvensi.
const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${siteSettings.companyName} - Software House dan Jasa Pembuatan Aplikasi`,
};

// Metadata standar per halaman: title, description, canonical, plus Open Graph & Twitter
// (Next tidak mengisi og:title/og:description otomatis dari title/description).
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
  const images = image ? [image] : [DEFAULT_OG_IMAGE];
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
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
