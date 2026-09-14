import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { About } from "@/components/sections/home/About";
import { Services } from "@/components/sections/home/Services";
import { WhyUs } from "@/components/sections/home/WhyUs";
import { Portfolio } from "@/components/sections/home/Portfolio";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { ClientsMarquee } from "@/components/sections/home/ClientsMarquee";
import { FAQ } from "@/components/sections/home/FAQ";
import { CTABanner } from "@/components/sections/home/CTABanner";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = {
  title: "Jasa IT & Software House Jakarta | PT Inovasi Gatarawana Teknologi",
  description:
    "Jasa pembuatan website, aplikasi mobile (Android/iOS), dan sistem core finance custom di Jakarta. Konsultan IT berpengalaman untuk bisnis pembiayaan & korporasi.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Portfolio />
      <Testimonials />
      <ClientsMarquee />
      <FAQ />
      <CTABanner />
      <ContactSection />
    </>
  );
}
