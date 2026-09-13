import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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
    default: "Jasa IT & Software House Jakarta | PT Inovasi Gatarawana Teknologi",
    template: "%s",
  },
  description:
    "Jasa pembuatan website, aplikasi mobile, dan sistem IT custom (termasuk sistem keuangan & multifinance) untuk bisnis di Jakarta dan seluruh Indonesia.",
};

// Organization schema (JSON-LD): membantu Google & mesin pencari AI (ChatGPT, Perplexity, dll)
// mengenali identitas, layanan, dan kontak perusahaan secara terstruktur, bukan cuma dari teks.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteSettings.companyName,
  alternateName: "IGT",
  description:
    "Jasa IT konsultan dan software house di Jakarta: pembuatan website, aplikasi mobile, dan sistem core finance custom untuk bisnis lintas industri.",
  url: siteSettings.siteUrl,
  logo: `${siteSettings.siteUrl}/logo-icon.png`,
  telephone: siteSettings.phone,
  email: siteSettings.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jakarta",
    addressCountry: "ID",
  },
  areaServed: "ID",
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", outfit.variable, dmSans.variable, "font-sans")}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
