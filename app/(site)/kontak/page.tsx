import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/content/page-seo";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = pageMetadata(pageSeo.contact);

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
