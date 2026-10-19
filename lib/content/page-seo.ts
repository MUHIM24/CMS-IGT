import { privacyPolicy, termsOfService } from "@/lib/content/legal";
import { siteSettings } from "@/lib/content/site-settings";
import type { OgContent } from "@/lib/og-image";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  // teks di gambar preview (app/**/opengraph-image.tsx)
  og: OgContent;
}

// Sumber tunggal title, deskripsi, dan teks gambar preview tiap halaman publik.
// Title <= ~65 karakter, deskripsi <= ~160 karakter (batas tampil Google & WhatsApp).
export const pageSeo = {
  home: {
    path: "/",
    title: "PT Inovasi Gantarawana Teknologi | Software House dan Jasa Pembuatan Aplikasi",
    description:
      "Mitra teknologi untuk bisnis Anda. Kami merancang dan membangun website, aplikasi mobile, dan sistem bisnis yang aman, andal, dan sudah teruji di produksi.",
    og: { heading: "Software House dan Jasa Pembuatan Aplikasi", subheading: siteSettings.tagline },
  },
  about: {
    path: "/tentang",
    title: "Tentang PT Inovasi Gantarawana Teknologi | Software House Bogor",
    description:
      "Kenali PT Inovasi Gantarawana Teknologi, software house di Bogor yang menghadirkan solusi digital untuk bisnis dengan proses transparan dan dukungan jangka panjang.",
    og: {
      label: "Tentang Kami",
      heading: "Mitra Teknologi untuk Bisnis di Seluruh Indonesia",
      subheading: "Proses transparan, kualitas terjaga, dukungan jangka panjang",
    },
  },
  services: {
    path: "/layanan",
    title: "Jasa Pembuatan Aplikasi Web, Mobile, dan Sistem Bisnis | PT IGT",
    description:
      "Pembuatan aplikasi web, CMS, aplikasi mobile, hingga sistem inti dan otomasi proses bisnis. Dirancang sesuai kebutuhan Anda dan dikerjakan end-to-end oleh tim PT IGT.",
    og: {
      label: "Layanan",
      heading: "Aplikasi Web, Mobile, dan Sistem Bisnis Sesuai Kebutuhan Anda",
      subheading: "Dikerjakan end-to-end, dari analisis kebutuhan hingga rilis",
    },
  },
  portfolio: {
    path: "/portfolio",
    title: "Portfolio Proyek Aplikasi dan Sistem Bisnis | PT IGT",
    description:
      "Proyek PT IGT yang sudah berjalan di produksi: sistem pembiayaan end-to-end, aplikasi mobile untuk tim lapangan, dan otomasi proses yang mempercepat kerja klien.",
    og: {
      label: "Portfolio",
      heading: "Solusi yang Sudah Berjalan di Produksi",
      subheading: "Sistem pembiayaan, aplikasi mobile lapangan, dan otomasi proses",
    },
  },
  contact: {
    path: "/kontak",
    title: "Hubungi PT IGT | Konsultasi Gratis Pembuatan Aplikasi",
    description:
      "Ceritakan kebutuhan aplikasi atau sistem bisnis Anda. Konsultasi gratis bersama tim PT IGT lewat WhatsApp, telepon, atau email, kami bantu dari ide hingga rilis.",
    og: {
      label: "Kontak",
      heading: "Konsultasi Gratis Kebutuhan Aplikasi Bisnis Anda",
      subheading: `WhatsApp ${siteSettings.phone}  |  ${siteSettings.email}`,
    },
  },
  blog: {
    path: "/blog",
    title: "Blog Teknologi dan Pengembangan Aplikasi | PT IGT",
    description:
      "Wawasan praktis seputar pengembangan aplikasi, digitalisasi proses bisnis, dan sistem pembiayaan, ditulis tim PT IGT dari pengalaman proyek nyata.",
    og: {
      label: "Blog & Artikel",
      heading: "Wawasan Teknologi untuk Bisnis Anda",
      subheading: "Pengembangan aplikasi, digitalisasi proses, dan sistem pembiayaan",
    },
  },
  privacy: {
    path: privacyPolicy.path,
    title: `${privacyPolicy.title} | ${siteSettings.companyName}`,
    description: privacyPolicy.description,
    og: { label: "Legal", heading: privacyPolicy.title, subheading: "Cara kami memperlakukan data yang Anda bagikan" },
  },
  terms: {
    path: termsOfService.path,
    title: `${termsOfService.title} | ${siteSettings.companyName}`,
    description: termsOfService.description,
    og: { label: "Legal", heading: termsOfService.title, subheading: "Ketentuan penggunaan situs igt-tech.id" },
  },
} satisfies Record<string, PageSeo>;
