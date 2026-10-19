import { siteSettings } from "@/lib/content/site-settings";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  // kalimat penutup setelah daftar
  note?: string;
}

export interface LegalDocument {
  path: string;
  title: string;
  description: string;
  // tanggal ISO, ditampilkan sebagai "Terakhir diperbarui"
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}

const contactLine = `Email ${siteSettings.email}, WhatsApp/telepon ${siteSettings.phone}, atau surat ke ${siteSettings.address}.`;

// Isi disesuaikan dengan cara kerja situs saat ini: tanpa akun pengunjung, tanpa analitik pihak ketiga,
// dan form Kontak hanya menyusun pesan WhatsApp (tidak ada data yang dikirim ke server kami).
// Kalau nanti ada analitik, newsletter, atau komentar aktif, bagian terkait WAJIB diperbarui.
export const privacyPolicy: LegalDocument = {
  path: "/kebijakan-privasi",
  title: "Kebijakan Privasi",
  description: `Cara ${siteSettings.companyName} memperlakukan data yang Anda bagikan saat mengunjungi igt-tech.id dan menghubungi kami.`,
  updatedAt: "2026-10-20",
  intro: `Kebijakan ini menjelaskan data apa yang kami terima saat Anda menggunakan situs ${siteSettings.siteUrl.replace("https://", "")} dan menghubungi ${siteSettings.companyName} ("kami"), serta bagaimana data tersebut digunakan dan dilindungi, mengacu pada Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.`,
  sections: [
    {
      heading: "Data yang kami terima",
      paragraphs: [
        "Situs ini tidak meminta Anda membuat akun dan tidak menyimpan isian form di server kami. Data baru kami terima ketika Anda sendiri memilih menghubungi kami, yaitu:",
      ],
      items: [
        "Form Kontak: nama, email, nama perusahaan, layanan yang diminati, dan isi pesan. Form ini hanya menyusun pesan di aplikasi WhatsApp Anda; data baru sampai ke kami setelah Anda menekan kirim di WhatsApp.",
        "WhatsApp, telepon, atau email: nomor, alamat email, nama, dan isi percakapan yang Anda kirimkan.",
      ],
    },
    {
      heading: "Data teknis",
      paragraphs: [
        "Seperti situs pada umumnya, penyedia hosting kami (Vercel) mencatat data teknis kunjungan, misalnya alamat IP, jenis browser, dan waktu akses, untuk keamanan dan menjaga situs tetap berjalan. Situs publik ini tidak memasang cookie pelacak maupun alat analitik pihak ketiga.",
      ],
    },
    {
      heading: "Penggunaan data",
      items: [
        "Menjawab pertanyaan dan menindaklanjuti permintaan konsultasi Anda.",
        "Menyusun penawaran atau proposal yang Anda minta.",
        "Menjalankan kerja sama, bila kemudian disepakati.",
      ],
      note: "Kami tidak menjual, menyewakan, atau membagikan data Anda kepada pihak lain untuk keperluan pemasaran.",
    },
    {
      heading: "Pihak ketiga",
      paragraphs: [
        "Percakapan melalui WhatsApp dan email diproses oleh penyedia layanan tersebut sesuai kebijakan privasi masing-masing. Situs ini dihosting di Vercel dan menampilkan sebagian gambar dari Unsplash.",
      ],
    },
    {
      heading: "Penyimpanan dan keamanan",
      paragraphs: [
        "Data percakapan disimpan selama diperlukan untuk menindaklanjuti permintaan Anda atau menjalankan kerja sama, dan akses dibatasi hanya untuk tim yang menanganinya.",
      ],
    },
    {
      heading: "Hak Anda",
      paragraphs: [
        "Anda dapat meminta akses, perbaikan, atau penghapusan data pribadi yang Anda kirimkan kepada kami, serta menarik persetujuan untuk dihubungi kembali. Ajukan permintaan melalui kontak di bawah.",
      ],
    },
    {
      heading: "Perubahan kebijakan",
      paragraphs: ["Kebijakan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini beserta tanggal pembaruannya."],
    },
    {
      heading: "Hubungi kami",
      paragraphs: [`Pertanyaan tentang kebijakan ini dapat disampaikan ke ${siteSettings.companyName}: ${contactLine}`],
    },
  ],
};

export const termsOfService: LegalDocument = {
  path: "/syarat-layanan",
  title: "Syarat Layanan",
  description: `Ketentuan penggunaan situs igt-tech.id milik ${siteSettings.companyName}, termasuk informasi, hak kekayaan intelektual, dan batasan tanggung jawab.`,
  updatedAt: "2026-10-20",
  intro: `Dengan mengakses situs ${siteSettings.siteUrl.replace("https://", "")} milik ${siteSettings.companyName} ("kami"), Anda menyetujui ketentuan berikut. Ketentuan ini mengatur penggunaan situs, bukan pelaksanaan proyek.`,
  sections: [
    {
      heading: "Informasi di situs",
      paragraphs: [
        "Konten situs ini disediakan sebagai informasi umum tentang perusahaan, layanan, dan topik teknologi. Kami berusaha menjaga informasi tetap akurat dan terbaru, tetapi isinya bukan nasihat hukum, keuangan, maupun regulasi untuk kasus tertentu.",
      ],
    },
    {
      heading: "Layanan dan kerja sama",
      paragraphs: [
        "Deskripsi layanan di situs ini bukan penawaran yang mengikat. Ruang lingkup, biaya, jadwal, kepemilikan source code, dan dukungan pasca-rilis untuk setiap proyek diatur dalam proposal dan perjanjian tertulis yang disepakati bersama klien.",
      ],
    },
    {
      heading: "Hak kekayaan intelektual",
      paragraphs: [
        `Nama, logo, teks, dan desain situs ini milik ${siteSettings.companyName}, kecuali disebutkan lain. Foto stok berasal dari Unsplash sesuai lisensinya, dan nama atau logo pihak lain tetap milik pemiliknya masing-masing. Konten boleh dikutip untuk keperluan non-komersial dengan mencantumkan sumber dan tautan ke situs ini.`,
      ],
    },
    {
      heading: "Penggunaan yang tidak diperbolehkan",
      items: [
        "Mengganggu, membebani, atau mencoba mengakses bagian situs yang tidak ditujukan untuk publik.",
        "Menyalin konten secara massal untuk tujuan komersial tanpa izin tertulis.",
        "Menggunakan nama atau logo kami dengan cara yang menyesatkan.",
      ],
    },
    {
      heading: "Tautan ke situs lain",
      paragraphs: ["Situs ini dapat memuat tautan ke layanan pihak ketiga seperti WhatsApp. Kami tidak bertanggung jawab atas isi maupun kebijakan situs tersebut."],
    },
    {
      heading: "Batasan tanggung jawab",
      paragraphs: [
        "Situs ini disediakan apa adanya. Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan informasi di situs ini tanpa perjanjian kerja sama yang berlaku.",
      ],
    },
    {
      heading: "Hukum yang berlaku",
      paragraphs: ["Ketentuan ini tunduk pada hukum Negara Republik Indonesia."],
    },
    {
      heading: "Perubahan dan kontak",
      paragraphs: [`Ketentuan ini dapat diperbarui sewaktu-waktu. Pertanyaan dapat disampaikan ke ${siteSettings.companyName}: ${contactLine}`],
    },
  ],
};
