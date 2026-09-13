export interface CaseStudy {
  slug: string;
  img: string;
  tag: string;
  title: string;
  client: string;
  desc: string;
}

// Dipakai identik di preview Portfolio (Beranda) dan halaman /portfolio penuh,
// porting persis dari WEBSITE DESIGN FIGMA PT IGT/src/pages/HomePage.tsx & PortfolioPage.tsx.
export const caseStudies: CaseStudy[] = [
  {
    slug: "core-multifinance",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=380&fit=crop&auto=format",
    tag: "Multifinance",
    title: "Sistem Core Multifinance End-to-End",
    client: "Perusahaan Pembiayaan — Client A",
    desc: "Implementasi sistem core pembiayaan konsumen mencakup origination, approval, disbursement, collection, dan pelaporan OJK otomatis.",
  },
  {
    slug: "mobile-los",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&h=380&fit=crop&auto=format",
    tag: "Mobile LOS",
    title: "Aplikasi Mobile Loan Origination",
    client: "Perusahaan Pembiayaan — Client B",
    desc: "Aplikasi Android untuk proses pengajuan kredit end-to-end: input data, upload dokumen, verifikasi SLIK OJK, hingga persetujuan digital.",
  },
  {
    slug: "cmo-field-app",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=380&fit=crop&auto=format",
    tag: "CMO Field App",
    title: "Aplikasi Mobile Agen Lapangan (CMO)",
    client: "Perusahaan Pembiayaan — Client C",
    desc: "Aplikasi mobile untuk field agent: kunjungan nasabah, rekam GPS, form survey digital, dan sinkronisasi real-time ke sistem core.",
  },
];

