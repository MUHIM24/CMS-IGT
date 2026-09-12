import type { CaseStudy } from "./types";

// Foto ilustratif (stok Unsplash, dipakai atas permintaan eksplisit user) — BUKAN foto proyek/kantor asli.
const PHOTO_A = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=380&fit=crop&auto=format";
const PHOTO_B = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=640&h=380&fit=crop&auto=format";
const PHOTO_C = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&h=380&fit=crop&auto=format";

// 6 proyek nyata (lihat discuss.md) — clientLabel generik karena nama klien asli belum bisa dipublikasikan (BR-2)
export const caseStudies: CaseStudy[] = [
  {
    slug: "cnv-robot-slik",
    tag: "Automation",
    title: "CNV Robot SLIK",
    clientLabel: "Perusahaan Pembiayaan — Client A",
    description:
      "Robotic automation yang melakukan pengecekan SLIK OJK secara otomatis untuk memverifikasi riwayat kredit calon debitur, menggantikan proses cek manual dengan proses digital yang lebih cepat dan akurat.",
    imageUrl: PHOTO_A,
  },
  {
    slug: "core-finance-system",
    tag: "Core System",
    title: "Core Finance System",
    clientLabel: "Perusahaan Pembiayaan — Client B",
    description:
      "Sistem inti pembiayaan (multifinance core system) yang mengelola proses kredit end-to-end, dari input CMO, penilaian Credit Analyst, survei lapangan, hingga approval, dalam satu platform modular.",
    imageUrl: PHOTO_B,
  },
  {
    slug: "mobile-approval",
    tag: "Mobile",
    title: "Mobile Approval",
    clientLabel: "Perusahaan Pembiayaan — Client A",
    description:
      "Aplikasi mobile untuk proses persetujuan kredit end-to-end, menghubungkan tiap jenjang approval mulai dari CMO hingga Board of Directors.",
    imageUrl: PHOTO_C,
  },
  {
    slug: "mobile-los",
    tag: "Mobile",
    title: "Mobile LOS (Loan Origination System)",
    clientLabel: "Perusahaan Pembiayaan — Client C",
    description:
      "Aplikasi mobile untuk Credit Analyst dalam mereview kelengkapan dokumen, melakukan scoring, dan menilai kelayakan calon debitur langsung dari perangkat mobile.",
    imageUrl: PHOTO_A,
  },
  {
    slug: "mobile-cmo",
    tag: "Mobile",
    title: "Mobile CMO",
    clientLabel: "Perusahaan Pembiayaan — Client B",
    description:
      "Aplikasi mobile bagi tenaga pemasaran (CMO) untuk mengumpulkan dan melengkapi data customer secara digital pada tahap pengajuan kredit.",
    imageUrl: PHOTO_B,
  },
  {
    slug: "mobile-cnv",
    tag: "Mobile",
    title: "Mobile CNV",
    clientLabel: "Perusahaan Pembiayaan — Client C",
    description:
      "Adaptasi mobile dari sistem pengecekan SLIK, menghadirkan proses verifikasi data debitur ke OJK langsung dari genggaman.",
    imageUrl: PHOTO_C,
  },
];

export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}
