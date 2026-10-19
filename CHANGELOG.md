# Changelog

Log progres pengerjaan situs (bukan decision log — buat itu lihat bagian Decision log di `docs/PRD.md`).

## Lanjut sesi berikutnya (per 2026-10-20 malam)

Status: semua pekerjaan 2026-10-20 sudah di-push & live (commit terakhir `9943bee`, link Produk footer dicek live). Working tree bersih, tidak ada server lokal yang jalan.

Belum selesai, butuh data/keputusan user:
- **Konten asli**: testimoni (masih contoh, catatan "contoh ilustrasi" sudah disembunyikan dari situs), kartu tim + halaman `/tim`, logo 5 klien lain, review 6 artikel blog, mencocokkan 3 case study Portfolio dengan 5 proyek asli.
- **Akun LinkedIn/Instagram resmi**: tampilkan ikon di footer + isi `sameAs` JSON-LD.
- **Review isi Kebijakan Privasi & Syarat Layanan** (`lib/content/legal.ts`) oleh user/legal.
- **Env ADMIN_*** di Vercel (login dashboard production masih ditolak sampai diisi + Redeploy).

Bisa dikerjakan / dicek user:
- Tes preview link di WA (`?v=2`), Facebook Sharing Debugger ("Scrape Again"), LinkedIn Post Inspector.
- Google Search Console: submit sitemap + request indexing halaman utama. Google Business Profile belum dibuat.

Fase 2: CMS/database (dashboard masih mode tampilan: simpan, upload, hapus belum menyimpan), komentar & newsletter blog.

## 2026-10-20 (Detail Media Library, link Produk footer)

### Ditambah
- **Dashboard Media Library: detail gambar** (pola IzinPro, permintaan user). Klik gambar / ikon mata membuka dialog: pratinjau besar (logo di latar putih, foto di latar abu), form **Judul**, **Alt text**, **Keterangan**, info file (nama, jenis, format, dimensi asli dibaca dari gambar, ukuran untuk upload baru, sumber Unsplash/lokal/upload, daftar lengkap "Dipakai di"), kolom URL + Salin URL, Buka ukuran penuh, Hapus (lanjut ke konfirmasi). Judul & alt default diambil dari konten yang tayang (`imgAlt` layanan/artikel, nama klien). Simpan masih `DemoForm` (mode tampilan, belum ada database). Komponen `components/admin/MediaDetailDialog.tsx`.

### Diubah
- **Link Produk di footer langsung ke kartu layanannya** (permintaan user), mis. `/layanan#web-apps`. Kartu di `/layanan` punya `id` dari `serviceAnchor()` (`lib/content/services.ts`) + `scroll-mt` untuk navbar. Kalau pengunjung sudah di `/layanan` dengan filter lain aktif, `ServiceAnchorLink` mengirim event sehingga filter kembali ke "Semua" lalu scroll ke kartu (Next Link mengganti hash lewat pushState, jadi `hashchange` tidak bisa dipakai).

### Verifikasi
- Lint + build lolos. Playwright 375 & 1280px: dialog media buka (klik gambar), dimensi terbaca, "Dipakai di" tampil, Simpan memunculkan notifikasi mode tampilan, Esc menutup, Hapus memunculkan konfirmasi, tanpa scroll samping di dialog, 0 console error. Footer: dari Beranda klik "Core Finance System" mendarat di kartunya; di `/layanan` dengan filter "Mobile App" klik "Web Apps" kartu muncul & terlihat; 0 console error.

## 2026-10-20 (Preview per halaman)

### Diubah
- **Setiap halaman publik punya gambar preview sendiri** (permintaan user): judul di gambar sesuai halaman (label Tentang Kami / Layanan / Portfolio / Kontak / Blog / Legal, kategori untuk artikel). Desain satu sumber di `lib/og-image.tsx`, tiap route punya `opengraph-image.tsx` di foldernya (gambar Beranda pindah ke `app/(site)/opengraph-image.tsx`). Artikel blog sekarang juga pakai gambar bermerek, bukan foto Unsplash.
- `pageMetadata()` tidak lagi mengisi `og:image`; Next mengisinya otomatis dari file di folder halaman (URL berakhiran hash + query versi, jadi cache gambar lama di WhatsApp ikut terlewati). Catatan: di dalam route group Next menambah akhiran hash ke URL gambar (`/tentang/opengraph-image-w6ubei`), jadi URL gambar jangan di-hardcode.
- **Title lebih lengkap & menjual** (permintaan user, menggantikan format pendek "X | PT IGT" untuk halaman utama). Title, deskripsi, dan teks gambar semua halaman sekarang di satu file `lib/content/page-seo.ts`.

### Deploy
- Commit `963dde0` live, dicek: `/tentang` di production memakai `/tentang/opengraph-image-...`.

### Verifikasi
- Lint + build lolos. 9 halaman (Beranda, Tentang, Layanan, Portfolio, Kontak, Blog, detail artikel, Kebijakan Privasi, Syarat Layanan): og:title baru, og:image ke gambar halaman itu (200 PNG 130-155 KB), twitter:image ada.

## 2026-10-20 (Halaman legal, konten jujur)

### Ditambah
- Halaman **Kebijakan Privasi** (`/kebijakan-privasi`) dan **Syarat Layanan** (`/syarat-layanan`): isi di `lib/content/legal.ts`, tampilan `components/shared/LegalPage.tsx`. Isi disesuaikan cara kerja situs sekarang (tanpa akun, tanpa analitik pihak ketiga, form Kontak hanya menyusun pesan WhatsApp), mengacu UU PDP No. 27/2022. **Wajib diperbarui** kalau nanti ada analitik, newsletter, atau komentar aktif. Ditautkan di baris bawah footer (menggantikan teks "Bogor, Jawa Barat"; alamat lengkap tetap di kolom profil), masuk sitemap & `llms.txt`.

### Diubah
- Catatan "Contoh ilustrasi. Kutipan asli tersedia atas permintaan dengan seizin klien." di section Testimoni dihapus (permintaan user). Label "Contoh ilustrasi" tetap di dashboard.
- FAQ iOS: jawaban lama ("semua aplikasi tersedia untuk Android dan iOS") tidak sesuai fakta; sekarang menyebut aplikasi produksi saat ini Android, iOS bisa direncanakan sesuai kebutuhan.
- 3 case study Portfolio: label "Client A/B/C" diganti "Perusahaan Pembiayaan (Multifinance)", klaim tanpa data (collection, pelaporan OJK otomatis, rekam GPS, sinkronisasi real-time) dibuang; deskripsi disamakan dengan fitur di `lib/content/services.ts`.

### Verifikasi
- Lint + build lolos. Playwright 375 & 1280px: `/kebijakan-privasi`, `/syarat-layanan`, `/`, `/portfolio` tanpa scroll horizontal, 1 H1, link footer jalan, 0 console error.

### Deploy
- Commit `ac363a5` (SEO preview media sosial) live dan dicek di production: `og:image` + deskripsi baru tampil di HTML, `/opengraph-image` 200 PNG ~148 KB. Preview WhatsApp untuk `https://igt-tech.id/` masih versi lama karena cache WhatsApp; link baru (mis. `/tentang`) sudah tampil dengan gambar & deskripsi baru.

## 2026-10-20 (SEO preview media sosial)

### Diperbaiki
- **Preview link di WhatsApp/Facebook/LinkedIn/X tidak ada gambarnya** (laporan user): HTML live tidak punya `og:image` sama sekali, karena `openGraph` di `pageMetadata()` menimpa seluruh `openGraph` layout termasuk gambar dari `app/opengraph-image.tsx`. Sekarang `lib/seo.ts` memasang gambar default secara eksplisit (`og:image` absolut + width/height 1200x630, type, alt; juga `twitter:image`). Detail artikel tetap memakai gambar artikelnya. Dicek di HTML hasil build untuk Beranda, Tentang, Layanan, Portfolio, Kontak, Blog, dan detail artikel.

### Diubah
- **Gambar OG baru** (`app/opengraph-image.tsx`): logo + PT IGT, judul "Software House dan Jasa Pembuatan Aplikasi", tagline, chip layanan (Aplikasi Web, Aplikasi Mobile, Sistem Bisnis, Otomasi Proses), domain. Font Outfit dimuat dari `assets/fonts/` (font default Satori tidak punya bold). PNG ~150 KB.
- **Deskripsi SEO/OG semua halaman publik ditulis ulang**: lebih menjual dan untuk umum (tidak lagi penuh istilah teknis multifinance), panjang <= ~160 karakter. Title & deskripsi Beranda dipusatkan di `SITE_TITLE`/`SITE_DESCRIPTION` (`lib/seo.ts`), dipakai layout root, Beranda, dan halaman Pengaturan dashboard.
- Kalimat "Contoh implementasi nyata, nama klien digeneralisasi sesuai perjanjian kerahasiaan." dihapus dari section Portfolio Beranda, hero `/portfolio` (diganti kalimat proyek sudah berjalan di produksi), dan `llms.txt` (permintaan user: proyek sudah live production).

### Catatan
- WhatsApp & Facebook menyimpan cache preview lama. Setelah deploy: cek di Facebook Sharing Debugger ("Scrape Again"), LinkedIn Post Inspector, dan kirim link baru di WA (atau tambahkan `?v=2`).

## 2026-10-20 (Dashboard: header sticky)

### Diubah
- **Header dashboard menempel saat scroll di semua ukuran layar** (permintaan user, awalnya HP/tablet lalu desktop juga): latar `admin-bg` 90% + blur. Sidebar desktop menempel di bawahnya (`top-28`), tinggi maksimal `calc(100vh-12rem)` supaya tidak tertutup header bahkan di ujung bawah halaman. Dicek 360-1920px: header menempel, sidebar 9/9 posisi scroll (tengah & ujung halaman) tetap di bawah header, menu akun tetap bisa dibuka.

### Diperbaiki
- Label bulan grafik Kunjungan Bulanan di HP terpotong ("N… D… J…"): di <640px tampil selang-seling tapi utuh (Nov Jan Mar Mei Jul Sep), tidak bertumpuk.
- **Halaman Klien berantakan di layar lebar** (laporan user): `ContentList` dikembalikan sebagai fragment, jadi di dalam grid 2 kolom tiap elemennya (notifikasi, daftar) jadi sel grid sendiri; daftar logo terlempar ke kanan dan form turun ke bawah. Sekarang dibungkus satu `div` (juga `MediaLibrary` & `ArticleTable` supaya bug serupa tidak muncul). Dicek: ≥1536px daftar kiri + form kanan, <1536px bertumpuk.
- Scroll samping 5px di layar 360px: label grafik ujung yang disembunyikan tetap memakan tempat; baris label diberi `overflow-hidden`.

### Catatan
- Login production masih menampilkan "Login belum dikonfigurasi" sampai env `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` diisi di Vercel (Production) lalu di-redeploy.

## 2026-10-20 (Dashboard lengkap)

### Ditambahkan
- **Semua menu dashboard punya halaman** (tidak ada lagi "Segera"): Analitik, Komentar (keadaan kosong jujur), Media Library, Hero Beranda, Tentang Kami, Portfolio (+ tambah/edit), Tim (+ tambah/edit), Testimoni (+ tambah/edit), Klien (+ form tambah logo), FAQ (+ tambah/edit), Kontak, CTA Banner, Pengguna (1 akun, multi-user di Fase 2), Pengaturan (identitas & SEO). Isi default form = teks yang benar-benar tayang di situs.
- **Daftar konten ala IzinPro** (`components/admin/ContentList.tsx`): toggle tampil/sembunyi, duplikat, edit, hapus dengan **pop-up konfirmasi** (`components/admin/ConfirmDelete.tsx`, shadcn alert-dialog; tombol Hapus `accent-text` putih 6.27). Dipakai Layanan, Portfolio, Tim, Testimoni, FAQ, Klien, Pengguna.
- **Blog & Artikel jadi tabel** (`components/admin/ArticleTable.tsx`): judul + thumbnail, kategori, penulis (≥1536px), tanggal (bisa diurutkan), status, aksi lihat/edit/hapus (konfirmasi), kotak cari. <1280px tampil sebagai kartu. Kolom views & statistik dari referensi tidak dibuat (belum ada data).
- **Upload gambar** (`components/admin/ImageUpload.tsx`): seret & lepas / pilih file / tempel URL, pratinjau, validasi JPG/PNG/WebP ≤ 2 MB, ganti & hapus. Dipakai artikel, portfolio, tim, hero, klien. **Media Library** (`components/admin/MediaLibrary.tsx`): galeri 19 gambar yang dipakai situs + lokasi pemakaian, upload banyak file, filter Foto/Logo, salin URL, hapus dengan konfirmasi. Semua upload hanya pratinjau di browser (belum ada storage).
- **Header dashboard**: pencarian perintah Ctrl/Cmd+K (`components/admin/CommandPalette.tsx`, cari halaman + aksi cepat, navigasi keyboard), notifikasi (`NotificationMenu.tsx`, kosong jujur), menu akun di avatar (Profil Saya, Ubah Password, Keluar; shadcn dropdown-menu dengan sorot biru, bukan token accent oranye).
- **Grafik** tanpa library (`components/admin/charts.tsx`, mengikuti skill dataviz): Overview punya Kunjungan Bulanan (batang) + Statistik page views & pengunjung unik (garis, 7/30/90 hari); halaman Analitik punya 4 kartu ringkasan, tren batang 2 seri, sumber traffic, halaman terpopuler. Warna seri `brand` + `accent` divalidasi `validate_palette.js` (lolos CVD & normal-vision; oranye 2.73 di putih → wajib legenda + tooltip + "Lihat sebagai tabel", sudah ada). **Semua angka analitik = DATA CONTOH** (`lib/admin/sample-analytics.ts`, berlabel badge "Data contoh") karena situs belum terhubung ke sistem analitik.
- Kartu Overview gaya solid ala referensi: latar `brand-mid`, lingkaran atas **oranye solid** + lingkaran bawah biru (oranye transparan di atas biru terlihat kotor, ditolak user).

### Diperbaiki
- Latar dashboard terlihat dua warna: pembungkus menyusut ke tinggi layar karena `body` flex kolom → `shrink-0`; latar `admin-bg` (#EDF2F7) kini penuh sampai bawah. Token baru: `admin-bg`, `admin-field` (#E2EAF2), `admin-placeholder` (#4A6574, 5.08 di input).
- Dropdown `<select>` bawaan browser di form dashboard → `components/admin/AdminSelect.tsx` (Select custom, sama dengan /blog).
- Label menu sidebar patah baris → `truncate` + sidebar 320px di ≥1280px; menu aktif otomatis digulir terlihat (hanya kotak sidebar, halaman tidak ikut bergeser). Teks pencarian header patah baris → `whitespace-nowrap`. Tabel Halaman Terpopuler di HP muat tanpa geser samping.

### Verifikasi
- Tes interaksi Playwright 19/19 lolos (Ctrl+K + Enter + Escape, aksi cepat, notifikasi, toggle, duplikat, hapus → konfirmasi → Batal/Ya, rentang grafik 30→90, Analitik 30 hari, Media upload + filter + hapus, 0 error). Dua kegagalan yang sempat muncul ternyata kesalahan skrip tes (selektor `text=Batal` mengenai kata "dibatalkan"; Ctrl+K ditekan sebelum halaman selesai dimuat), bukan bug aplikasi.
- Tes responsif semua 27 rute dashboard × 375/1024/1536px: 0 masalah setelah perbaikan tabel Analitik di HP (overflow, elemen keluar kartu, patah baris, kontras axe, error console).

## 2026-10-20 (Dashboard tahap 1)

### Ditambahkan
- **Dashboard `/admin` (tahap tampilan, belum ada database)**: struktur & menu mengikuti IzinPro, disesuaikan konten PT IGT; gaya mengikuti BuildWithAngga (font Poppins khusus dashboard, judul besar tebal, kartu putih `rounded-3xl`, kartu statistik ikon bulat, input pill abu-abu tinggi, tombol pill solid).
  - Halaman tahap 1: Masuk, Overview (6 kartu statistik dihitung dari `lib/content`, Artikel Terbaru, Status Situs), Layanan (daftar + tambah/edit), Blog & Artikel (daftar + tulis/edit, isi artikel ditampilkan bergaya markdown), Profil Saya, Ubah Password. Menu lain (Komentar, Hero Beranda, Tentang Kami, Portfolio, Tim, Testimoni, Klien, FAQ, Kontak, CTA Banner, Pengguna, Pengaturan) tampil berlabel "Segera" dan tidak bisa diklik.
  - Semua form tampilan saja: submit menampilkan notifikasi jujur "Mode tampilan: perubahan belum disimpan..." (`components/admin/DemoForm.tsx`).
  - Sidebar kartu (profil + menu berkelompok, menu aktif otomatis digulir terlihat), topbar (logo, Lihat Situs, Halo + avatar), panel geser di mobile. Tombol Keluar.
- **Login & keamanan**: akun dummy tunggal dari env `ADMIN_USERNAME` / `ADMIN_PASSWORD` (nilai lokal di `.env.local`, tidak ikut git), **tidak ditulis di kode karena repo GitHub publik**; env kosong = login ditolak. Pengecekan password di Server Action, sesi cookie httpOnly bertanda tangan HMAC-SHA256 (`ADMIN_SESSION_SECRET`), berlaku 8 jam. `proxy.ts` (pengganti middleware di Next 16) mengunci semua `/admin/*` kecuali login + header `X-Robots-Tag: noindex`; layout panel cek sesi lagi di server. `?next=` dibatasi ke `/admin/*` (cegah open redirect). Username tetap terisi setelah login gagal (React 19 me-reset form setelah action).
- **SEO aman**: `/admin` di-`noindex` (metadata + header), `Disallow: /admin` di robots.txt untuk semua bot termasuk crawler AI, tidak masuk sitemap, tidak ditautkan dari situs publik.
- **Struktur**: halaman publik dipindah ke route group `app/(site)/` (URL tidak berubah) dengan layout berisi Navbar/Footer/tombol mengambang/JSON-LD; layout root tinggal `<html>`+font+metadata; `app/not-found.tsx` memasang Navbar & Footer sendiri. `.env.example` ditambahkan (dikecualikan dari `.env*` di .gitignore).

### Verifikasi
- 29 tes Playwright dashboard lolos: redirect tanpa login, header & meta noindex, robots Disallow, sitemap bersih, password salah ditolak + username tetap, login → dashboard, cookie httpOnly, 8 halaman (1 H1, 0 masalah kontras axe, 0 overflow), 404 artikel admin, notifikasi form, mobile tanpa overflow + menu, logout & terkunci lagi, situs publik & 404 tetap ber-Navbar/Footer, 0 console error.
- Audit situs publik diulang setelah pemindahan ke `(site)`: semua route × 375/768/1280 dan 16 tes interaksi tetap lolos. `npm run build` lolos (27 halaman + Proxy).

### Sebelum push ke production
- **Isi env di Vercel** (Settings → Environment Variables, Production): `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`. Tanpa itu `/admin/login` menolak semua login (aman, tapi dashboard tidak bisa dibuka).

## 2026-10-20

### Diubah
- **Google Search Console**: file verifikasi `public/google58b6fa4063452ad3.html` ditambahkan (properti "Awalan URL" `https://igt-tech.id/`, metode File HTML, pola sama dengan IzinPro; tidak perlu akses DNS Hostinger). **Jangan dihapus**, Google mengecek ulang secara berkala. Percobaan verifikasi lewat properti "Domain" (record TXT DNS) tidak dilanjutkan. **Terverifikasi 2026-10-20.** Lanjutan: submit `sitemap.xml` + minta pengindeksan halaman utama (dilakukan user di dashboard GSC). Google Business Profile masih pending.
- **Klik logo selalu kembali ke Hero Beranda** (header & panel menu mobile). Sebelumnya, kalau sudah di Beranda dan scroll ke bawah, klik logo tidak melakukan apa-apa karena Next menganggap rute sama; sekarang di-scroll ke atas (halus, kecuali "kurangi animasi"). Dari halaman lain tetap pindah ke Beranda posisi paling atas. Dites Playwright: desktop di Beranda, desktop dari `/blog`, dan mobile lewat panel menu, semuanya berakhir di scrollY 0.
- **Tombol CTA diseragamkan (keputusan user, opsi B dari 2026-10-11)**: 16px, font DM Sans (`font-display`) tebal, tanpa `tracking-wide`. Gaya bersama di `components/shared/button-styles.ts` (`ctaPrimaryClass`, `ctaOutlineOnDarkClass`, `ctaArrowClass`).
- **Animasi hover disamakan** di semua tombol oranye (Hero, CTA Banner, kirim form Kontak, "Hubungi Kami" di menu desktop & panel mobile): naik 2px + bayangan oranye lembut + panah bergeser 4px, `motion-safe:`. Tombol putih "Konsultasikan Gratis Sekarang" di `CtaCard` ikut naik + bayangan.
- **Halaman 404 baru** `app/not-found.tsx` (referensi user): ilustrasi SVG buatan sendiri warna brand (colokan kabel terlepas dari stopkontak + percikan oranye), angka 404 gradasi, "Halaman Tidak Ditemukan", tombol "Kembali ke Beranda" + "Hubungi Kami". Status 404 + `noindex` otomatis dari Next.
- **Footer: semua 16 link mati (`href="#"`) diperbaiki.** Perusahaan → Tentang Kami, Layanan, Portfolio, Blog, Kontak ("Karir" & "Blog Teknis" dihapus, belum ada halamannya); Produk → `/layanan` (dari `lib/content/services.ts`); kolom "Hukum" (Kebijakan Privasi, Syarat Layanan, Keamanan Data: belum ada halamannya) diganti "Hubungi Kami" (telepon → WhatsApp, email → mailto); ikon LinkedIn/Instagram di footer & section Kontak disembunyikan sampai akun resmi ada.
- **Kolom pertama footer mengikuti referensi user**: logo, paragraf profil dengan nama perusahaan tebal, paragraf cara kerja, alamat warna redup. Tanpa angka tahun/sertifikasi (belum ada data).
- **Panel menu mobile putih seluruhnya** (keputusan user setelah mencoba header navy, lalu header putih + menu navy): logo sama dengan header tapi teks gelap ("TEKNOLOGI" `brand-mid`), garis bawah tipis di bawah logo, link gelap (aktif `brand-mid` tebal + garis oranye), tombol oranye "Hubungi Kami", copyright `muted`. Kontras dicek axe: 0 pelanggaran.
- **Kartu visual Hero**: badge "PLATFORM Web + Android" sempat menimpa baris terakhir daftar alur kredit; kartu diberi `pb-14`.
- **SEO: judul halaman dipendekkan untuk sitelinks Google** (meniru pola IzinPro): Beranda "PT Inovasi Gantarawana Teknologi | Software House dan Jasa Pembuatan Aplikasi", lalu "Tentang Kami | PT IGT", "Layanan Kami | PT IGT", "Portfolio | PT IGT", "Blog dan Artikel | PT IGT", "Hubungi Kami | PT IGT". Deskripsi ditulis ulang faktual (Bogor, seluruh Indonesia). **"Jakarta" dihapus dari semua metadata** (menyelesaikan pending soal alamat Bogor), klaim "Android/iOS" di deskripsi Beranda dihapus.
- **Nama situs pendek "PT IGT"** (`siteSettings.shortName`): dipakai di JSON-LD `WebSite` (`name`, dengan `alternateName` nama lengkap + "IGT") dan `og:site_name`, supaya Google menampilkan "PT IGT" di atas URL. Organization tetap nama lengkap.
- **SEO: tanda "&" di title & meta description diganti "dan"** (Beranda, Tentang, Layanan, Portfolio, default layout). HTML sudah benar (`&amp;` tunggal), tapi kartu Google sempat menampilkan "&amp;amp;"; tanpa ampersand risiko itu hilang di Google/WhatsApp/LinkedIn.

### Verifikasi
- Audit Playwright + axe-core (`color-contrast`) di 8 route (`/`, `/tentang`, `/layanan`, `/portfolio`, `/blog`, detail artikel, `/kontak`, 404) × 375/768/1280px: 0 scroll horizontal, tepat 1 H1 per halaman, 0 console error (selain respons 404 di halaman 404 itu sendiri, memang seharusnya), 0 pelanggaran kontras.
- 16 tes interaksi lolos: menu mobile buka/tutup/Escape/navigasi, tombol ke atas, indikator Scroll down, testimoni, FAQ, filter Layanan & Portfolio, cari/kategori/paginasi/urutan Blog, dropdown Kontak, daftar isi artikel, form komentar nonaktif.
- SEO production dicek langsung: title, description, robots (index, max-image-preview large), canonical, Open Graph + gambar OG 200, Twitter card, sitemap 12 URL, `/robots.txt` + crawler AI, `/llms.txt`, redirect www → non-www 308. Google sudah mengindeks dan Ringkasan AI Google mengambil data dari situs dengan benar (alamat Bogor, layanan, kontak).

### Pending
- Sama dengan daftar Pending 2026-10-19, **kecuali** yang sudah selesai: ukuran font tombol (opsi B), animasi hover tombol oranye, verifikasi visual menyeluruh.
- ~~Baru: halaman **Kebijakan Privasi** & **Syarat Layanan** belum ada~~ Selesai 2026-10-20. Sisa: (dulu cuma link mati di footer); disarankan dibuat, terutama karena form Kontak mengumpulkan data pengunjung. Akun **LinkedIn/Instagram** resmi: begitu ada, tampilkan lagi ikonnya + isi `sameAs` di JSON-LD.
- ~~Baru: **Preview link di media sosial (WhatsApp, Facebook, LinkedIn, X/Twitter, Telegram) harus tampil lengkap: gambar, title, dan description.**~~ Selesai di kode 2026-10-20 (lihat entri "SEO preview media sosial"); tinggal tes langsung di tiap aplikasi setelah deploy. Cek 200 OG image (2026-10-20) baru memastikan file-nya bisa dibuka, belum memastikan kartu preview benar-benar muncul di tiap aplikasi. Yang perlu dipastikan:
  - Setiap halaman publik (Beranda, Tentang Kami, Layanan, Portfolio, Blog, detail artikel, Kontak) punya `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`, dan `og:image` dengan **URL absolut https** (lewat `metadataBase`), plus `og:image:width`/`og:image:height` (1200×630), `og:image:type`, `og:image:alt`.
  - `openGraph` di `pageMetadata()` (`lib/seo.ts`) tidak menimpa gambar dari `app/opengraph-image.tsx` sampai hilang (di Next, objek `openGraph` halaman menggantikan milik layout, bukan digabung). Cek di HTML hasil render, bukan hanya di kode.
  - Ukuran OG image kecil (disarankan < 300 KB) supaya WhatsApp mau menampilkan gambarnya; format PNG/JPG, bukan WebP.
  - Twitter card `summary_large_image` dengan `twitter:title`, `twitter:description`, `twitter:image`.
  - Detail artikel memakai gambar artikel masing-masing sebagai `og:image` (absolut, bisa diakses tanpa login/redirect).
  - Crawler preview (facebookexternalhit, WhatsApp, LinkedInBot, Twitterbot, TelegramBot) tidak terblokir `robots.txt`, `proxy.ts`, maupun redirect www → non-www.
  - Tes langsung: kirim link tiap halaman di WhatsApp, cek di Facebook Sharing Debugger (sekaligus "Scrape Again" untuk membersihkan cache preview lama), LinkedIn Post Inspector, dan opengraph.xyz. Catatan: WhatsApp menyimpan cache preview, jadi tes pakai link yang belum pernah dikirim atau tambahkan `?v=2`.

## 2026-10-19

### Diubah
- **Detail artikel: kolom komentar + "Artikel Lainnya"** (referensi user). Komentar (`components/sections/blog/CommentSection.tsx`) tampil lengkap (Nama*, Email opsional, Komentar*, tombol pill "Kirim Komentar") tapi **form dinonaktifkan** dengan keterangan "Fitur komentar segera aktif" karena belum ada database; aktifkan di Fase 2. Di bawahnya grid 3 artikel terbaru lainnya pakai `ArticleCard`. Ikon baru `ChatIcon`, `SendIcon`.
- **Logo di panel menu mobile** disamakan dengan logo header: ikon + "PT Inovasi Gantarawana" + "TEKNOLOGI" (teks gelap & `brand-mid` karena latar panel putih).
- **Section "Artikel Terbaru" di Beranda** (referensi user), tepat setelah FAQ: judul + subjudul di kiri, tombol pill "Lihat Semua Artikel" di kanan, 4 artikel terbaru (1 kolom mobile, 2 tablet, 4 desktop). Latar `surface` supaya selang-seling dengan FAQ (putih) dan CTA Banner (gelap). Jumlah views dari referensi tidak ditampilkan (belum ada data). Kartu artikel dijadikan komponen bersama `components/sections/blog/ArticleCard.tsx` (dipakai `/blog` juga; varian `compact` memotong judul 2 baris & ringkasan 3 baris).
- **SEO & GEO dirapikan mengikuti pola IzinPro:**
  - `robots.txt`: daftar eksplisit crawler AI (GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, ClaudeBot, Claude-SearchBot, anthropic-ai, PerplexityBot, Applebot-Extended, CCBot) + `Host` + sitemap.
  - `/llms.txt` sekarang route `app/llms.txt/route.ts` yang dibangun otomatis dari `lib/content` (layanan, portfolio, 6 artikel, halaman, kontak); `public/llms.txt` lama (basi: belum ada blog, masih "Jakarta") dihapus.
  - JSON-LD lewat `lib/structured-data.ts` + `components/shared/JsonLd.tsx` (escape `<`): Organization (`ProfessionalService`, alamat Bogor, `knowsAbout`, `contactPoint`) + `WebSite` di layout; `FAQPage` di Beranda (data FAQ dipindah ke `lib/content/faqs.ts`); `ItemList` 8 `Service` di `/layanan`; `BreadcrumbList` di semua halaman dalam; `BlogPosting` + `FAQPage` + `BreadcrumbList` di detail artikel. Testimoni ilustrasi sengaja tidak dijadikan `Review`.
  - Metadata per halaman lewat `pageMetadata()` (`lib/seo.ts`): canonical + Open Graph (title, description, url, locale `id_ID`, siteName) + Twitter card; detail artikel bertipe `article` dengan gambar artikel. Default layout: keywords, authors, `robots` max-image-preview large.
  - Slogan `siteSettings.tagline` diganti ke slogan final "Mitra Teknologi Terpercaya untuk Transformasi Bisnis Anda" (ikut tampil di OG image).
- **Indikator scroll di Hero** (referensi user): kapsul outline + panah memantul + teks "Scroll down" di bawah tengah Hero (desktop saja; padding bawah konten Hero `lg:pb-36` supaya indikator tidak terlalu dekat dengan tombol CTA), klik turun halus ke section Tentang Kami (`#tentang-kami`). Gulir halus pakai CSS `scroll-behavior: smooth` (mati untuk "kurangi animasi") + `data-scroll-behavior="smooth"` di `<html>` sesuai Next 16 supaya perpindahan halaman tetap instan.
- **Hero Beranda**: badge kapsul "WEB APPS · CORE FINANCE · MOBILE APPS · CMS" di atas judul dihapus (terkesan template AI dan mengulang isi paragraf).
- **Sapu bersih angka ilustratif di seluruh situs** (keputusan user: perusahaan baru, baru 5 proyek, harus realistis tapi tetap profesional). Fakta yang dipakai: 5 proyek berjalan di produksi, sistem dibangun sesuai POJK, integrasi SLIK OJK & Dukcapil, web + Android (dikonfirmasi user, referensi proyek SIFOne).
  - Hero: baris statistik (8+ tahun, 100+ proyek, 40+ klien) dan baris poin keunggulan digabung jadi satu baris 3 fakta berikon, sengaja tanpa angka (permintaan user: tonjolkan pengalaman, bukan nominal): Profesional / Paham bisnis pembiayaan, Patuh OJK / Dirancang sesuai POJK, SLIK & Dukcapil / Verifikasi otomatis. Baris ini ditaruh di antara paragraf dan tombol CTA; kartu visual sekarang sejajar tengah di kanan (desktop) dan di bawah tombol (mobile). Mobile: 1 kolom, ikon di samping teks. `sm:` ke atas: 3 kolom, ikon di atas teks (biar teks gak patah baris).
  - Kartu visual Hero: progress bar persen karangan (100%/87%/74%) diganti daftar tahapan alur kredit yang memang dicakup sistem (registrasi & CMO, SLIK & scoring, CA & survei, approval & pencairan). Kartu "Uptime Sistem 99.9%" → "Platform: Web + Android".
  - Beranda About: kartu timeline 2016–2024 → kartu "Sudah Berjalan" berisi 4 kapabilitas nyata.
  - WhyUs: "95%+ Proyek Selesai Tepat Waktu" → "Integrasi Satu Pintu / Semua Sistem, Satu Alur" (tanpa angka, sama seperti Hero; merujuk SIFOne yang menyatukan core, user management, robot SLIK, Dukcapil, dan mobile dalam satu alur). Foto WhyUs diganti dari tim berdiskusi ke laptop + HP dipakai bersamaan (Unsplash `photo-1563986768609`) supaya nyambung dengan pesan integrasi web + mobile. Poin "Tim Berpengalaman" (sebut perbankan & koperasi, tidak ada datanya) → "Paham Proses Bisnis Pembiayaan". Poin integrasi menyebut SLIK OJK & Dukcapil. "Jaminan uptime" di poin SLA dihapus.
  - Testimoni (isinya sampel) dihapus dari Beranda, komponen `Testimonials.tsx` dihapus. Urutan section lain tetap seperti semula.
  - `/tentang`: "Sejak 2016" dihapus; badge "100+ Proyek Selesai" → "5 Proyek Berjalan"; statistik (100+, 99% kepuasan, 8+ tahun) → 5 Proyek Berjalan di Produksi, 8 Produk Siap Implementasi, 100% Source Code Milik Klien; timeline tahun → "Cara Kami Bekerja" (4 tahap: analisa, desain & prototipe, sprint dua mingguan, go-live & pendampingan); "Patuh Regulasi OJK 100%" → "Patuh Regulasi OJK"; paragraf reputasi diganti kalimat faktual.
  - Footer: "sejak 2016" dihapus.
  - Em dash yang tampil ke pengunjung dihapus: label klien Portfolio ("Perusahaan Pembiayaan, Client A") dan title tab `/blog`.
- **Dropdown custom bergaya brand** (permintaan user, dropdown bawaan browser dinilai jelek): urutan Terbaru/Terlama di `/blog` diganti dari `<select>` native ke komponen `Select` (Base UI). Komponen bersama `components/ui/select.tsx` di-styling ulang sehingga dropdown "Layanan yang Diminati" di form Kontak ikut seragam: popup kartu putih ber-border + bayangan, opsi lebih lega 16px, sorot biru muda `surface-2` teks `brand-mid` (sebelumnya token `accent` shadcn = oranye), opsi terpilih tebal + centang `brand-mid`, chevron `brand-mid` berputar saat terbuka, popup selalu muncul di bawah trigger.
- **Semua tombol diseragamkan jadi bentuk pill (`rounded-full`)** mengikuti tombol "Selengkapnya": Hero (Konsultasi Gratis, Lihat Layanan), Navbar "Hubungi Kami" (desktop & panel mobile), CTA Banner (2 tombol), kirim form Kontak, `CtaCard`, tombol Cari + kotak pencarian + dropdown urutan + paginasi + "Konsultasi Gratis" di `/blog`, "Konsultasi Gratis" di detail artikel. Warna & isi tombol tidak berubah. Badge dekoratif dan kolom form tetap bersudut.
- **Paginasi `/blog` diberi hover**: tombol Sebelumnya/Selanjutnya dan nomor halaman berubah ke border + teks `brand-mid` dengan latar `surface-2` saat hover; tombol nonaktif tidak bereaksi. Ditambah ikon chevron; di mobile teks Sebelumnya/Selanjutnya disembunyikan (cuma ikon + `aria-label`) supaya tidak meluber di 375px.
- **Label menu "Tentang" → "Tentang Kami"** (desktop & mobile). Jarak antar menu desktop `gap-7` → `gap-5` di `lg` (1024px) supaya 6 menu + logo + tombol tetap muat, kembali `gap-7` mulai `xl`.
- **Menu "Blog" ditambahkan ke navigasi utama** (desktop & mobile, di antara Portfolio dan Kontak).
- **Blog statis mengikuti referensi user (IzinPro)** (belum ada database, data di `lib/content/articles.ts`, pindah ke CMS di Fase 2):
  - `/blog`: `PageHero` "Blog dan Artikel", kotak pencarian mengambang (cari judul/ringkasan/tag), sidebar Kategori (dengan jumlah) + Topik Populer + kotak "Butuh Bantuan?" WhatsApp (pengganti newsletter karena belum ada backend email), daftar artikel 2 kolom (foto, badge kategori, tanggal, menit baca, ringkasan, "Baca Selengkapnya"), urutan Terbaru/Terlama, paginasi 4 per halaman. Di mobile daftar artikel tampil duluan, sidebar di bawah. Komponen `components/sections/blog/BlogExplorer.tsx`.
  - `/blog/[slug]` (statis via `generateStaticParams`, metadata + canonical + OG per artikel): hero dengan breadcrumb 3 tingkat, kategori, judul, ringkasan, "Ditulis oleh Tim PT IGT", tanggal, menit baca; isi dari blok terstruktur (paragraf, daftar, kartu, langkah bernomor, sorotan) di `components/sections/blog/ArticleBody.tsx`; FAQ accordion; tag; sidebar sticky Daftar Isi + Butuh Bantuan + Artikel Terkait; `CtaCard` di akhir. Kolom komentar dari referensi tidak dibuat (butuh database).
  - 6 artikel awal bersifat edukatif umum (SLIK OJK, LOS, digitalisasi kredit, verifikasi Dukcapil, memilih software house, web vs mobile), tanpa klaim angka/hasil proyek. Sudah ter-deploy atas permintaan user; **review isi oleh user masih pending** (lihat bagian Pending).
  - URL artikel otomatis masuk `sitemap.xml`. Ikon baru: `SearchIcon`, `CalendarIcon`, `ListIcon`, `TagIcon`.
- **Menu mobile jadi panel geser dari kiri** (referensi user): panel putih 85% lebar layar (maks 384px) + latar gelap transparan, header panel berisi logo dan tombol tutup, link utama besar (`text-xl`, aktif ditandai garis oranye), pemisah, tombol oranye "Hubungi Kami", copyright di bawah. Panel bisa di-scroll dengan scrollbar brand, scroll halaman di belakang dikunci, Escape/klik latar menutup. Panel dirender di luar `<header>` karena `backdrop-filter` di header membuat elemen `fixed` di dalamnya terkurung setinggi header.
- **`/tentang`: jarak Tim ke kartu CTA dirapatkan** (padding bawah section tim 112px → 24px di desktop).
- **Label kecil di atas judul section diperbesar 14px → 16px** (`text-sm` → `text-base`): `SectionLabel` (Portfolio, Produk & Layanan, Hubungi Kami, dll.), label "Tentang Kami" di Beranda, "Mulai Proyek Anda" di CTA Banner, dan "Klien Kami" di `/portfolio` (dari 12px).
- **Elemen baru dari referensi user (IzinPro):**
  - Kartu CTA konsultasi `components/shared/CtaCard.tsx` (gradasi `brand-mid` → `brand-dark`, ikon headset, tombol putih "Konsultasikan Gratis Sekarang" + ikon WhatsApp) di akhir `/layanan`, `/portfolio`, dan `/tentang` (menggantikan banner CTA lama di `/tentang`).
  - Tombol mengambang kanan bawah di semua halaman `components/layout/FloatingActions.tsx`: chat WhatsApp (bulat biru `brand`, ikon putih) + kembali ke atas (muncul setelah scroll 400px, smooth scroll kecuali "kurangi animasi").
  - Scrollbar tipis warna brand di `globals.css` (thumb `brand`, track `surface-2`, hover `brand-mid`).
  - Ikon baru `WhatsAppIcon` & `ArrowUpIcon` di `figma-icons.tsx`.
  - **Testimoni Klien** kembali di Beranda (posisi asli, antara Portfolio dan Klien Kami): carousel geser + panah + titik halaman, 4 kartu di desktop / 2 tablet / 1 mobile. Auto-geser tiap 5 detik (kembali ke awal setelah halaman terakhir); berhenti saat kursor/fokus keyboard di section, 5 detik setelah sentuh/klik, saat tab browser tidak aktif, dan mati untuk "kurangi animasi". Isi = contoh ilustrasi atas keputusan user, atribusi hanya jabatan + "Perusahaan Pembiayaan" (tanpa nama orang/perusahaan karangan), dengan catatan kecil "Contoh ilustrasi" di bawah judul. Data di `lib/content/testimonials.ts`.
  - **Tim Profesional Kami** di `/tentang` (sebelum CTA): 8 kartu jabatan (CEO & Founder, CTO, Project Manager, Lead Developer, Business Analyst, Mobile Developer, QA Engineer, Customer Support) dengan avatar placeholder (lingkaran putih, siluet kepala + bahu warna `brand`, sesuai referensi user). Nama, foto, dan LinkedIn diisi di `lib/content/team.ts`; tombol LinkedIn baru muncul kalau URL diisi.
- **Judul Produk & Layanan (Beranda + `/layanan`)**: "Ekosistem Digital untuk Industri Pembiayaan" → "Ekosistem Digital untuk Transformasi Bisnis Anda", selaras dengan slogan perusahaan dan posisi PT IGT sebagai perusahaan IT lintas industri.
- **`/portfolio`: tab filter kategori** (Semua Portfolio, Core System, Mobile App), gaya sama dengan `/layanan`. Tab hanya muncul untuk kategori yang punya proyek. Case study diberi field `category`; tab jadi komponen bersama `components/shared/FilterTabs.tsx` (dipakai `/layanan` & `/portfolio`), grid di `components/sections/portfolio/PortfolioGrid.tsx`.
- **`/kontak` dan `/blog` pakai `PageHero` yang sama**: Kontak = "Hubungi Kami" + foto jabat tangan, lalu section kontak seperti biasa (prop `firstSection` di `ContactSection` dihapus karena tidak dipakai lagi). Blog = "Blog & Artikel" + foto menulis di laptop, lalu "Segera Hadir" (turun jadi H2, H1 di hero).
- **`/portfolio`: bagian atas dibuat seperti `/layanan`** (tanpa bar keunggulan): hero terang dengan breadcrumb Beranda › Portfolio, H1 "Portfolio Kami" (sebelumnya tidak ada H1), subjudul kerahasiaan klien, foto presentasi tim di kanan. Judul section jadi 2 baris "Proyek yang Mendefinisikan / Keahlian Kami". Hero dijadikan komponen bersama `components/shared/PageHero.tsx` (prop `withOverlap` untuk halaman yang punya kartu mengambang seperti `/layanan`).
- **`/tentang`: kartu sorotan di bawah hero jadi satu baris di desktop** (`lg:grid-cols-3` → `lg:grid-cols-5`, lebar `max-w-5xl` → `max-w-7xl`), sama dengan bar keunggulan di `/layanan`. Mobile 1 kolom, tablet 2 kolom tetap.
- **Halaman `/layanan` dirombak mengikuti referensi user (pola halaman layanan IzinPro):**
  - Hero terang `surface-2`: breadcrumb Beranda › Layanan, H1 "Daftar Layanan" (sebelumnya halaman ini tidak punya H1), subjudul, foto tim di kanan memudar ke latar (disembunyikan di mobile).
  - Bar keunggulan mengambang menumpuk di bawah hero: Pengembangan Agile, Patuh Regulasi OJK, Tim Berpengalaman, Integrasi Satu Pintu, Konsultasi Gratis (tanpa klaim baru). Mobile 1 kolom, `sm:` 2, `lg:` 5.
  - Judul section 2 baris "Ekosistem Digital untuk / Industri Pembiayaan", lalu tab filter kategori (Semua Layanan, Web, Automation, Core System, Mobile App) pakai `aria-pressed`, tinggi tap 44px.
  - Kartu jadi kartu foto: foto Unsplash yang relevan per produk + badge kategori, judul, deskripsi. Hover tetap navy seperti kartu Beranda, foto sedikit zoom.
  - Data dipindah ke `lib/content/services.ts`, filter di komponen client `components/sections/services/ServiceCatalog.tsx`.
- **Baris 3 poin (Profesional / Patuh OJK / SLIK & Dukcapil)** tetap di Hero Beranda (di atas tombol), dan dipakai juga di `/tentang` menggantikan baris statistik (Tim / 8 Produk / 100% Source Code), versi warna terang. Datanya dipindah ke `lib/content/company-facts.ts` supaya satu sumber. (Sempat dipindah ke section Tentang Kami di Beranda, dibatalkan atas koreksi user.)
- **`/tentang`: angka 5 dihapus.** Badge foto → "Didukung Oleh / Tim Berpengalaman"; kartu sorotan "Tim Berpengalaman di Keuangan" → "Tim Berpengalaman". Tidak ada lagi angka jumlah proyek di situs.
- **Link "Selengkapnya" di section Tentang Kami (Beranda) jadi tombol pill** sesuai referensi user, warna palet brand: outline biru `brand`, teks kapital tebal `brand-mid` (8.56), lingkaran biru `brand` berisi panah putih (3.40). Hover: pill terisi biru tua `brand-mid`, teks putih (8.92), lingkaran jadi putih dengan panah `brand-mid`, panah bergeser 2px (`motion-safe:`). Isi hover sengaja bukan biru `brand` karena teks putih di atasnya cuma 3.40 (hover oranye sempat dicoba, ditolak user). Tinggi minimal 44px. Dijadikan komponen bersama `components/shared/PillLink.tsx` dan dipakai juga untuk "Lihat detail semua produk" (Produk & Layanan) dan "Lihat semua portfolio" (Portfolio); di dua section itu posisinya dipindah dari bawah kartu ke atas kartu, di bawah paragraf pembuka.
- **Tombol "Konsultasi Gratis" di Hero: animasi hover.** Tombol naik 2px dengan bayangan oranye lembut (`shadow-accent/30`), panah meluncur 4px ke kanan (200ms, ease-out). Animasi gerak dibungkus `motion-safe:` sehingga mati untuk pengunjung yang mengaktifkan "kurangi animasi". Tombol oranye lain belum disamakan.
- **Kartu Produk & Layanan: hover berubah warna** (Beranda + `/layanan`). Diam = tetap putih seperti semula. Hover = latar navy `brand-dark`, judul putih (14.97), deskripsi white/75 (9.00), kotak ikon `brand/20` dengan ikon `brand-light`, badge transparan teks putih (badge oranye produk unggulan jadi oranye solid teks `brand-dark`, 5.34). Transisi warna 250ms.
- **Kartu Produk & Layanan: percobaan warna dibatalkan.** Dicoba berurutan: warna tile per kategori, kartu gelap untuk 2 produk unggulan, kartu selang-seling putih/navy dengan ikon oranye di beberapa varian tile. Semua ditolak user (gak konsisten / warna nabrak), kartu dikembalikan persis ke tampilan sebelumnya. Kalau mau dicoba lagi: tile biru `brand`/`brand-light` dengan ikon oranye gagal (kontras 1.2-1.3).
- `docs/DESIGN_SYSTEM.md` & `AGENTS.md`: aturan mobile-first dipertegas (mobile/tablet/desktop + prefix Tailwind masing-masing, elemen berjajar menumpuk di mobile, tap target). Catatan lama "Hero mobile visual dulu" diperbaiki sesuai urutan sekarang (teks dulu).
- Verifikasi: lint + type-check bersih. Cek tampilan dilakukan user sendiri.

### Deploy
- Commit `8cb4d57` (54 file, termasuk perubahan 9 & 11 Okt yang belum pernah di-commit) di-push ke `main`, Vercel auto-deploy, **live di https://igt-tech.id** (robots.txt baru, `/llms.txt`, dan halaman artikel dicek 200 OK). `npm run lint` + `npm run build` lolos sebelum push (20 halaman statis).

### Pending
Konten (butuh data/keputusan user):
- **Review 6 artikel blog** di `lib/content/articles.ts`, terutama bagian regulasi (SLIK OJK, Dukcapil). Sudah tayang.
- **Testimoni** masih contoh ilustrasi (`lib/content/testimonials.ts`): ganti dengan kutipan asli seizin klien, lalu hapus catatan "Contoh ilustrasi" di `components/sections/home/Testimonials.tsx`.
- **Kartu tim** masih placeholder (`lib/content/team.ts`): isi nama, foto, LinkedIn, dan konfirmasi jabatan mana yang benar-benar ada. Halaman lama `/tim` (noindex, tidak ditautkan) sekarang tumpang tindih dengan section tim di `/tentang`: putuskan dihapus atau disatukan.
- **Portfolio**: 3 case study (desain Figma) belum dicocokkan dengan 5 proyek asli. Contoh: "Sistem Core Multifinance" menyebut collection & pelaporan OJK, padahal SIFOne adalah LOS.
- ~~**FAQ Beranda**~~ (selesai 2026-10-20) menyebut aplikasi mobile "tersedia untuk Android dan iOS", sedangkan SIFOne baru Android. FAQ ini ikut ke JSON-LD `FAQPage`, jadi perlu dicek kebenarannya.
- ~~**SEO title/description masih "Jakarta"**~~ Selesai 2026-10-20: dihapus, judul dipendekkan.
- **Logo 5 klien lain** (dari 2026-09-14): menunggu file resmi + izin.

Desain:
- ~~**Ukuran font tombol** opsi A/B~~ Selesai 2026-10-20 (opsi B).
- ~~**Animasi hover** tombol oranye lain~~ Selesai 2026-10-20.
- ~~**Verifikasi visual menyeluruh**~~ Selesai 2026-10-20 (lihat Verifikasi).

SEO & infrastruktur:
- **Google Search Console** sudah terverifikasi 2026-10-20 (file HTML di `public/`); sisa: submit sitemap + request indexing (user di dashboard GSC). **Google Business Profile** belum. Setelah ada akun sosial/Business Profile, isi `sameAs` di `buildOrganizationSchema()`.
- **Blog**: kolom komentar sudah tampil tapi nonaktif, newsletter belum dibuat; keduanya butuh backend. Artikel pindah ke CMS di Fase 2.
- **CMS Fase 2** belum mulai.
- 2 IP redundant A record Vercel (`216.198.79.1`, `64.29.17.1`): opsional.

## 2026-10-11

### Diubah
- **Ukuran font tombol CTA `text-sm` (14px) → `text-base` (16px)**: Navbar "Hubungi Kami" (desktop & menu mobile), Hero ("Konsultasi Gratis", "Lihat Layanan"), CTABanner ("Jadwalkan Konsultasi", "Hubungi Langsung"), tombol kirim form Kontak, tombol banner CTA `/tentang`. Badge ("Patuh OJK") dan tombol ikon (panah carousel testimoni) tidak diubah.
- Diverifikasi dengan Playwright di 375px & 1280px: font terbaca 16px, tidak ada scroll horizontal, teks tombol tidak patah baris. Cek kontras axe-core di semua route tetap 0 kegagalan, 0 console error.

### Belum diputuskan
- Tombol masih terasa lebih kecil dibanding referensi (BuildWithAngga) walau sama-sama 16px, karena font Outfit punya x-height pendek dan ketebalan tombol cuma 600-700. Opsi: (A) naik ke 18px (`text-lg`), atau (B) tetap 16px tapi pakai `font-display` (DM Sans) 700 tanpa `tracking-wide`. Diputuskan 2026-10-20: opsi B.

## 2026-10-09

### Diubah
- **Perbaikan kontras warna (WCAG 2.2 AA)** berdasarkan evaluasi palet. Palet inti tetap, yang diubah cara pakainya:
  - Teks tombol/badge oranye (Navbar desktop & mobile, Hero, CTABanner, form Kontak, badge "Patuh OJK" di Hero & WhyUs): putih → `brand-dark` (2.80 → 5.34).
  - Teks kecil warna brand di background terang (label section, nama klien Portfolio, link "Lihat semua", badge layanan, badge Blog, catatan `/tim`, tahun timeline Tentang): `brand` → `brand-mid` (3.26 → 8.56). Ikon dan angka besar tetap `brand`.
  - Hover link: tidak lagi ke `brand-light` (2.03), sekarang `brand-dark` + underline.
  - Badge "highlight" layanan: teks oranye → token baru `accent-text` `#9A3412` (2.40 → 6.27).
  - Token `muted` `#5B7480` → `#547080` (lolos juga di `surface-2`: 4.46 → 4.73).
  - `.gradient-text` di heading section terang: `brand`→`brand-light` jadi `brand-mid`→`brand`. Heading di section gelap (Hero, CTABanner, hero Tentang) pakai class baru `.gradient-text-on-dark` (gradient lama).
  - Banner CTA di bawah `/tentang`: background `brand` → `brand-mid` (teks kecil putih 3.40 → 8.92), teks tombol putihnya ikut `brand-mid`.
  - Badge tahun di timeline `/tentang`: angka diperbesar ke `text-xl` (jadi teks besar, lolos 3:1 di atas `brand`), badge oranye pakai teks `brand-dark`.
  - Subteks statistik Hero: `brand-light/60` → `brand-light` (3.52 → 7.09).
  - Footer: teks deskripsi & link `white/35` → `white/60` (3.18 → 6.89), baris copyright & lokasi `white/25`/`white/20` → `white/55` (5.99).
  - Kartu "Uptime Sistem" di Hero: background `brand-mid` → `brand-dark` (label `brand-light` 4.22 → 7.09).
  - Tag kategori di kartu Portfolio (Beranda & `/portfolio`): background `brand` → `brand-mid` (teks putih 3.40 → 8.92).
- Diverifikasi dengan axe-core (rule `color-contrast`) di semua route, viewport 375px & 1280px.
- `docs/DESIGN_SYSTEM.md`: tabel peran tiap warna, aturan pemakaian, dan tabel rasio kontras.

## 2026-10-08

### Diubah
- **Alamat perusahaan: "Jakarta, Indonesia" → "Jalan Pangkalan 2, Kel. Kedung Halang, Kec. Bogor Utara, Kota Bogor, Jawa Barat 16158"**: `siteSettings.address` (tampil di kartu kontak `/kontak` & Beranda), JSON-LD `PostalAddress` di root layout (sekarang lengkap: street, locality, region, postal code), footer jadi "Bogor, Jawa Barat", `public/llms.txt` (sekalian benerin telepon & email lama yang masih tertinggal di file itu), dan `docs/PRD.md`.
- Belum diubah (perlu keputusan): kata kunci SEO "Jakarta" di title/description semua halaman, dan teks sejarah "Didirikan di Jakarta" (2016) di Tentang & About Beranda.
- **Revisi nama perusahaan: "PT Inovasi Gatarawana Teknologi" → "PT Inovasi Gantarawana Teknologi"** di seluruh situs: `siteSettings.companyName` (otomatis ikut ke JSON-LD Organization, OG image, alt), title & description SEO semua halaman (Beranda, Tentang, Kontak, Blog, Tim), Navbar, Footer, Hero, About, pesan template WhatsApp form kontak, `public/llms.txt`, plus `AGENTS.md` dan `docs/PRD.md`.
- **Hero Beranda versi mobile**: urutan diubah jadi badge layanan → judul "Mengubah Ide Menjadi Inovasi Digital" → deskripsi → tombol (Konsultasi Gratis, Lihat Layanan) → kartu visual (gambar + Core Finance System) → statistik. Sebelumnya kartu visual muncul paling atas. Layout desktop tetap (teks + statistik di kiri, visual di kanan) lewat penempatan grid eksplisit. Dicek dengan Playwright di 375px dan 1440px: tidak ada scroll horizontal, 0 console error.
- Belum tersentuh: file logo PNG (kalau di gambarnya ada tulisan nama lama, perlu diganti dari file desain).

## 2026-10-04

### Dokumentasi
- Tambah `docs/PRD.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md` di dalam repo, disusun dari `../specs/` + `../DESIGN.md` dan disesuaikan dengan kode yang live sekarang. `../specs/` tetap ada sebagai arsip histori.
- `AGENTS.md` ditambah aturan khusus project (konvensi, perintah, aturan konten/UI, cara verifikasi). Blok bawaan Next.js tetap.
- Temuan saat menyusun dokumen (dicatat di backlog `docs/PRD.md`, belum diubah di kode): data konten masih inline di beberapa komponen, tagline di `site-settings.ts` beda dengan slogan final D-6, dan teks putih di tombol accent gagal WCAG AA.

## 2026-10-01

### Keamanan
- **Upgrade `next` 16.3.5 → 16.3.8** (+ `eslint-config-next` ikut 16.3.8, tetap di-pin). Nutup CVE kritis RCE di `next/og` `ImageResponse` ([GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j), kena 16.2.0–16.3.5) — situs ini kena langsung karena `app/opengraph-image.tsx` pakai `ImageResponse`.
- `npm audit fix` buat dependensi transitif dev (brace-expansion, fast-uri, ip-address). `npm audit`: 4 (1 kritis) → 0.
- Verifikasi lokal: build + lint OK, `next start` semua route 200, `/opengraph-image` tetap render PNG.

## 2026-09-14

### Ditambahkan
- Port total desain dari `../WEBSITE DESIGN FIGMA PT IGT/` (Figma Make, React+Vite) ke Next.js, mengikuti struktur & visual sedekat mungkin ("sama persis") tapi diimplementasi ulang pakai App Router + Tailwind v4.
- **shadcn/ui** di-setup dari nol (CLI berbasis Base UI, bukan Radix) — Button, Input, Textarea, Select, Accordion, Avatar, Separator.
- Halaman baru **`/tim`** (belum ditautkan ke navigasi — lihat "Ditunda").
- Section **"Klien Kami"** (marquee 2 baris scroll otomatis di Beranda, di bawah Testimoni + list chip di halaman Portfolio) — data klien satu sumber di `lib/content/clients.ts`.
- Redesign halaman Tentang: Highlights jadi kartu mengambang dengan icon custom, "Perjalanan Kami" jadi timeline vertikal, "Nilai-Nilai" pakai icon box (custom SVG, bukan emoji).
- Testimoni: carousel horizontal scroll-snap, 5 testimoni, tombol panah bulat + dot navigasi (fungsional).
- **Integrasi WhatsApp**: semua CTA "Hubungi Kami"/"Konsultasi"/"Hubungi Langsung" di seluruh situs (Navbar, Hero, CTA banner, CTA halaman Tentang) diarahkan ke `wa.me` dengan pesan template, bukan lagi ke form `/kontak`.
- Form di `/kontak` dipertahankan (bukan dihapus), tapi tombol submit sekarang menyusun pesan dari isian form (nama, email, perusahaan, layanan, kebutuhan) dan membuka WhatsApp dengan pesan itu — bukan fake-submit lagi.
- Data kontak asli terpasang: telepon `+62 812-9542-1735`, email `info@igt-tech.id`, alamat `Jakarta, Indonesia` — menggantikan placeholder `+62 21 XXXX XXXX` dkk.
- Hero (Beranda): urutan mobile diubah jadi gambar/kartu dashboard dulu di atas, baru teks headline di bawahnya (pakai Tailwind `order-`, tampilan desktop gak berubah).
- **SEO**: title & description tiap halaman disesuaikan riset kata kunci user ("jasa IT", "jasa pembuatan website/aplikasi mobile Jakarta", dll) tapi tetap sesuai layanan asli. Tambah JSON-LD `ProfessionalService` schema di root layout.
- **SEO AI**: tambah `public/llms.txt` — ringkasan situs format markdown buat AI crawler (ChatGPT, Perplexity, dll), isinya cuma layanan/portfolio/kontak yang terverifikasi nyata (statistik & testimoni ilustratif sengaja gak dimasukkan ke file ini).

### Ditambahkan (revisi pasca-launch)
- **Logo klien asli**: 2 logo resmi (Woori Finance Indonesia, Shinhan Indo Finance) dipasang di `lib/content/clients.ts`, menggantikan chip nama teks di Beranda (`ClientsMarquee`) & halaman Portfolio. Marquee auto-scroll dinonaktifkan sementara (baru 2 logo, kurang natural buat di-scroll) — tinggal aktifkan lagi kalau logo klien nambah jadi ~5+.
- FAQ: item pertama dibuat kebuka default (sebelumnya semua tertutup dari awal).
- **Technical SEO**: tambah `alternates.canonical` di semua halaman (sebelumnya gak ada sama sekali), redirect 301 `www.igt-tech.id` → `igt-tech.id` di `next.config.ts` (dua host tadinya sama-sama live tanpa redirect = duplicate content di mata Google — kemungkinan besar penyebab hasil pencarian belum muncul normal), `/tim` di-noindex karena belum ditautkan ke navigasi, dan disiapkan slot env var `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` buat verifikasi Google Search Console begitu kodenya didapat dari klien.

### Diperbaiki
- **Bug stacking CSS di Hero**: elemen dekoratif (tekstur titik + lingkaran blur) gak punya `relative` di sibling konten, jadi ketumpuk di atas konten secara teknis dan menghalangi klik/hover tombol CTA di seluruh section. Fix: tambah `relative z-10` di wrapper konten.
- Tag "[sampel testimoni]" yang ikut tampil literal di label testimoni sudah dihapus.
- **Bug `siteSettings.siteUrl` belum diganti** ke domain final padahal udah live — dampaknya `sitemap.xml`, `robots.txt`, OG image, dan `metadataBase` masih nunjuk ke `placeholder-igt.vercel.app`. Sudah diganti ke `https://igt-tech.id`.
- **Favicon masih default Next.js/Vercel** (`app/favicon.ico` bawaan scaffold, gak pernah diganti) — dihapus, diganti `app/icon.png` pakai logo asli PT IGT.
- Upgrade dependency yang aman: React/React DOM ke 19.3.0, `@types/node` ke `^24` (nyocokin Node runtime v24). ESLint tetap di `^9` dan TypeScript tetap di `^5` — keduanya dites naik tapi ternyata belum didukung `eslint-config-next`/`typescript-eslint` versi sekarang (ESLint 10 bikin lint crash, TypeScript 7 di luar range `typescript-eslint`).

### Diperbaiki (revisi pasca-launch)
- **Kontak**: email diganti ke `hendri.m@igt-tech.id`, telepon & WhatsApp diganti ke `+62 851-5908-0096` — data kontak awal ternyata bukan yang final dipakai klien (satu sumber di `lib/content/site-settings.ts`, otomatis kepakai di semua halaman + JSON-LD).
- **Urutan warna background Beranda**: Testimoni jadi putih, Klien Kami jadi surface (abu muda) — sebelumnya dua section itu sama-sama surface jadi gak selang-seling sama section lain.
- **Ukuran logo klien** diperbesar di Beranda & Portfolio — ukuran awal kurang keliatan.

### Deploy
- Project di-link ke Vercel (`muhim24s-projects/igt-company-profile`), GitHub repo otomatis kesambung buat auto-deploy tiap push ke `main`.
- Domain **`igt-tech.id`** (+ `www.igt-tech.id`) disambungkan lewat A record (`76.76.21.21`) di DNS Zone Hostinger, terverifikasi dan SSL otomatis aktif dari Vercel.
- Situs live di **https://igt-tech.id** — semua halaman utama dicek 200 OK.

### Ditunda
- Menu & section "Tim" (foto tim asli belum ada) — di-unlink dari Navbar/Footer/sitemap, halaman `/tim` tetap ada di kode biar gampang diaktifkan lagi.
- Logo resmi 5 klien (Shinhan Indomobil Finance, CTBC Indonesia, UOB Indonesia, Adira Finance, Bank Saku) — sementara masih chip nama teks, nunggu file logo resmi + izin pemakaian dari masing-masing klien.
- ~~Statistik (8+ tahun, 100+ proyek, dst), testimoni, dan cerita/timeline pendirian perusahaan masih konten ilustratif~~ Statistik & timeline sudah dihapus 2026-10-19; testimoni kini berlabel contoh ilustrasi (lihat Pending 2026-10-19).
- 2 IP redundant tambahan yang disaranin Vercel buat A record `@` (`216.198.79.1`, `64.29.17.1`) — opsional, domain udah jalan normal tanpa itu.

## 2026-09-12

### Ditambahkan
- Scaffold project Next.js (App Router, TypeScript, Tailwind v4), token warna/font di-porting dari referensi Figma Make (`specs/07-design-system.md`).
- Layer data lokal `lib/content/*.ts` (services, case-studies, team, site-settings) — 6 layanan, 6 case study nyata (client disamarkan), struktur tim (role generik, tanpa nama/foto orang spesifik).
- 6 halaman jalan: `/`, `/tentang`, `/layanan`, `/portfolio`, `/kontak`, `/blog` — komponen terpisah per file (Navbar, Footer, Hero, About, ServicesGrid, WhyUs, PortfolioGrid, Team, CTA, ContactInfo).
- SEO: metadata per halaman, `sitemap.xml`, `robots.txt`, OG image dinamis (`app/opengraph-image.tsx`).
- Icon SVG custom per layanan (`components/icons/ServiceIcons.tsx`).
- Foto Hero/About/Portfolio: awalnya ilustrasi SVG custom (`NetworkIllustration`), lalu **diganti foto stok Unsplash** dari referensi Figma Make atas permintaan eksplisit user (lihat catatan di `specs/07-design-system.md` — bukan foto asli kantor/tim/proyek).

### Sengaja tidak dibuat (lihat `specs/05-tasks.md` untuk alasan lengkap)
- Section testimonial (belum ada testimoni asli).
- Statistik angka klien/proyek (belum ada data terverifikasi).
- Form kontak fungsional (belum ada data kontak asli & backend).

### Git
- Repo di-push ke **https://github.com/MUHIM24/CMS-IGT** (branch `main`).

### Belum selesai / lanjut sesi berikutnya
- **User feedback (2026-09-12, akhir sesi): tampilan masih belum sesuai ekspektasi** dibanding referensi Figma Make — belum dirinci bagian spesifik mana yang dianggap kurang pas. **Perlu diklarifikasi & di-iterasi lagi di sesi berikutnya** sebelum lanjut ke task lain.
- Task 6 (contact form) — masih block, nunggu data kontak asli.
- Task 9 (deploy Vercel) — belum dikerjakan atas permintaan eksplisit user.
- Domain placeholder (`siteSettings.siteUrl`) masih perlu diganti pas domain final ada.
