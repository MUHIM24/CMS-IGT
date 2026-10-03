# Design System: PT IGT

Status per 2026-10-04. Sumber kebenaran token: `app/globals.css`. Kalau dokumen ini dan `globals.css` beda, `globals.css` yang benar, lalu perbarui dokumen ini.

## 1. Karakter

Presisi, terpercaya, profesional, tenang tapi meyakinkan. Nuansa "vendor software enterprise yang bisa dipercaya untuk sistem finansial", bukan startup konsumer yang playful, bukan juga situs pemerintah yang kaku.

**Dial:** ENERGY 2 / RHYTHM 2 / MOTION 2.
- Energy 2: profesional, tidak heboh.
- Rhythm 2: section gelap dan terang berselang-seling, variasi wajar.
- Motion 2: fade-up / float ringan, tidak berlebihan.

## 2. Warna

Didefinisikan di `@theme inline` pada `app/globals.css`, dipakai sebagai utility Tailwind (`bg-brand`, `text-muted`, dst).

| Token | Hex | Peran |
|---|---|---|
| `brand` | `#2596BE` | Primary, dari logo |
| `brand-light` | `#67BED9` | Highlight, teks aksen di atas section gelap |
| `brand-dark` | `#0B2A38` | Background hero, CTA, footer |
| `brand-deeper` | `#071C26` | Stop gradient paling gelap |
| `brand-mid` | `#1A4F66` | Stop gradient tengah |
| `accent` | `#F97316` | CTA utama dan highlight penting saja |
| `accent-light` | `#FB923C` | Hover accent |
| `surface` | `#F7FBFC` | Background section terang (juga background `body`) |
| `surface-2` | `#EBF5F9` | Varian section terang |
| `text` | `#10242B` | Teks utama |
| `muted` | `#5B7480` | Teks sekunder / caption |
| `border` | `#D4E8F0` | Border, divider |

Token shadcn (`primary`, `background`, `card`, `ring`, dst) juga ada di `globals.css` untuk komponen `components/ui/*`.

### Aturan warna
- `accent` hanya untuk elemen yang butuh perhatian (tombol CTA utama, badge penting). Jangan untuk dekorasi pasif.
- Section gelap pakai `brand-dark` / `.hero-gradient` dengan teks putih atau `brand-light`.
- Section terang pakai `surface` / `surface-2` / putih dengan teks `text` / `muted`. Di Beranda, urutan background harus selang-seling (jangan dua section bersebelahan dengan background sama).
- Warna baru wajib didaftarkan sebagai token dulu. Hex literal hanya boleh di `app/opengraph-image.tsx` (next/og tidak bisa membaca CSS variable).

### Kontras (wajib dicek)
Beberapa kombinasi token ini **pernah gagal WCAG AA** waktu dicek dengan contrast checker, walaupun terlihat baik secara visual:
- `brand` `#2596BE` sebagai teks kecil di atas surface terang.
- `muted` `#5B7480` di atas `surface-2`.
- Teks putih di atas `accent` `#F97316` (rasio sekitar 2.8:1). **Masalah ini masih ada di situs live:** tombol CTA di Navbar, Hero, CTABanner, dan ContactSection memakai `text-white` di atas accent. Perbaikannya (teks `brand-dark` atau accent yang lebih gelap) ada di backlog `docs/PRD.md` dan butuh keputusan user karena mengubah tampilan.

Selalu cek kombinasi baru pakai contrast checker (skill `antislop-human`) sebelum dipakai.

## 3. Tipografi

| Peran | Font | Cara pakai |
|---|---|---|
| Body / UI | **Outfit** (300-700) | default (`font-sans`) |
| Heading | **DM Sans** (400-800) | class `font-display` |

Dimuat lewat `next/font/google` di `app/layout.tsx`. Heading section umumnya `font-display text-3xl sm:text-4xl font-bold`. `h1` hero `text-4xl sm:text-5xl lg:text-[52px]`.

## 4. Utility class kustom (`app/globals.css`)

| Class | Fungsi |
|---|---|
| `.gradient-text` | Gradient `brand` ke `brand-light` untuk kata yang di-highlight di heading |
| `.gradient-text-accent` | Gradient `accent` ke `accent-light` |
| `.hero-gradient` | Background gelap 140deg: `brand-deeper` → `brand-dark` → `brand-mid` |
| `.card-glow` | Shadow tint accent saat hover kartu |
| `.nav-link` | Underline animasi accent saat hover link navbar |
| `.animate-float`, `.animate-pulse-ring`, `.animate-fade-up` + `.animate-delay-1..3` | Animasi entrance/idle hero |
| `.animate-marquee-left/right` | Marquee logo klien (berhenti saat hover, mati di `prefers-reduced-motion`) |
| `.no-scrollbar` | Sembunyikan scrollbar (carousel testimoni) |

## 5. Komponen

### Primitive (shadcn/ui, style `base-nova`, berbasis Base UI, bukan Radix)
`components/ui/`: Button, Input, Textarea, Select, Accordion, Avatar, Separator. Tambah komponen baru lewat CLI: `npx shadcn@latest add <nama>`.

### Shared
- `components/shared/SectionLabel.tsx`: label kecil uppercase di atas heading section.

### Icon
- `components/icons/figma-icons.tsx`: icon SVG custom per layanan/fitur (hasil port desain Figma). Pakai ini dulu sebelum menambah icon generik.
- `lucide-react` tersedia untuk icon UI umum (panah, menu, close, dst).

### Section
- `components/layout/`: Navbar, Footer.
- `components/sections/home/`: Hero, About, Services, WhyUs, Portfolio, Testimonials (carousel scroll-snap + panah + dot), ClientsMarquee, FAQ (accordion, item pertama terbuka), CTABanner.
- `components/sections/contact/ContactSection.tsx`: form yang menyusun pesan WhatsApp.

## 6. Gambar

- Logo: `public/logo-icon.png`, favicon `app/icon.png`.
- Logo klien: `public/clients/*.jpg`, didaftarkan di `lib/content/clients.ts`.
- Foto Hero/About/Portfolio masih **foto stok Unsplash** (domain di-whitelist di `next.config.ts`). Ganti dengan foto asli begitu ada.
- Selalu pakai `next/image` dengan `alt` yang deskriptif.

## 7. Layout & responsive

- Mobile-first: class dasar = mobile, breakpoint (`sm`, `md`, `lg`) menambah untuk layar besar.
- Jangan pakai `grid` tanpa `grid-cols-*` eksplisit di base (bisa memicu overflow horizontal di mobile).
- Di mobile, Hero menampilkan visual dulu baru teks (pakai `order-*`).
- Verifikasi minimal di 375px, 768px, 1280px pakai Playwright.

## 8. Copy

- Bahasa Indonesia, nada profesional dan langsung.
- Tanpa em dash di teks yang tampil ke pengunjung.
- CTA spesifik ("Konsultasi via WhatsApp"), bukan "Learn More".
- Tidak ada klaim/angka baru tanpa data (lihat BR-2 di `docs/PRD.md`).
