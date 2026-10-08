<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Website PT IGT: aturan untuk agent

Company profile PT Inovasi Gantarawana Teknologi, live di https://igt-tech.id. Masih tahap development (Fase 1, tanpa CMS).

## Baca dulu
- `docs/PRD.md`: scope, aturan bisnis, backlog, decision log.
- `docs/ARCHITECTURE.md`: stack, struktur folder, layer konten, SEO, deploy.
- `docs/DESIGN_SYSTEM.md`: token warna/font, utility class, komponen, aturan kontras.
- `CHANGELOG.md`: riwayat pekerjaan. Tambah entri setiap ada perubahan berarti.

## Perintah
```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Aturan kerja
- **Konfirmasi dulu sebelum implementasi.** Setelah disetujui, kerjakan sampai selesai dan laporkan ringkas di akhir.
- **Push ke `main` = deploy production** (Vercel auto-deploy). Jangan commit/push tanpa diminta; build + lint harus lolos dulu.
- Commit message bahasa Indonesia, **tanpa** baris co-author Anthropic/Claude.
- Identifier kode bahasa Inggris, komentar bahasa Indonesia.
- `.env*` tidak boleh masuk git.
- Clean Code + SOLID + KISS. Jangan bikin abstraksi untuk kebutuhan hipotetis.

## Aturan konten
- Data konten taruh di `lib/content/`, bukan inline di komponen (lihat Tech debt di `docs/ARCHITECTURE.md`).
- Kontak (email, telepon, WhatsApp) hanya diubah di `lib/content/site-settings.ts`. CTA pakai `buildWhatsAppLink()`.
- Jangan menambah klaim, angka statistik, testimoni, nama/logo klien, atau sertifikasi yang tidak ada datanya. Konten ilustratif yang sudah ada dipertahankan atas keputusan user, tapi jangan disalin ke `public/llms.txt` atau JSON-LD.
- Tanpa em dash di teks yang tampil ke pengunjung. CTA harus spesifik.

## Aturan UI
- Hanya pakai token dari `app/globals.css`; jangan tambah hex di komponen (kecuali `app/opengraph-image.tsx`).
- Mobile-first. Jangan pakai `grid` tanpa `grid-cols-*` di base.
- Cek kontras kombinasi warna baru pakai contrast checker, jangan dari mata.
- Komponen shadcn baru: `npx shadcn@latest add <nama>` (style `base-nova`, Base UI).

## Verifikasi sebelum bilang selesai
1. `npm run build` + `npm run lint` bersih.
2. Buka di browser, klik semua elemen interaktif yang disentuh, 0 console error.
3. Cek mobile 375px pakai **Playwright** (`viewport`), bukan Chrome CLI `--window-size` (tidak valid di bawah ~504px).
4. Kalau menambah route: daftarkan di `app/sitemap.ts`, beri `metadata` (title, description, canonical).
