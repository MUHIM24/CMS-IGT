// CONTOH ILUSTRASI (keputusan user 2026-10-19): belum ada kutipan asli dari klien.
// Sengaja tanpa nama orang/perusahaan karangan, atribusi cukup jabatan + jenis perusahaan,
// dan section menampilkan catatan "contoh ilustrasi". Ganti dengan kutipan asli (seizin klien) begitu ada,
// lalu hapus catatan di components/sections/home/Testimonials.tsx. Jangan salin ke llms.txt / JSON-LD.
export interface Testimonial {
  quote: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Pengecekan SLIK yang dulu manual sekarang berjalan otomatis. Tim analis kami bisa fokus ke penilaian, bukan input data.",
    role: "Kepala Divisi Kredit",
    company: "Perusahaan Pembiayaan",
  },
  {
    quote:
      "Aplikasi mobile untuk CMO membuat pengajuan dari lapangan langsung masuk sistem. Tidak ada lagi berkas yang tertahan berhari-hari.",
    role: "Manajer Operasional",
    company: "Perusahaan Pembiayaan",
  },
  {
    quote:
      "Yang kami hargai, sistem baru terhubung ke core yang sudah berjalan tanpa harus migrasi besar-besaran.",
    role: "Kepala Divisi IT",
    company: "Perusahaan Pembiayaan",
  },
  {
    quote:
      "Demo tiap dua minggu membuat kami selalu tahu progresnya. Masukan dari tim bisnis langsung ditindaklanjuti.",
    role: "Project Owner",
    company: "Perusahaan Pembiayaan",
  },
  {
    quote:
      "Approval kredit bisa dilakukan dari mana saja lewat aplikasi mobile, keputusan jadi lebih cepat tanpa menunggu berkas fisik.",
    role: "Direktur Bisnis",
    company: "Perusahaan Pembiayaan",
  },
  {
    quote:
      "Tim IGT paham proses bisnis pembiayaan, jadi diskusi kebutuhan berjalan cepat tanpa banyak penjelasan ulang.",
    role: "Kepala Divisi Bisnis",
    company: "Perusahaan Pembiayaan",
  },
];
