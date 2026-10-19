import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/content/site-settings";

// Crawler AI (GEO, Generative Engine Optimization). Secara teknis sudah tercakup aturan "*" di bawah,
// tapi ditulis eksplisit supaya niatnya jelas dan gampang diubah per bot nanti (pola sama dengan IzinPro).
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /tim belum ditautkan & noindex (foto tim asli belum ada); tetap boleh di-crawl supaya noindex terbaca
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteSettings.siteUrl}/sitemap.xml`,
    host: siteSettings.siteUrl,
  };
}
