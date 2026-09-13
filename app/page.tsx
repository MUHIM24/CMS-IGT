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
  title: "PT Inovasi Gatarawana Teknologi | Ekosistem Digital untuk Industri Pembiayaan",
  description:
    "Perangkat lunak enterprise, sistem core multifinance, dan aplikasi mobile untuk kebutuhan bisnis pembiayaan Indonesia.",
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
