import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { siteSettings } from "@/lib/content/site-settings";

export const ogSize = { width: 1200, height: 630 };

export interface OgContent {
  // label kecil di atas judul (nama halaman / kategori artikel); kosong untuk Beranda
  label?: string;
  heading: string;
  subheading: string;
}

const SERVICES = ["Aplikasi Web", "Aplikasi Mobile", "Sistem Bisnis", "Otomasi Proses"];

// Gambar preview saat link dibagikan (WhatsApp, Facebook, LinkedIn, X), satu desain untuk semua halaman.
// Teks penting ditaruh di tengah vertikal karena sebagian aplikasi memotong tepi gambar.
export async function renderOgImage({ label, heading, subheading }: OgContent) {
  const [logo, outfitRegular, outfitBold] = await Promise.all([
    readFile(join(process.cwd(), "public/logo-icon.png")),
    // Font default Satori cuma regular, jadi Outfit (font display situs) dimuat dari file lokal
    readFile(join(process.cwd(), "assets/fonts/outfit-latin-400.woff")),
    readFile(join(process.cwd(), "assets/fonts/outfit-latin-700.woff")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  // judul panjang (mis. judul artikel) dikecilkan supaya tetap muat maksimal 3 baris
  const headingSize = heading.length > 70 ? 48 : heading.length > 45 ? 56 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #071c26 0%, #0b2a38 55%, #1a4f66 100%)",
          padding: "64px 80px",
          position: "relative",
          fontFamily: "Outfit",
        }}
      >
        {/* Aksen lingkaran brand di kanan atas */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(103,190,217,0.28) 0%, rgba(103,190,217,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          {/* next/image gak bisa dipakai di dalam ImageResponse (Satori, bukan React DOM biasa) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={64} height={66} />
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>{siteSettings.shortName}</div>
            <div style={{ fontSize: 22, color: "#9fc9d8" }}>{siteSettings.companyName}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
            <div style={{ width: 72, height: 6, borderRadius: 3, background: "#f97316" }} />
            {label && (
              <div style={{ fontSize: 24, fontWeight: 700, color: "#fb923c", marginLeft: 18, letterSpacing: 3 }}>
                {label.toUpperCase()}
              </div>
            )}
          </div>
          <div style={{ fontSize: headingSize, fontWeight: 700, color: "#ffffff", lineHeight: 1.1, maxWidth: 960 }}>
            {heading}
          </div>
          <div style={{ fontSize: 30, color: "#67bed9", marginTop: 20 }}>{subheading}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            {SERVICES.map((service) => (
              <div
                key={service}
                style={{
                  fontSize: 22,
                  color: "#e6f3f8",
                  border: "1.5px solid rgba(103,190,217,0.5)",
                  borderRadius: 9999,
                  padding: "8px 20px",
                  marginRight: 12,
                }}
              >
                {service}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>igt-tech.id</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Outfit", data: outfitRegular, weight: 400, style: "normal" },
        { name: "Outfit", data: outfitBold, weight: 700, style: "normal" },
      ],
    },
  );
}
