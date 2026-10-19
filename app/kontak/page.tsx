import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = pageMetadata({
  title: "Konsultasi Gratis Jasa IT Jakarta | Kontak PT Inovasi Gantarawana Teknologi",
  description:
    "Hubungi kami untuk konsultasi gratis kebutuhan jasa pembuatan website, aplikasi mobile, atau sistem IT bisnis Anda di Jakarta via WhatsApp.",
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
