import { articles } from "@/lib/content/articles";
import { caseStudies } from "@/lib/content/case-studies";
import { services } from "@/lib/content/services";
import { siteSettings } from "@/lib/content/site-settings";

// llms.txt (GEO, Generative Engine Optimization): ringkasan situs format markdown standar https://llmstxt.org
// untuk asisten AI (ChatGPT, Perplexity, Claude, Gemini). Dibangun dari lib/content supaya selalu sinkron
// (pola sama dengan IzinPro). Hanya fakta: jangan masukkan testimoni contoh ilustrasi atau kartu tim placeholder.
export const dynamic = "force-static";

const SITE = siteSettings.siteUrl;
const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();

export function GET() {
  const lines = [
    `# ${siteSettings.companyName} (IGT)`,
    "",
    `> ${siteSettings.tagline}. Software house dan konsultan IT berbasis di Bogor, Jawa Barat, yang membangun aplikasi web, aplikasi mobile, dan sistem pembiayaan (loan origination, otomasi pengecekan SLIK OJK, integrasi Dukcapil) untuk bisnis di seluruh Indonesia.`,
    "",
    "## Layanan",
    ...services.map((s) => `- [${s.title}](${SITE}/layanan) (${s.category}): ${oneLine(s.desc)}`),
    "",
    "## Portfolio",
    ...caseStudies.map((p) => `- [${p.title}](${SITE}/portfolio): ${oneLine(p.desc)}`),
    "",
    "## Artikel",
    ...[...articles]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((a) => `- [${a.title}](${SITE}/blog/${a.slug}): ${oneLine(a.excerpt)}`),
    "",
    "## Halaman",
    `- [Beranda](${SITE}/)`,
    `- [Tentang Kami](${SITE}/tentang)`,
    `- [Layanan](${SITE}/layanan)`,
    `- [Portfolio](${SITE}/portfolio)`,
    `- [Blog](${SITE}/blog)`,
    `- [Kontak](${SITE}/kontak)`,
    `- [Kebijakan Privasi](${SITE}/kebijakan-privasi)`,
    `- [Syarat Layanan](${SITE}/syarat-layanan)`,
    "",
    "## Kontak",
    `- WhatsApp / Telepon: ${siteSettings.phone}`,
    `- Email: ${siteSettings.email}`,
    `- Alamat: ${siteSettings.address}`,
    `- Website: ${SITE}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
