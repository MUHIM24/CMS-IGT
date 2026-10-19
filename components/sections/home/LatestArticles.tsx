import { ArticleCard } from "@/components/sections/blog/ArticleCard";
import { PillLink } from "@/components/shared/PillLink";
import { articles } from "@/lib/content/articles";

const LATEST = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);

// Artikel Terbaru di Beranda (setelah FAQ). Latar surface: selang-seling dengan FAQ (putih) dan CTA (gelap).
// Jumlah views dari referensi sengaja tidak ditampilkan karena belum ada datanya.
export function LatestArticles() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-text mb-3 text-3xl font-bold sm:text-4xl">
              Artikel <span className="gradient-text">Terbaru</span>
            </h2>
            <p className="text-muted text-base">Insight seputar teknologi, regulasi, dan digitalisasi bisnis pembiayaan.</p>
          </div>
          <div className="shrink-0">
            <PillLink href="/blog">Lihat Semua Artikel</PillLink>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LATEST.map((a) => (
            <ArticleCard key={a.slug} article={a} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
