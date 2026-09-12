import type { Service } from "./types";

// 6 layanan setara (lihat BR-1 di specs/01-spec.md, direvisi: gak ada yang di-highlight sebagai "flagship")
export const services: Service[] = [
  {
    slug: "web-development",
    title: "Pengembangan Website",
    description:
      "Company profile, portal, hingga web app custom dengan performa dan SEO yang kuat.",
    order: "01",
  },
  {
    slug: "app-development",
    title: "Pengembangan Aplikasi",
    description:
      "Aplikasi bisnis custom, dari desain sampai deployment, sesuai proses kerja Anda.",
    order: "02",
  },
  {
    slug: "system-development",
    title: "Pengembangan Sistem",
    description:
      "Sistem inti bisnis (core system) end-to-end, modular dan terintegrasi antar unit.",
    order: "03",
  },
  {
    slug: "mobile-apps",
    title: "Aplikasi Mobile",
    description:
      "Aplikasi mobile untuk tim lapangan, approval, hingga customer-facing (Android/iOS).",
    order: "04",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    description:
      "Pendampingan strategi teknologi, arsitektur sistem, dan transformasi digital.",
    order: "05",
  },
  {
    slug: "fintech-multifinance",
    title: "Solusi Fintech & Multifinance",
    description:
      "Credit scoring, loan origination, dan automation compliance OJK/SLIK.",
    order: "06",
  },
];

export function getServices(): Service[] {
  return services;
}
