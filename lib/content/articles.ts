// Artikel blog statis (Fase 1, belum ada database/CMS). Pindah ke CMS di Fase 2.
// Isi bersifat edukatif umum, tanpa klaim angka/hasil proyek. Teks tampil tanpa em dash.

export const articleCategories = ["Panduan", "Regulasi", "Teknologi", "Tips Bisnis"] as const;
export type ArticleCategory = (typeof articleCategories)[number];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "cards"; items: { title: string; desc: string }[] }
  | { type: "steps"; items: { title: string; desc: string }[] }
  | { type: "highlights"; items: { label: string; value: string; desc: string }[] };

export interface ArticleSection {
  id: string;
  heading: string;
  blocks: ArticleBlock[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  tags: string[];
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  img: string;
  imgAlt: string;
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
}

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=960&h=600&fit=crop&auto=format`;

export const articles: Article[] = [
  {
    slug: "apa-itu-slik-ojk",
    title: "Apa Itu SLIK OJK dan Kenapa Pengecekannya Perlu Diotomasi",
    excerpt:
      "SLIK OJK adalah sumber utama riwayat kredit calon debitur. Pahami isinya, tantangan pengecekan manual, dan bagaimana otomasi membantu tim analis.",
    category: "Regulasi",
    tags: ["SLIK OJK", "Otomasi", "Multifinance"],
    date: "2026-10-16",
    readMinutes: 4,
    img: unsplash("1554224155-6726b3ff858f"),
    imgAlt: "Dokumen keuangan dan kalkulator di meja",
    sections: [
      {
        id: "apa-itu-slik",
        heading: "Apa Itu SLIK OJK?",
        blocks: [
          {
            type: "p",
            text: "SLIK (Sistem Layanan Informasi Keuangan) adalah sistem yang dikelola Otoritas Jasa Keuangan untuk menyimpan dan menyediakan informasi debitur dari lembaga jasa keuangan pelapor. SLIK menggantikan Sistem Informasi Debitur (BI Checking) sejak pengelolaannya beralih ke OJK.",
          },
          {
            type: "p",
            text: "Bagi perusahaan pembiayaan, hasil SLIK menjadi salah satu dasar utama dalam menilai kelayakan calon debitur sebelum kredit disetujui.",
          },
        ],
      },
      {
        id: "isi-laporan-slik",
        heading: "Informasi yang Ada di Laporan SLIK",
        blocks: [
          { type: "p", text: "Secara umum, laporan SLIK memuat beberapa kelompok informasi berikut." },
          {
            type: "cards",
            items: [
              { title: "Identitas Debitur", desc: "Data diri dan identitas yang terdaftar di lembaga pelapor." },
              { title: "Fasilitas Kredit", desc: "Pinjaman yang sedang atau pernah dimiliki debitur." },
              { title: "Kolektibilitas", desc: "Kualitas pembayaran, dari lancar hingga macet." },
              { title: "Agunan & Penjamin", desc: "Jaminan yang terkait dengan fasilitas kredit." },
            ],
          },
        ],
      },
      {
        id: "tantangan-manual",
        heading: "Tantangan Pengecekan Manual",
        blocks: [
          {
            type: "list",
            items: [
              "Petugas harus login ke portal dan mengunduh laporan satu per satu.",
              "Data dari laporan disalin ulang ke sistem internal, rawan salah ketik.",
              "Antrean pengecekan menumpuk saat pengajuan sedang tinggi.",
              "Sulit melacak siapa mengecek apa dan kapan, padahal ini penting untuk audit.",
            ],
          },
        ],
      },
      {
        id: "cara-kerja-otomasi",
        heading: "Cara Kerja Otomasi Pengecekan SLIK",
        blocks: [
          { type: "p", text: "Robot otomasi menjalankan langkah yang sama dengan petugas, tetapi tanpa jeda dan tanpa salin ulang." },
          {
            type: "steps",
            items: [
              { title: "Pengajuan Masuk", desc: "Data calon debitur masuk dari aplikasi CMO atau cabang." },
              { title: "Robot Login", desc: "Robot masuk ke portal SLIK dengan akun resmi lembaga." },
              { title: "Ambil Laporan", desc: "Laporan diunduh dan datanya diekstrak otomatis." },
              { title: "Kirim ke Sistem", desc: "Hasil langsung tersedia untuk scoring dan analis kredit." },
            ],
          },
          {
            type: "highlights",
            items: [
              { label: "Sebelum", value: "Manual", desc: "Unduh, baca, dan salin data laporan satu per satu." },
              { label: "Sesudah", value: "Otomatis", desc: "Analis langsung menerima data terstruktur dan fokus menilai." },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Apakah SLIK sama dengan BI Checking?", a: "SLIK adalah pengganti BI Checking. Fungsinya serupa, yaitu menyediakan riwayat kredit debitur, tetapi kini dikelola oleh OJK." },
      { q: "Apakah otomasi SLIK mengubah hasil laporan?", a: "Tidak. Otomasi hanya mengambil dan merapikan data dari portal resmi, isi laporan tetap sama dengan yang diunduh manual." },
      { q: "Apakah robot butuh akses khusus?", a: "Robot memakai akun resmi milik lembaga pelapor, sama seperti petugas, sehingga hak akses tetap mengikuti ketentuan OJK." },
    ],
  },
  {
    slug: "mengenal-loan-origination-system",
    title: "Mengenal Loan Origination System (LOS) untuk Perusahaan Pembiayaan",
    excerpt:
      "LOS mengatur perjalanan pengajuan kredit dari pendaftaran hingga pencairan. Kenali tahapannya dan manfaatnya bagi tim bisnis maupun manajemen.",
    category: "Teknologi",
    tags: ["LOS", "Multifinance", "Digitalisasi"],
    date: "2026-10-13",
    readMinutes: 4,
    img: unsplash("1551288049-bebda4e38f71"),
    imgAlt: "Dashboard data pada layar laptop",
    sections: [
      {
        id: "apa-itu-los",
        heading: "Apa Itu Loan Origination System?",
        blocks: [
          {
            type: "p",
            text: "Loan Origination System (LOS) adalah sistem yang mengelola seluruh proses pengajuan kredit, mulai dari data calon debitur masuk hingga kredit dicairkan. LOS menghubungkan peran yang terlibat, seperti CMO, Credit Analyst, surveyor, dan komite approval, dalam satu alur kerja.",
          },
        ],
      },
      {
        id: "tahapan-los",
        heading: "Tahapan dalam LOS",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Registrasi", desc: "CMO menginput data calon debitur dan dokumen." },
              { title: "Verifikasi", desc: "Cek identitas dan riwayat kredit melalui SLIK." },
              { title: "Scoring", desc: "Sistem menilai risiko berdasarkan aturan yang disepakati." },
              { title: "Analisa & Survei", desc: "Credit Analyst menilai, surveyor memverifikasi lapangan." },
              { title: "Approval", desc: "Komite memutuskan sesuai jenjang kewenangan." },
              { title: "Pencairan", desc: "Kredit dicairkan dan dicatat ke core system." },
            ],
          },
        ],
      },
      {
        id: "manfaat-los",
        heading: "Manfaat LOS",
        blocks: [
          {
            type: "cards",
            items: [
              { title: "Alur Terstandar", desc: "Setiap pengajuan melewati tahapan yang sama dan terdokumentasi." },
              { title: "Status Real-time", desc: "Posisi setiap pengajuan bisa dipantau kapan saja." },
              { title: "Jejak Audit", desc: "Setiap keputusan tercatat lengkap dengan waktu dan pelakunya." },
              { title: "Terhubung ke Core", desc: "Data tidak perlu diinput ulang ke sistem inti." },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Apakah LOS menggantikan core system?", a: "Tidak harus. LOS bisa berjalan di depan core system yang sudah ada dan mengirim hasil akhirnya ke core." },
      { q: "Apakah LOS bisa diakses lewat ponsel?", a: "Bisa. Tahapan lapangan seperti input CMO dan approval umumnya dibuat dalam bentuk aplikasi mobile." },
    ],
  },
  {
    slug: "digitalisasi-proses-kredit-multifinance",
    title: "Langkah Awal Digitalisasi Proses Kredit di Perusahaan Multifinance",
    excerpt:
      "Digitalisasi tidak harus dimulai dengan mengganti semua sistem. Mulailah dari titik yang paling sering menghambat pengajuan kredit.",
    category: "Tips Bisnis",
    tags: ["Digitalisasi", "Multifinance", "Integrasi"],
    date: "2026-10-09",
    readMinutes: 3,
    img: unsplash("1563986768609-322da13575f3"),
    imgAlt: "Laptop dan ponsel dipakai bersamaan",
    sections: [
      {
        id: "mulai-dari-hambatan",
        heading: "Mulai dari Titik Hambatan",
        blocks: [
          {
            type: "p",
            text: "Petakan dulu di tahap mana pengajuan paling sering tertahan. Biasanya hambatan ada di input data lapangan, pengecekan SLIK, atau menunggu tanda tangan approval.",
          },
          {
            type: "list",
            items: [
              "Berapa lama berkas berpindah dari cabang ke kantor pusat?",
              "Tahap mana yang masih memakai kertas atau spreadsheet?",
              "Data apa yang diinput lebih dari satu kali?",
            ],
          },
        ],
      },
      {
        id: "integrasi-bukan-ganti",
        heading: "Integrasi, Bukan Ganti Total",
        blocks: [
          {
            type: "p",
            text: "Core system lama biasanya sudah stabil dan memegang data penting. Pendekatan yang lebih aman adalah membangun lapisan alur kerja baru yang terhubung ke core, sehingga proses bisa dimodernisasi tanpa migrasi besar.",
          },
          {
            type: "highlights",
            items: [
              { label: "Risiko", value: "Lebih Rendah", desc: "Core tetap berjalan, perubahan dilakukan bertahap." },
              { label: "Hasil", value: "Lebih Cepat", desc: "Tahap yang paling menghambat bisa dibenahi lebih dulu." },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Tahap mana yang sebaiknya didigitalkan pertama?", a: "Tahap yang paling sering membuat pengajuan tertahan. Untuk banyak perusahaan, ini adalah input data lapangan dan pengecekan SLIK." },
    ],
  },
  {
    slug: "verifikasi-debitur-dukcapil",
    title: "Verifikasi Data Debitur Lewat Integrasi Dukcapil",
    excerpt:
      "Integrasi dengan data kependudukan membantu memastikan identitas calon debitur sejak awal pengajuan. Simak alur dan hal yang perlu disiapkan.",
    category: "Panduan",
    tags: ["Dukcapil", "Verifikasi", "Integrasi"],
    date: "2026-10-05",
    readMinutes: 3,
    img: unsplash("1450101499163-c8848c66ca85"),
    imgAlt: "Penandatanganan dokumen pengajuan",
    sections: [
      {
        id: "kenapa-verifikasi",
        heading: "Kenapa Verifikasi Identitas Penting",
        blocks: [
          {
            type: "p",
            text: "Kesalahan identitas di awal pengajuan bisa berdampak ke seluruh proses, dari hasil SLIK hingga dokumen perjanjian. Verifikasi ke data kependudukan memastikan NIK dan data diri calon debitur sesuai sebelum proses berlanjut.",
          },
        ],
      },
      {
        id: "yang-perlu-disiapkan",
        heading: "Yang Perlu Disiapkan",
        blocks: [
          {
            type: "cards",
            items: [
              { title: "Perjanjian Kerja Sama", desc: "Akses data kependudukan diberikan melalui kerja sama resmi dengan Ditjen Dukcapil." },
              { title: "Infrastruktur Aman", desc: "Koneksi dan server yang memenuhi ketentuan keamanan data." },
              { title: "Aturan Akses", desc: "Siapa yang boleh memverifikasi dan untuk keperluan apa." },
            ],
          },
        ],
      },
      {
        id: "alur-verifikasi",
        heading: "Alur Verifikasi dalam Sistem",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Input NIK", desc: "CMO memasukkan NIK dan data dasar calon debitur." },
              { title: "Kirim Permintaan", desc: "Sistem mengirim permintaan verifikasi secara aman." },
              { title: "Cocokkan Data", desc: "Hasil dicocokkan dengan data yang diinput." },
              { title: "Lanjut atau Tandai", desc: "Data sesuai lanjut ke tahap berikutnya, yang tidak sesuai ditandai." },
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Apakah semua perusahaan bisa langsung mengakses data Dukcapil?", a: "Tidak. Akses diberikan melalui perjanjian kerja sama dengan Ditjen Dukcapil dan harus memenuhi persyaratannya." },
    ],
  },
  {
    slug: "tips-memilih-software-house",
    title: "5 Hal yang Perlu Dicek Sebelum Memilih Software House",
    excerpt:
      "Memilih mitra pengembangan sistem adalah keputusan jangka panjang. Gunakan daftar ini untuk menilai calon software house sebelum tanda tangan kontrak.",
    category: "Tips Bisnis",
    tags: ["Software House", "Tips", "Kontrak"],
    date: "2026-10-01",
    readMinutes: 3,
    img: unsplash("1552664730-d307ca884978"),
    imgAlt: "Tim berdiskusi di ruang rapat",
    sections: [
      {
        id: "yang-perlu-dicek",
        heading: "Yang Perlu Dicek",
        blocks: [
          {
            type: "cards",
            items: [
              { title: "Pemahaman Bisnis", desc: "Apakah mereka bertanya soal proses bisnis Anda, bukan hanya fitur?" },
              { title: "Cara Kerja", desc: "Seberapa sering progres ditunjukkan, misalnya demo per sprint." },
              { title: "Kepemilikan Kode", desc: "Pastikan source code dan dokumentasi diserahkan kepada Anda." },
              { title: "Dukungan Pasca Rilis", desc: "Cakupan dan waktu respons dukungan tertulis dalam SLA." },
              { title: "Keamanan Data", desc: "Bagaimana data sensitif disimpan dan siapa yang bisa mengaksesnya." },
            ],
          },
        ],
      },
      {
        id: "pertanyaan-saat-meeting",
        heading: "Pertanyaan untuk Meeting Pertama",
        blocks: [
          {
            type: "list",
            items: [
              "Bisa tunjukkan contoh sistem serupa yang sudah berjalan?",
              "Siapa saja yang akan mengerjakan proyek ini?",
              "Bagaimana proses jika ada perubahan kebutuhan di tengah jalan?",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Apakah harga termurah selalu pilihan buruk?", a: "Tidak selalu, tetapi pastikan cakupan, kepemilikan kode, dan dukungan pasca rilis setara sebelum membandingkan harga." },
    ],
  },
  {
    slug: "web-app-vs-aplikasi-mobile",
    title: "Web App atau Aplikasi Mobile: Mana yang Dibutuhkan Bisnis Anda?",
    excerpt:
      "Keduanya punya kekuatan masing-masing. Kenali perbedaannya agar investasi sistem tepat sasaran untuk pengguna Anda.",
    category: "Teknologi",
    tags: ["Web App", "Mobile App", "Tips"],
    date: "2026-09-27",
    readMinutes: 3,
    img: unsplash("1512941937669-90a1b58e7e9c"),
    imgAlt: "Aplikasi di layar ponsel",
    sections: [
      {
        id: "perbedaan",
        heading: "Perbedaan Utama",
        blocks: [
          {
            type: "highlights",
            items: [
              { label: "Web App", value: "Kantor", desc: "Cocok untuk pekerjaan di meja: data banyak, layar besar, tanpa instalasi." },
              { label: "Aplikasi Mobile", value: "Lapangan", desc: "Cocok untuk petugas bergerak: kamera, GPS, dan bisa dipakai di mana saja." },
            ],
          },
        ],
      },
      {
        id: "kombinasi",
        heading: "Sering Kali Jawabannya Keduanya",
        blocks: [
          {
            type: "p",
            text: "Banyak alur bisnis melibatkan petugas lapangan dan tim kantor sekaligus. Pola yang umum adalah aplikasi mobile untuk input di lapangan, dan web app untuk analisa, approval, serta laporan, dengan satu backend yang sama.",
          },
        ],
      },
    ],
    faqs: [
      { q: "Apakah aplikasi mobile harus tersedia di Android dan iOS?", a: "Tergantung pengguna. Untuk aplikasi internal perusahaan, sering cukup Android karena perangkat bisa diseragamkan." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function formatArticleDate(iso: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
}
