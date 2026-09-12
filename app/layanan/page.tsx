import type { Metadata } from "next";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Layanan — PT Inovasi Gatarawana Teknologi",
  description:
    "Jasa pembuatan website, aplikasi, sistem, mobile app, IT consulting, dan solusi fintech & multifinance.",
};

export default function LayananPage() {
  return (
    <>
      <ServicesGrid />
      <CTA />
    </>
  );
}
