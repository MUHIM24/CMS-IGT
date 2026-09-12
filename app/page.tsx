import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "PT Inovasi Gatarawana Teknologi — Jasa Website, Aplikasi, Sistem & IT Consultant",
  description:
    "Jasa pembuatan website, aplikasi, sistem, mobile app, dan IT consultant untuk bisnis lintas industri, dengan pengalaman nyata di sektor pembiayaan.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About variant="teaser" />
      <ServicesGrid />
      <WhyUs />
      <PortfolioGrid limit={3} />
      <CTA />
    </>
  );
}
