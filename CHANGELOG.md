# Changelog

Log progres pengerjaan situs (bukan decision log — buat itu lihat `../specs/06-keputusan.md`).

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

### Belum selesai / lanjut sesi berikutnya
- **User feedback (2026-09-12, akhir sesi): tampilan masih belum sesuai ekspektasi** dibanding referensi Figma Make — belum dirinci bagian spesifik mana yang dianggap kurang pas. **Perlu diklarifikasi & di-iterasi lagi di sesi berikutnya** sebelum lanjut ke task lain.
- Task 6 (contact form) — masih block, nunggu data kontak asli.
- Task 9 (deploy Vercel) — belum dikerjakan atas permintaan eksplisit user.
- Domain placeholder (`siteSettings.siteUrl`) masih perlu diganti pas domain final ada.
