# PRD: Website Company Profile PT IGT

Status per 2026-10-04. Dokumen ini menggantikan `../specs/00-constitution.md`, `01-spec.md`, `05-tasks.md`, dan `06-keputusan.md` (yang sekarang jadi arsip histori di root workspace).

## 1. Ringkasan produk

Website company profile **PT Inovasi Gantarawana Teknologi (PT IGT)**, live di **https://igt-tech.id**.

- **Fase 1 (sekarang, masih tahap development):** marketing site statis, konten dari file lokal, fokus SEO + lead generation lewat WhatsApp.
- **Fase 2 (belum mulai):** headless CMS supaya konten bisa diedit tanpa developer.

## 2. Tujuan

1. Memperkenalkan PT IGT sebagai **IT solutions company umum** (website, aplikasi, sistem, mobile app, konsultasi IT) untuk bisnis lintas industri.
2. Menampilkan portfolio nyata sebagai bukti kapabilitas.
3. Mengubah pengunjung jadi lead: semua CTA bermuara ke WhatsApp.
4. Ditemukan di Google untuk kata kunci jasa IT di Jakarta.

## 3. Target audience

- **Utama:** pemilik bisnis / manajer IT (UKM sampai enterprise) yang butuh jasa pembuatan website, aplikasi, sistem, mobile app, atau konsultan IT.
- **Catatan:** semua case study yang ada kebetulan di ranah multifinance (SLIK OJK, core finance, LOS, CMO). Itu bukti pengalaman, **bukan** pembatas target pasar.

## 4. Halaman

| Route | Isi | Status |
|---|---|---|
| `/` | Hero, About, Services, WhyUs, Portfolio, Testimoni, Klien Kami, FAQ, CTA banner, form kontak | Live |
| `/tentang` | Highlights, timeline "Perjalanan Kami", nilai-nilai, CTA | Live |
| `/layanan` | 8 layanan (Web Apps, CMS, CNV Robot SLIK, Core Finance System, Mobile Approval, Mobile LOS, Mobile CMO, Mobile CNV) | Live |
| `/portfolio` | Case study + logo klien | Live |
| `/kontak` | Info kontak + form yang menyusun pesan lalu membuka WhatsApp | Live |
| `/blog` | Placeholder "segera hadir" (konten menunggu CMS Fase 2) | Live |
| `/tim` | Role tim | Ada di kode, **noindex**, tidak ditautkan di nav/footer/sitemap (menunggu foto tim asli) |

## 5. Business rules

- **BR-1 Positioning:** layanan umum ditonjolkan setara; portfolio finance dibingkai sebagai "proyek yang pernah kami kerjakan", bukan "fokus utama".
- **BR-2 Kejujuran konten:** tidak boleh klaim klien/partner/sertifikasi tanpa dasar. Logo klien hanya dipasang kalau file resmi + izin sudah ada.
  - **Pengecualian yang disetujui user:** statistik (8+ tahun, 100+ proyek, dst), testimoni, dan timeline pendirian di situs sekarang masih **ilustratif**. Dipertahankan atas keputusan eksplisit user. Jangan disebarkan ke tempat lain (mis. `public/llms.txt`, JSON-LD), dan ganti begitu data asli ada.
- **BR-3 SEO:** title + description unik per halaman, canonical di semua halaman, satu `h1` per halaman, `alt` di semua gambar.
- **BR-4 Mobile-first:** utuh di lebar 375px ke atas, tanpa horizontal scroll.
- **BR-5 Design system:** warna/font hanya dari token di `docs/DESIGN_SYSTEM.md`.
- **BR-6 Tidak ada tombol/form mati:** semua CTA harus benar-benar melakukan sesuatu (saat ini: buka WhatsApp).

## 6. Data kontak resmi

Satu sumber: `lib/content/site-settings.ts`.

- Email: `hendri.m@igt-tech.id`
- Telepon & WhatsApp: `+62 851-5908-0096`
- Alamat: Jakarta, Indonesia

## 7. Definition of Done (per halaman/komponen)

1. Render benar di 375px, 768px, 1280px. Mobile diverifikasi pakai **Playwright** (bukan Chrome CLI `--window-size`, tidak valid di bawah ~504px).
2. Hanya pakai token design system, tanpa hex baru di komponen.
3. Kontras teks lolos WCAG AA (cek pakai contrast checker, jangan dari mata).
4. `npm run build` dan `npm run lint` bersih.
5. Diklik beneran di browser: tiap elemen interaktif jalan, 0 console error.
6. Lolos gate antislop (tanpa em dash di copy, CTA spesifik, tidak ada konten fabricated baru, bisa dinavigasi keyboard).

## 8. Non-goals Fase 1

Admin dashboard, login, blog dinamis, pembayaran, backend form (form diarahkan ke WhatsApp).

## 9. Backlog

### Menunggu bahan dari klien
- [ ] Foto tim asli, lalu aktifkan `/tim` (tautkan ke nav/footer/sitemap, hapus noindex).
- [ ] Logo resmi + izin 5 klien lain (Shinhan Indomobil Finance, CTBC Indonesia, UOB Indonesia, Adira Finance, Bank Saku). Begitu total ~5+ logo, aktifkan lagi marquee auto-scroll di `ClientsMarquee`.
- [ ] Statistik, testimoni, dan cerita/timeline perusahaan yang asli.
- [ ] Foto asli (kantor/proyek) pengganti foto stok Unsplash.

### Setelah development dinyatakan selesai
- [ ] Google Search Console: verifikasi (file HTML di `public/` atau TXT DNS Hostinger), submit `sitemap.xml`, request indexing.
- [ ] Google Business Profile + backlink (LinkedIn, sosial media) lalu isi `sameAs` di JSON-LD.

### Teknis
- [ ] Pindahkan data yang masih inline di komponen/halaman ke `lib/content/` (lihat `docs/ARCHITECTURE.md` bagian Tech debt). Wajib sebelum Fase 2.
- [ ] Kontras tombol CTA: teks putih di atas accent `#F97316` gagal WCAG AA (lihat `docs/DESIGN_SYSTEM.md` bagian Kontras). Perlu keputusan user soal warna pengganti.
- [ ] Samakan tagline: `site-settings.ts` berisi "Mitra Teknologi Terpercaya untuk Industri Keuangan & Multifinance Indonesia", sedangkan slogan final yang diputuskan (D-6) adalah "Mitra Teknologi Terpercaya untuk Transformasi Bisnis Anda". Perlu konfirmasi user mana yang dipakai.

### Fase 2
- [ ] Pilih headless CMS (Sanity / Payload / Strapi).
- [ ] Ganti isi `lib/content/*.ts` jadi fetch ke CMS, UI tidak disentuh.
- [ ] Alur editorial + blog live.

## 10. Decision log

| ID | Tanggal | Keputusan |
|---|---|---|
| D-1 | 2026-09-12 | Next.js App Router (SSG) demi SEO, migrasi dari referensi React+Vite. |
| D-2 | 2026-09-12 | App di Vercel, Hostinger hanya domain/DNS (paket Hostinger tidak support Node.js). |
| D-3 | 2026-09-12 | Palette brand dari logo: `#2596BE`, `#67BED9`, dark `#0B2A38`, accent `#F97316`. |
| D-4 | 2026-09-12 | Positioning IT solutions umum; portfolio finance = bukti kapabilitas. |
| D-6 | 2026-09-12 | Slogan: "Mitra Teknologi Terpercaya untuk Transformasi Bisnis Anda". |
| D-7 | 2026-09-12 | Tailwind CSS v4. |
| D-8 | 2026-09-12 | Project Next.js di subfolder `Website PT IGT/`, root workspace hanya dokumentasi. |
| D-9 | 2026-09-14 | Desain di-port dari `WEBSITE DESIGN FIGMA PT IGT/` + shadcn/ui (Base UI). |
| D-10 | 2026-09-14 | Semua CTA + form kontak diarahkan ke WhatsApp (tidak ada backend email). |
| D-11 | 2026-09-14 | Statistik/testimoni/timeline ilustratif dipertahankan sementara (keputusan user). |
| D-12 | 2026-09-14 | Live di `igt-tech.id`, `www` redirect 301 ke apex. |
| D-13 | 2026-10-04 | GSC + Google Business Profile ditunda sampai development selesai. |
| T-1 | ditunda | Pilihan headless CMS, dibahas saat Fase 2. |

## Glossary

- **SLIK OJK**: sistem OJK untuk cek riwayat kredit debitur.
- **LOS**: Loan Origination System.
- **CMO**: Credit Marketing Officer, tenaga pemasaran lapangan di multifinance.
- **Headless CMS**: pengelola konten yang hanya menyediakan data lewat API.
