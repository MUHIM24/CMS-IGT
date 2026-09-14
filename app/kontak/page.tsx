import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = {
  title: "Konsultasi Gratis Jasa IT Jakarta | Kontak PT Inovasi Gatarawana Teknologi",
  description:
    "Hubungi kami untuk konsultasi gratis kebutuhan jasa pembuatan website, aplikasi mobile, atau sistem IT bisnis Anda di Jakarta via WhatsApp.",
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  return <ContactSection firstSection />;
}
