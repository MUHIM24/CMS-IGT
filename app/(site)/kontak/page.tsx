import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = pageMetadata({
  title: "Hubungi Kami | PT IGT",
  description:
    "Konsultasi gratis kebutuhan sistem dan aplikasi bisnis Anda bersama PT IGT. Hubungi kami lewat WhatsApp, telepon, atau email.",
  path: "/kontak",
});

export default function KontakPage() {
  return (
    <>
      <PageHero
        path="/kontak"
        crumb="Kontak"
        titleLead="Hubungi"
        titleAccent="Kami"
        subtitle="Konsultasi gratis tanpa komitmen awal. Ceritakan kebutuhan sistem Anda, tim kami akan merespons."
        image={{
          src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=960&h=600&fit=crop&auto=format",
          alt: "Jabat tangan memulai kerja sama",
        }}
      />
      <ContactSection />
    </>
  );
}
