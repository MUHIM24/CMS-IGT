# Changelog

Log progres pengerjaan situs (bukan decision log — buat itu lihat bagian Decision log di `docs/PRD.md`).

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
- Statistik (8+ tahun, 100+ proyek, dst), testimoni, dan cerita/timeline pendirian perusahaan masih konten ilustratif (belum data terverifikasi) — dipertahankan atas keputusan eksplisit user, bukan alasan teknis.
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
