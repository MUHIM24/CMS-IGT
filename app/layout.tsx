import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { siteSettings } from "@/lib/content/site-settings";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.siteUrl),
  title: {
    default: "PT Inovasi Gantarawana Teknologi | Software House dan Jasa Pembuatan Aplikasi",
    template: "%s",
  },
  description:
    "Software house di Bogor yang membangun aplikasi web, aplikasi mobile, dan sistem pembiayaan (loan origination, otomasi SLIK OJK) untuk bisnis di seluruh Indonesia.",
  applicationName: siteSettings.companyName,
  keywords: ["software house", "jasa pembuatan aplikasi", "jasa pembuatan website", "aplikasi mobile", "loan origination system", "otomasi SLIK OJK", "sistem multifinance", "PT IGT"],
  authors: [{ name: siteSettings.companyName, url: siteSettings.siteUrl }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteSettings.shortName,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  // Isi kode verifikasi dari Google Search Console (Settings > Ownership verification > HTML tag,
  // ambil cuma isi atribut content="") di env var ini biar meta tag verifikasinya kepasang otomatis.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      // Next 16: tanpa atribut ini, pindah halaman ikut ter-scroll halus (lambat). Dengan ini, cuma link #anchor yang halus.
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", outfit.variable, dmSans.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col">
        {/* Navbar/Footer/JSON-LD ada di app/(site)/layout.tsx; dashboard punya layout sendiri di app/admin */}
        {children}
      </body>
    </html>
  );
}
