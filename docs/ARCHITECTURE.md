# Architecture: Website PT IGT

Status per 2026-10-04.

## 1. Stack

| Lapisan | Pilihan |
|---|---|
| Framework | Next.js **16.3.8** (App Router, static/SSG), React 19.3 |
| Bahasa | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@theme` di `app/globals.css`), `tw-animate-css` |
| Komponen | shadcn/ui (style `base-nova`, Base UI), `lucide-react` |
| Lint | ESLint 9 + `eslint-config-next` 16.3.8 |
| Hosting | Vercel |
| Domain/DNS | Hostinger |

Catatan versi: ESLint 10 dan TypeScript 7 sudah dicoba dan **belum didukung** `eslint-config-next` / `typescript-eslint`. Tetap di `^9` dan `^5`.

## 2. Struktur folder

```
app/
  layout.tsx            font, metadata global, JSON-LD ProfessionalService, Navbar/Footer
  page.tsx              Beranda (menyusun section dari components/sections/home)
  tentang/ layanan/ portfolio/ kontak/ blog/ tim/   satu page.tsx per route
  sitemap.ts robots.ts opengraph-image.tsx icon.png
  globals.css           design token + utility class
components/
  layout/               Navbar, Footer
  sections/home/        section-section Beranda
  sections/contact/     ContactSection (dipakai di / dan /kontak)
  shared/               komponen kecil lintas halaman
  icons/                icon SVG custom
  ui/                   primitive shadcn (jangan diedit manual kecuali perlu)
lib/
  content/              layer data (lihat bagian 3)
  utils.ts              helper `cn()`
public/
  logo-icon.png  clients/  llms.txt
docs/                   PRD, DESIGN_SYSTEM, ARCHITECTURE
```

## 3. Layer konten

Prinsip (ADR-3): **komponen UI tidak menyimpan data konten**. Data ada di `lib/content/*.ts`, supaya saat Fase 2 cukup isi fungsi di sana yang diganti jadi fetch ke CMS, UI tidak disentuh.

| File | Isi |
|---|---|
| `site-settings.ts` | Nama perusahaan, tagline, `siteUrl`, telepon, nomor WA, email, alamat + `buildWhatsAppLink(message)` |
| `case-studies.ts` | Case study portfolio (`CaseStudy`) |
| `clients.ts` | Logo klien (`Client`) |

### Tech debt: data yang masih inline
Saat port desain (2026-09-14), sebagian data ditulis langsung di komponen/halaman:

- `app/layanan/page.tsx` (`SERVICES`), `app/tentang/page.tsx` (`HIGHLIGHTS`, `MILESTONES`, `VALUES`), `app/tim/page.tsx` (`ROLES`)
- `components/sections/home/`: `Hero`, `About`, `Services`, `WhyUs`, `Testimonials`, `FAQ`
- `components/sections/contact/ContactSection.tsx`

Harus dipindah ke `lib/content/` sebelum Fase 2 dimulai. Data baru **jangan** ditambah inline.

## 4. Alur lead (WhatsApp)

Tidak ada backend / API route. Semua CTA memakai `buildWhatsAppLink()`:

1. CTA (Navbar, Hero, CTA banner, Tentang) membuka `wa.me/<nomor>` dengan pesan template.
2. Form di `/kontak` (dan Beranda) menyusun pesan dari isian (nama, email, perusahaan, layanan, kebutuhan) lalu membuka WhatsApp.

Ganti nomor/email hanya di `lib/content/site-settings.ts`; otomatis terpakai di semua halaman + JSON-LD.

## 5. SEO

- `metadataBase` = `siteSettings.siteUrl` (`https://igt-tech.id`).
- Title/description per halaman di `export const metadata` masing-masing `page.tsx`; title root pakai `template: "%s"` (title halaman ditulis lengkap).
- `alternates.canonical` di setiap halaman yang diindeks (`/tim` noindex, tanpa canonical).
- `app/sitemap.ts`: daftar route manual (`/tim` sengaja tidak masuk). Tambah route baru di sini.
- `app/robots.ts`: allow semua + link sitemap.
- `app/opengraph-image.tsx`: OG image dinamis via `next/og`.
- JSON-LD `ProfessionalService` di `app/layout.tsx` (`sameAs` masih kosong, isi saat ada akun sosial/Business Profile).
- `public/llms.txt`: ringkasan untuk crawler AI, **hanya** data terverifikasi (tanpa statistik/testimoni ilustratif).
- Verifikasi GSC: env var `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (meta tag) sudah disiapkan, belum diisi. Alternatif: file HTML verifikasi di `public/`.

## 6. Deploy & infrastruktur

```
GitHub MUHIM24/CMS-IGT (main)
  --push--> Vercel project muhim24s-projects/igt-company-profile (auto-deploy)
  --DNS --> Hostinger DNS Zone: A @ dan www -> 76.76.21.21
```

- Push ke `main` = langsung deploy ke production. Cek build lokal dulu.
- `next.config.ts` redirect 301 `www.igt-tech.id/*` ke `https://igt-tech.id/*`.
- SSL otomatis dari Vercel.
- `.env*` tidak pernah masuk git; env var production diatur di dashboard Vercel.

## 7. Perintah

Jalankan dari folder `Website PT IGT/`:

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## 8. Rencana Fase 2 (CMS)

1. Bereskan tech debt bagian 3 (semua konten lewat `lib/content/`).
2. Pilih headless CMS (Sanity / Payload / Strapi), pertimbangkan bisa jalan di Vercel.
3. Ganti implementasi `lib/content/*.ts` jadi fetch ke CMS, tipe data tetap.
4. Revalidasi (ISR / on-demand) supaya edit konten tampil tanpa redeploy.
5. Blog live.
