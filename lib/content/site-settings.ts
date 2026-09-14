export const siteSettings = {
  companyName: "PT Inovasi Gatarawana Teknologi",
  tagline: "Mitra Teknologi Terpercaya untuk Industri Keuangan & Multifinance Indonesia",
  siteUrl: "https://igt-tech.id",
  phone: "+62 851-5908-0096",
  // Format wa.me: kode negara + nomor, tanpa "+", spasi, atau angka 0 di depan.
  whatsappNumber: "6285159080096",
  email: "hendri.m@igt-tech.id",
  address: "Jakarta, Indonesia",
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Halo PT Inovasi Gatarawana Teknologi, saya ingin konsultasi mengenai kebutuhan sistem/aplikasi untuk bisnis saya.";

export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
