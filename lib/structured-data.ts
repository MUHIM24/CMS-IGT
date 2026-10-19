import { siteSettings } from "@/lib/content/site-settings";

// Builder JSON-LD (schema.org) untuk SEO & GEO (mesin pencari AI: ChatGPT, Perplexity, Gemini, dll).
// Pola sama dengan proyek IzinPro. Aturan: hanya data faktual. JANGAN pakai testimoni contoh ilustrasi
// (Review/AggregateRating) atau kartu tim placeholder di sini, karena akan terbaca sebagai klaim nyata.

const SITE = siteSettings.siteUrl;
const ORG_ID = `${SITE}/#organization`;

const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE}${path}`);

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteSettings.companyName,
    alternateName: "IGT",
    slogan: siteSettings.tagline,
    description:
      "Software house dan konsultan IT berbasis di Bogor yang membangun aplikasi web, aplikasi mobile, dan sistem pembiayaan (loan origination, otomasi SLIK OJK, integrasi Dukcapil) untuk bisnis di seluruh Indonesia.",
    url: SITE,
    logo: absolute("/logo-icon.png"),
    image: absolute("/opengraph-image"),
    telephone: siteSettings.phone,
    email: siteSettings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jalan Pangkalan 2, Kedung Halang, Bogor Utara",
      addressLocality: "Kota Bogor",
      addressRegion: "Jawa Barat",
      postalCode: "16158",
      addressCountry: "ID",
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsAbout: [
      "Pengembangan aplikasi web",
      "Pengembangan aplikasi mobile Android",
      "Loan Origination System",
      "Otomasi pengecekan SLIK OJK",
      "Integrasi data Dukcapil",
      "Sistem multifinance",
      "Content Management System",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteSettings.phone,
      email: siteSettings.email,
      availableLanguage: ["Indonesian", "English"],
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    // Google memakai name/alternateName WebSite sebagai "site name" di hasil pencarian
    name: siteSettings.shortName,
    alternateName: [siteSettings.companyName, "IGT"],
    url: SITE,
    inLanguage: "id-ID",
    publisher: { "@id": ORG_ID },
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Beranda", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function buildFaqPageSchema(faqs: { q: string; a: string }[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildServiceListSchema(services: { title: string; desc: string; category: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Produk & Layanan PT Inovasi Gantarawana Teknologi",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        serviceType: s.category,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Indonesia" },
      },
    })),
  };
}

export function buildArticleSchema(input: {
  title: string;
  excerpt: string;
  slug: string;
  img: string;
  date: string;
  tags: string[];
}) {
  const url = `${SITE}/blog/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.excerpt,
    image: [input.img],
    datePublished: input.date,
    dateModified: input.date,
    inLanguage: "id-ID",
    keywords: input.tags.join(", "),
    author: { "@type": "Organization", name: "Tim PT IGT", url: SITE },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}
