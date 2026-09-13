// TODO: ganti begitu domain final dipasang di Vercel/Hostinger (lihat specs/02-plan.md ADR-2)
export const siteSettings = {
  companyName: "PT Inovasi Gatarawana Teknologi",
  tagline: "Mitra Teknologi Terpercaya untuk Industri Keuangan & Multifinance Indonesia",
  siteUrl: "https://placeholder-igt.vercel.app",
  phone: "+62 812-9542-1735",
  // Format wa.me: kode negara + nomor, tanpa "+", spasi, atau angka 0 di depan.
  whatsappNumber: "6281295421735",
  email: "info@igt-tech.id",
  address: "Jakarta, Indonesia",
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Halo PT Inovasi Gatarawana Teknologi, saya ingin konsultasi mengenai kebutuhan sistem/aplikasi untuk bisnis saya.";

export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
