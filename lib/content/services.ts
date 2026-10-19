// Data produk untuk halaman /layanan (versi deskripsi panjang + foto).
// Beranda masih punya versi ringkas sendiri di components/sections/home/Services.tsx.
export const serviceCategories = ["Web", "Automation", "Core System", "Mobile App"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export interface ServiceDetail {
  category: ServiceCategory;
  title: string;
  desc: string;
  img: string;
  imgAlt: string;
}

// Anchor kartu layanan di /layanan (mis. "Web Apps" -> "web-apps"), dipakai link Produk di footer
export function serviceAnchor(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Event yang dikirim link footer setelah navigasi ke anchor layanan (lihat ServiceAnchorLink)
export const SERVICE_ANCHOR_EVENT = "service-anchor";

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=640&h=400&fit=crop&auto=format`;

export const services: ServiceDetail[] = [
  {
    category: "Web",
    title: "Web Apps",
    desc: "Pengembangan aplikasi web modern berbasis React, Vue, atau Laravel, responsif, cepat, dan dapat dikustomisasi sesuai proses bisnis Anda, mulai dari portal internal hingga platform pelanggan.",
    img: unsplash("1498050108023-c5249f4df085"),
    imgAlt: "Kode aplikasi web di layar laptop",
  },
  {
    category: "Web",
    title: "CMS",
    desc: "Sistem manajemen konten yang memudahkan tim non-teknis dalam mengelola halaman, artikel, produk, dan data situs secara mandiri, tanpa perlu menyentuh kode.",
    img: unsplash("1499750310107-5fef28a66643"),
    imgAlt: "Laptop di meja kerja untuk mengelola konten",
  },
  {
    category: "Automation",
    title: "CNV Robot SLIK",
    desc: "Sistem robotic automation yang melakukan pengecekan SLIK OJK secara otomatis untuk memverifikasi riwayat kredit calon debitur, menggantikan proses cek manual dengan proses digital yang lebih cepat, akurat, dan minim human error.",
    img: unsplash("1573164713988-8665fc963095"),
    imgAlt: "Ruang server tempat robot otomasi berjalan",
  },
  {
    category: "Core System",
    title: "Core Finance System",
    desc: "Sistem inti pembiayaan (multifinance core system) yang mengelola proses kredit secara end-to-end, mulai dari input CMO, penilaian Credit Analyst (CA), survei lapangan, hingga approval, terintegrasi dalam satu platform modular.",
    img: unsplash("1551288049-bebda4e38f71"),
    imgAlt: "Dashboard data sistem keuangan",
  },
  {
    category: "Mobile App",
    title: "Mobile Approval",
    desc: "Aplikasi mobile untuk proses persetujuan kredit end-to-end, menghubungkan setiap jenjang approval mulai dari level CMO hingga Board of Directors (BoD), mempercepat keputusan tanpa terikat ruang dan waktu.",
    img: unsplash("1450101499163-c8848c66ca85"),
    imgAlt: "Penandatanganan dokumen persetujuan kredit",
  },
  {
    category: "Mobile App",
    title: "Mobile LOS",
    desc: "Aplikasi mobile untuk Credit Analyst dalam mereview kelengkapan dokumen, melakukan scoring, dan menilai kelayakan calon debitur, mendukung proses analisa kredit langsung dari perangkat mobile.",
    img: unsplash("1554224155-6726b3ff858f"),
    imgAlt: "Review dokumen keuangan dan kalkulator",
  },
  {
    category: "Mobile App",
    title: "Mobile CMO",
    desc: "Aplikasi mobile bagi tenaga pemasaran (CMO) untuk mengumpulkan dan melengkapi data customer secara digital pada tahap pengajuan kredit, mempercepat proses akuisisi di lapangan.",
    img: unsplash("1551836022-d5d88e9218df"),
    imgAlt: "Tenaga pemasaran berdiskusi dengan calon nasabah",
  },
  {
    category: "Mobile App",
    title: "Mobile CNV",
    desc: "Adaptasi mobile dari sistem pengecekan SLIK OJK, menghadirkan proses verifikasi data debitur langsung dari genggaman, memberi fleksibilitas pengecekan kapan pun dan di mana pun dibutuhkan.",
    img: unsplash("1556656793-08538906a9f8"),
    imgAlt: "Beberapa smartphone untuk verifikasi data dari genggaman",
  },
];
