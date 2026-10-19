"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, SearchIcon, WhatsAppIcon } from "@/components/icons/figma-icons";
import { articleCategories, articles, formatArticleDate, type ArticleCategory } from "@/lib/content/articles";
import { buildWhatsAppLink } from "@/lib/content/site-settings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PAGE_SIZE = 4;
const POPULAR_TOPICS = Array.from(new Set(articles.flatMap((a) => a.tags)));

type Category = "Semua" | ArticleCategory;
const SORT_OPTIONS = ["Terbaru", "Terlama"] as const;
type Sort = (typeof SORT_OPTIONS)[number];

// Daftar artikel statis: cari (judul/ringkasan/tag), filter kategori & topik, urutkan, dan paginasi di sisi client.
export function BlogExplorer() {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Semua");
  const [topic, setTopic] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("Terbaru");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => category === "Semua" || a.category === category)
      .filter((a) => !topic || a.tags.includes(topic))
      .filter((a) => !q || [a.title, a.excerpt, ...a.tags].some((t) => t.toLowerCase().includes(q)))
      .sort((a, b) => (sort === "Terbaru" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [query, category, topic, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Setiap ganti filter, kembali ke halaman 1
  function update<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }
  const chooseCategory = update(setCategory);
  const chooseTopic = update(setTopic);
  const chooseSort = update(setSort);

  return (
    <>
      {/* Kotak pencarian mengambang di bawah hero */}
      <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-6 lg:px-10">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setQuery(draft);
            setPage(1);
          }}
          className="border-border flex gap-3 rounded-2xl border bg-white p-3 shadow-xl sm:p-4"
        >
          <label className="border-border focus-within:border-brand flex flex-1 items-center gap-3 rounded-full border px-5">
            <span className="text-muted">
              <SearchIcon />
            </span>
            <span className="sr-only">Cari artikel</span>
            <input
              type="search"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (e.target.value === "") setQuery("");
              }}
              placeholder="Cari artikel, topik, atau kata kunci..."
              className="text-text placeholder:text-muted min-h-11 w-full bg-transparent text-base outline-none"
            />
          </label>
          <button
            type="submit"
            className="bg-brand-mid hover:bg-brand-dark flex min-h-11 items-center gap-2 rounded-full px-5 text-base font-bold text-white transition-colors duration-200"
          >
            <span className="hidden sm:inline">Cari</span>
            <SearchIcon />
          </button>
        </form>
      </div>

      <section className="bg-white pt-14 pb-4 lg:pt-16 lg:pb-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[280px_1fr] lg:px-10">
          {/* Daftar artikel: di mobile tampil duluan, sidebar di bawahnya */}
          <div className="lg:col-start-2 lg:row-start-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-text text-2xl font-bold sm:text-3xl">
                {query ? `Hasil untuk "${query}"` : "Artikel Terbaru"}
              </h2>
              <Select value={sort} onValueChange={(v) => v && chooseSort(v as Sort)}>
                <SelectTrigger
                  aria-label="Urutkan artikel"
                  className="border-border text-text focus-visible:border-brand h-auto min-h-11 min-w-40 rounded-full bg-white px-4 text-base focus-visible:ring-0"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {visible.length === 0 ? (
              <div className="border-border text-muted rounded-2xl border p-10 text-center">
                Belum ada artikel yang cocok. Coba kata kunci atau kategori lain.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {visible.map((a) => (
                  <article
                    key={a.slug}
                    className="group border-border hover:border-brand/60 hover:shadow-brand/[0.08] flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-xl"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      <Image
                        src={a.img}
                        alt={a.imgAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="bg-brand-mid absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white">
                        {a.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
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
                      <h3 className="font-display text-text mb-3 text-lg leading-snug font-bold">
                        <Link href={`/blog/${a.slug}`} className="hover:text-brand-mid">
                          {a.title}
                        </Link>
                      </h3>
                      <p className="text-muted mb-5 flex-1 text-sm leading-relaxed">{a.excerpt}</p>
                      <Link
                        href={`/blog/${a.slug}`}
                        aria-label={`Baca selengkapnya: ${a.title}`}
                        className="text-brand-mid hover:text-brand-dark inline-flex items-center gap-2 text-sm font-bold"
                      >
                        Baca Selengkapnya <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {pageCount > 1 && (
              <nav aria-label="Halaman artikel" className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Halaman sebelumnya"
                  className="border-border text-text hover:border-brand-mid hover:bg-surface-2 hover:text-brand-mid flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronLeftIcon />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i + 1)}
                    aria-current={page === i + 1 ? "page" : undefined}
                    className={`min-h-11 min-w-11 cursor-pointer rounded-full text-sm font-bold transition-colors duration-200 ${
                      page === i + 1 ? "bg-brand-mid text-white" : "border-border text-text hover:border-brand-mid hover:bg-surface-2 hover:text-brand-mid border"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage(page + 1)}
                  disabled={page === pageCount}
                  aria-label="Halaman selanjutnya"
                  className="border-border text-text hover:border-brand-mid hover:bg-surface-2 hover:text-brand-mid flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40"
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRightIcon />
                </button>
              </nav>
            )}
          </div>

          <aside className="space-y-6 lg:col-start-1 lg:row-start-1">
            <div className="border-border rounded-2xl border bg-white p-6">
              <h2 className="font-display text-text mb-4 text-lg font-bold">Kategori</h2>
              <ul className="space-y-1">
                {(["Semua", ...articleCategories] as Category[]).map((c) => {
                  const count = c === "Semua" ? articles.length : articles.filter((a) => a.category === c).length;
                  const active = category === c;
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => chooseCategory(c)}
                        aria-pressed={active}
                        className={`flex min-h-11 w-full items-center justify-between rounded-xl px-4 text-left text-base transition-colors duration-200 ${
                          active ? "bg-brand/10 text-brand-mid font-semibold" : "text-text hover:bg-surface"
                        }`}
                      >
                        {c === "Semua" ? "Semua Artikel" : c}
                        <span className="text-muted text-sm">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="border-border rounded-2xl border bg-white p-6">
              <h2 className="font-display text-text mb-4 text-lg font-bold">Topik Populer</h2>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TOPICS.map((t) => {
                  const active = topic === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => chooseTopic(active ? null : t)}
                      aria-pressed={active}
                      className={`min-h-9 rounded-full border px-4 text-sm transition-colors duration-200 ${
                        active ? "bg-brand-mid border-brand-mid text-white" : "border-border text-text hover:border-brand-mid"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pengganti kotak newsletter (belum ada backend email): ajakan konsultasi via WhatsApp */}
            <div className="bg-surface-2 rounded-2xl p-6">
              <h2 className="font-display text-text mb-2 text-lg font-bold">Butuh Bantuan?</h2>
              <p className="text-muted mb-5 text-sm leading-relaxed">
                Konsultasikan kebutuhan sistem bisnis Anda gratis bersama tim kami.
              </p>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-mid hover:bg-brand-dark flex min-h-11 items-center justify-center gap-2 rounded-full text-base font-bold text-white transition-colors duration-200"
              >
                Konsultasi Gratis <WhatsAppIcon />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
