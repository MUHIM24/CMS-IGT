import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";

export const metadata: Metadata = {
  title: "Tentang Kami — PT Inovasi Gatarawana Teknologi",
  description:
    "Kenali PT Inovasi Gatarawana Teknologi — visi, misi, dan tim di balik solusi teknologi kami.",
};

export default function TentangPage() {
  return (
    <>
      <About variant="full" />
      <Team />
    </>
  );
}
