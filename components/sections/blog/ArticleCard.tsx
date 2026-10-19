import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarIcon, ClockIcon } from "@/components/icons/figma-icons";
import { formatArticleDate, type Article } from "@/lib/content/articles";

// Kartu artikel (dipakai /blog dan section Artikel Terbaru di Beranda).
// compact: kartu lebih ramping untuk grid 4 kolom (judul 2 baris, ringkasan 3 baris).
export function ArticleCard({ article: a, compact = false }: { article: Article; compact?: boolean }) {
  return (
    <article className="group border-border hover:border-brand/60 hover:shadow-brand/[0.08] flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-xl">
      <div className={`relative overflow-hidden bg-slate-100 ${compact ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        <Image
          src={a.img}
          alt={a.imgAlt}
          fill
          sizes={compact ? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="bg-brand-mid absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white">{a.category}</span>
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-5" : "p-6"}`}>
        <div className="text-muted mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="flex items-center gap-1.5">
            <CalendarIcon />
            {formatArticleDate(a.date)}
          </span>
          <span className="flex items-center gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5">
            <ClockIcon />
            {a.readMinutes} menit baca
          </span>
        </div>
        <h3 className={`font-display text-text mb-3 text-lg leading-snug font-bold ${compact ? "line-clamp-2" : ""}`}>
          <Link href={`/blog/${a.slug}`} className="hover:text-brand-mid">
            {a.title}
          </Link>
        </h3>
        <p className={`text-muted mb-5 flex-1 text-sm leading-relaxed ${compact ? "line-clamp-3" : ""}`}>{a.excerpt}</p>
        <Link
          href={`/blog/${a.slug}`}
          aria-label={`Baca selengkapnya: ${a.title}`}
          className="text-brand-mid hover:text-brand-dark inline-flex items-center gap-2 text-sm font-bold"
        >
          Baca Selengkapnya <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
