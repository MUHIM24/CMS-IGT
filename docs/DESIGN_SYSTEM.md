# Design System: PT IGT

Status per 2026-10-09. Sumber kebenaran token: `app/globals.css`. Kalau dokumen ini dan `globals.css` beda, `globals.css` yang benar, lalu perbarui dokumen ini.

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
| `brand` | `#2596BE` | Identitas brand: ikon, angka besar, border/elemen aktif. Bukan teks kecil di background terang |
| `brand-light` | `#67BED9` | Dekorasi, ilustrasi, teks aksen **hanya** di atas section gelap |
| `brand-mid` | `#1A4F66` | Teks kecil berwarna brand di background terang: label section, link, badge, nama klien. Juga background tombol/banner biru yang pakai teks putih || `brand-dark` | `#0B2A38` | Background hero, CTA, footer. Teks di atas tombol `accent` |
| `brand-deeper` | `#071C26` | Section paling gelap / overlay. Pendukung, tidak dipakai di setiap section |
| `accent` | `#F97316` | CTA utama dan highlight penting saja |
| `accent-light` | `#FB923C` | Hover accent |
| `accent-text` | `#9A3412` | Teks oranye di background terang (mis. badge "highlight" layanan) |
| `surface` | `#F7FBFC` | Background section terang (juga background `body`) |
| `surface-2` | `#EBF5F9` | Varian section terang |
| `text` | `#10242B` | Teks utama |
| `muted` | `#547080` | Teks sekunder / caption (digeser dari `#5B7480` supaya lolos di `surface-2`) |
| `border` | `#D4E8F0` | Border, divider |

Token shadcn (`primary`, `background`, `card`, `ring`, dst) juga ada di `globals.css` untuk komponen `components/ui/*`.

### Aturan warna
- Biru inti cukup tiga tingkat: `brand` (ikon/elemen), `brand-mid` (teks & link di terang), `brand-dark` (section gelap). `brand-light` dan `brand-deeper` hanya pendukung.
- `accent` hanya untuk elemen yang butuh perhatian (tombol CTA utama, badge penting). Jangan untuk link, ikon, atau dekorasi pasif, supaya hierarki tetap jelas.
- Tombol `accent` selalu pakai teks `brand-dark`, bukan putih.
- Link di background terang: `text-brand-mid`, hover `text-brand-dark` + underline. Jangan hover ke `brand-light`.
- Highlight kata di heading: `.gradient-text` di section terang, `.gradient-text-on-dark` di section gelap.
- Section gelap pakai `brand-dark` / `.hero-gradient` dengan teks putih atau `brand-light`.
- Section terang pakai `surface` / `surface-2` / putih dengan teks `text` / `muted`. Di Beranda, urutan background harus selang-seling (jangan dua section bersebelahan dengan background sama).
- Warna baru wajib didaftarkan sebagai token dulu. Hex literal hanya boleh di `app/opengraph-image.tsx` (next/og tidak bisa membaca CSS variable).

### Kontras (wajib dicek)
Acuan WCAG 2.2 AA: teks normal 4.5:1, teks besar (>= 24px, atau >= 18.66px bold) 3:1, ikon/komponen UI 3:1. Rasio di bawah dihitung 2026-10-09 dengan rumus WCAG:

| Kombinasi | Rasio | Status |
|---|---|---|
| `text` di atas `surface` | 15.40 | Teks utama |
| `brand-mid` di atas `surface` | 8.56 | Teks kecil & link |
| `brand-mid` di atas badge `bg-brand/10` | 7.71 | Teks badge |
| `muted` `#547080` di atas `surface` / `surface-2` | 5.03 / 4.73 | Teks sekunder |
| `brand-dark` di atas `accent` | 5.34 | Teks tombol CTA |
| `accent-text` di atas badge `bg-accent/15` | 6.27 | Teks badge oranye |
| Putih di atas `brand-mid` | 8.92 | Tombol/banner biru |
| `brand-light` di atas `brand-dark` | 7.09 | Teks aksen di section gelap |
| `brand` di atas `surface` | 3.26 | **Hanya** ikon/teks besar |
| Putih di atas `brand` | 3.40 | **Hanya** teks besar |
| `brand-dark` di atas `brand` | 4.41 | **Hanya** teks besar |
| `brand-light` di atas `surface` | 2.03 | Dekorasi saja, jangan untuk teks |
| Putih di atas `accent` | 2.80 | Jangan dipakai |
| `accent` di atas putih | 2.80 | Jangan untuk teks |
| `muted` lama `#5B7480` di atas `surface-2` | 4.46 | Alasan token digeser |

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
| `.gradient-text` | Gradient `brand-mid` ke `brand` untuk kata yang di-highlight di heading section terang |
| `.gradient-text-on-dark` | Gradient `brand` ke `brand-light` untuk heading di section gelap |
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
- **Semua tombol berbentuk pill (`rounded-full`)**, termasuk tombol ikon bulat dan paginasi. Yang tetap bersudut (`rounded-xl`/`2xl`): kartu, badge dekoratif, dan kolom isian form.
- `components/shared/PillLink.tsx`: tombol pill "lihat selengkapnya" (outline biru `brand` + lingkaran panah; hover terisi biru tua `brand-mid`, teks putih, bukan oranye). Dipakai di Tentang Kami, Produk & Layanan, Portfolio. Untuk Layanan & Portfolio posisinya di atas kartu.

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

- **Wajib mobile-first.** Setiap komponen ditulis untuk mobile dulu, lalu dilapis ke tablet dan desktop. Tampilan harus rapi di tiga kelompok layar:
  | Kelompok | Lebar acuan | Prefix Tailwind |
  |---|---|---|
  | Mobile | 375px | (tanpa prefix, class dasar) |
  | Tablet | 768px | `sm:` (640px), `md:` (768px) |
  | Desktop | 1280px | `lg:` (1024px), `xl:` (1280px) |
- Class dasar = mobile. Jangan menulis layout desktop dulu lalu "menambal" mobile pakai `max-*:`.
- Jangan pakai `grid` tanpa `grid-cols-*` eksplisit di base (bisa memicu overflow horizontal di mobile).
- Elemen berjajar (kartu, poin keunggulan, statistik) default menumpuk 1 kolom di mobile, baru jadi multi-kolom di `sm:`/`lg:`.
- Tap target di mobile minimal 44px tinggi untuk tombol, 24px untuk link teks.
- Di mobile, Hero menampilkan teks dan tombol dulu, baru kartu visual (penempatan grid eksplisit di `lg:`).
- Verifikasi minimal di 375px, 768px, 1280px pakai Playwright (bukan Chrome CLI `--window-size`).

## 8. Copy

- Bahasa Indonesia, nada profesional dan langsung.
- Tanpa em dash di teks yang tampil ke pengunjung.
- CTA spesifik ("Konsultasi via WhatsApp"), bukan "Learn More".
- Tidak ada klaim/angka baru tanpa data (lihat BR-2 di `docs/PRD.md`).
