import type { Metadata } from "next";
import { ContactInfo } from "@/components/sections/ContactInfo";

export const metadata: Metadata = {
  title: "Kontak — PT Inovasi Gatarawana Teknologi",
  description: "Hubungi PT Inovasi Gatarawana Teknologi untuk konsultasi kebutuhan IT Anda.",
};

export default function KontakPage() {
  return <ContactInfo />;
}
