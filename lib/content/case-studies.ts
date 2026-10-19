import type { ServiceCategory } from "@/lib/content/services";

export interface CaseStudy {
  slug: string;
  img: string;
  tag: string;
  // kategori sama dengan /layanan, dipakai tab filter di /portfolio
  category: ServiceCategory;
  title: string;
  client: string;
  desc: string;
}

// Dipakai identik di preview Portfolio (Beranda) dan halaman /portfolio penuh.
// Deskripsi hanya memuat fitur yang benar-benar ada (sama dengan lib/content/services.ts); nama klien tidak ditampilkan.
export const caseStudies: CaseStudy[] = [
  {
    slug: "core-multifinance",
    category: "Core System",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=380&fit=crop&auto=format",
    tag: "Multifinance",
    title: "Sistem Core Multifinance End-to-End",
    client: "Perusahaan Pembiayaan (Multifinance)",
    desc: "Sistem pembiayaan end-to-end dalam satu platform: registrasi oleh CMO, pengecekan SLIK OJK, analisa Credit Analyst, survei, komite approval, hingga pencairan.",
  },
  {
    slug: "mobile-los",
    category: "Mobile App",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&h=380&fit=crop&auto=format",
    tag: "Mobile LOS",
    title: "Aplikasi Mobile Loan Origination",
    client: "Perusahaan Pembiayaan (Multifinance)",
    desc: "Aplikasi Android untuk proses pengajuan kredit: input data, upload dokumen, verifikasi SLIK OJK dan data kependudukan Dukcapil, hingga persetujuan digital.",
  },
  {
    slug: "cmo-field-app",
    category: "Mobile App",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=380&fit=crop&auto=format",
    tag: "CMO Field App",
    title: "Aplikasi Mobile Agen Lapangan (CMO)",
    client: "Perusahaan Pembiayaan (Multifinance)",
    desc: "Aplikasi mobile untuk tenaga pemasaran (CMO) di lapangan: mengumpulkan dan melengkapi data calon nasabah secara digital, langsung terhubung ke sistem pembiayaan.",
  },
];

