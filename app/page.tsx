import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqs } from "@/lib/content/faqs";
import { buildFaqPageSchema } from "@/lib/structured-data";
import { Hero } from "@/components/sections/home/Hero";
import { About } from "@/components/sections/home/About";
import { Services } from "@/components/sections/home/Services";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { Portfolio } from "@/components/sections/home/Portfolio";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { ClientsMarquee } from "@/components/sections/home/ClientsMarquee";
import { FAQ } from "@/components/sections/home/FAQ";
import { LatestArticles } from "@/components/sections/home/LatestArticles";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata = pageMetadata({
  title: "Jasa IT dan Software House Jakarta | PT Inovasi Gantarawana Teknologi",
  description:
    "Jasa pembuatan website, aplikasi mobile (Android/iOS), dan sistem core finance custom di Jakarta. Konsultan IT berpengalaman untuk bisnis pembiayaan dan korporasi.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqPageSchema(faqs)} />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Portfolio />
      <Testimonials />
      <ClientsMarquee />
      <FAQ />
      <LatestArticles />
      <CTABanner />
      <ContactSection />
    </>
  );
}
