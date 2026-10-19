import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { JsonLd } from "@/components/shared/JsonLd";
import { siteSettings } from "@/lib/content/site-settings";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/structured-data";
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
    default: "Jasa IT & Software House Jakarta | PT Inovasi Gantarawana Teknologi",
    template: "%s",
  },
  description:
    "Jasa pembuatan website, aplikasi mobile, dan sistem IT custom (termasuk sistem keuangan & multifinance) untuk bisnis di Jakarta dan seluruh Indonesia.",
  applicationName: siteSettings.companyName,
  keywords: ["software house", "jasa pembuatan aplikasi", "jasa pembuatan website", "aplikasi mobile", "loan origination system", "otomasi SLIK OJK", "sistem multifinance", "PT IGT"],
  authors: [{ name: siteSettings.companyName, url: siteSettings.siteUrl }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteSettings.companyName,
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
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
