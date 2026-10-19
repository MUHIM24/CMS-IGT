// PLACEHOLDER (keputusan user 2026-10-19): nama & foto tim asli belum ada.
// Kartu menampilkan jabatan + avatar placeholder. Isi `name`, `photo` (path di public/), dan `linkedin`
// begitu datanya ada; tombol LinkedIn hanya muncul kalau `linkedin` diisi (jangan pakai href="#").
export interface TeamMember {
  role: string;
  focus: string;
  name?: string;
  photo?: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  { role: "CEO & Founder", focus: "Strategi & Pengembangan Bisnis" },
  { role: "CTO", focus: "Arsitektur Sistem & Teknologi" },
  { role: "Project Manager", focus: "Perencanaan & Pengiriman Proyek" },
  { role: "Lead Developer", focus: "Pengembangan Web & Mobile" },
  { role: "Business Analyst", focus: "Analisa Kebutuhan & Proses Bisnis" },
  { role: "Mobile Developer", focus: "Aplikasi Android & Integrasi" },
  { role: "QA Engineer", focus: "Pengujian & Jaminan Kualitas" },
  { role: "Customer Support", focus: "Pendampingan & Dukungan Pasca Go-Live" },
];
