import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = {
  title: "Kontak | PT Inovasi Gatarawana Teknologi",
  description: "Diskusikan kebutuhan sistem, aplikasi, atau layanan IT Anda dengan tim PT Inovasi Gatarawana Teknologi.",
};

export default function KontakPage() {
  return <ContactSection firstSection />;
}
