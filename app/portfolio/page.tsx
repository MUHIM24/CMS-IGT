import type { Metadata } from "next";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Portfolio — PT Inovasi Gatarawana Teknologi",
  description:
    "Proyek yang pernah kami kerjakan, termasuk sistem automation SLIK OJK dan core finance system.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioGrid />
      <CTA />
    </>
  );
}
