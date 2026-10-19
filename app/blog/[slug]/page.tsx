import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/structured-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/sections/blog/ArticleBody";
import { CtaCard } from "@/components/shared/CtaCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarIcon, ClockIcon, ListIcon, TagIcon, WhatsAppIcon } from "@/components/icons/figma-icons";
import { articles, formatArticleDate, getArticle } from "@/lib/content/articles";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: `${article.title} | PT IGT`,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.img,
    type: "article",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  // Artikel terkait: kategori sama dulu, lalu sisanya; maksimal 3
  const related = [
    ...articles.filter((a) => a.slug !== slug && a.category === article.category),
    ...articles.filter((a) => a.slug !== slug && a.category !== article.category),
  ].slice(0, 3);

  return (
    <>
      <JsonLd data={buildArticleSchema(article)} />
      <JsonLd data={buildFaqPageSchema(article.faqs)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Artikel", path: "/blog" },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />
      {/* Hero artikel: teks di kiri, foto artikel di kanan memudar ke latar (disembunyikan di mobile) */}
      <section className="bg-surface-2 relative overflow-hidden pt-[72px]">
        <div className="absolute inset-y-0 right-0 hidden w-[45%] lg:block">
          <Image src={article.img} alt={article.imgAlt} fill priority sizes="45vw" className="object-cover" />
          <div className="from-surface-2 via-surface-2/40 absolute inset-0 bg-gradient-to-r to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-14 lg:px-10 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-muted mb-6 flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="hover:text-brand-dark underline-offset-4 hover:underline">Beranda</Link>
            <span aria-hidden="true">&rsaquo;</span>
            <Link href="/blog" className="hover:text-brand-dark underline-offset-4 hover:underline">Artikel</Link>
            <span aria-hidden="true">&rsaquo;</span>
            <span className="text-text line-clamp-1 font-medium">{article.title}</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-brand-mid mb-3 text-base font-bold tracking-widest uppercase">{article.category}</p>
            <h1 className="font-display text-text mb-4 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">{article.title}</h1>
            <p className="text-muted mb-6 text-base leading-relaxed sm:text-lg">{article.excerpt}</p>
            <div className="flex items-center gap-3">
              <span className="from-brand to-brand-mid font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white">
                IGT
              </span>
              <div>
                <div className="text-text text-sm font-semibold">Ditulis oleh Tim PT IGT</div>
                <div className="text-muted flex flex-wrap items-center gap-x-4 text-sm">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon /> {formatArticleDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5">
                    <ClockIcon /> {article.readMinutes} menit baca
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-14 pb-4 lg:pt-16 lg:pb-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_300px] lg:px-10">
          <article className="min-w-0">
            <ArticleBody sections={article.sections} />

            {article.faqs.length > 0 && (
              <section id="faq" className="mt-12 scroll-mt-28">
                <h2 className="font-display text-text mb-4 text-2xl font-bold">Pertanyaan Seputar Topik Ini</h2>
                <Accordion className="space-y-3">
                  {article.faqs.map((f, i) => (
                    <AccordionItem
                      key={f.q}
                      value={`faq-${i}`}
                      className="border-border data-open:border-brand overflow-hidden rounded-2xl border px-6"
                    >
                      <AccordionTrigger className="font-display text-text py-4 text-base font-semibold hover:no-underline">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted text-base leading-relaxed">{f.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            <div className="border-border mt-10 flex flex-wrap items-center gap-2 border-t pt-6">
              <span className="text-muted">
                <TagIcon />
              </span>
              {article.tags.map((t) => (
                <span key={t} className="bg-surface-2 text-text rounded-full px-3 py-1 text-sm">
                  {t}
                </span>
              ))}
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Daftar isi" className="border-border rounded-2xl border p-6">
              <h2 className="font-display text-text mb-3 flex items-center gap-2 text-base font-bold">
                <span className="text-brand-mid">
                  <ListIcon />
                </span>
                Daftar Isi
              </h2>
              <ul className="border-border space-y-1 border-l pl-4">
                {article.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-muted hover:text-brand-mid block py-1 text-sm">
                      {s.heading}
                    </a>
                  </li>
                ))}
                {article.faqs.length > 0 && (
                  <li>
                    <a href="#faq" className="text-muted hover:text-brand-mid block py-1 text-sm">
                      Pertanyaan Seputar Topik Ini
                    </a>
                  </li>
                )}
              </ul>
            </nav>

            <div className="bg-surface-2 rounded-2xl p-6">
              <h2 className="font-display text-text mb-2 text-base font-bold">Butuh Bantuan?</h2>
              <p className="text-muted mb-4 text-sm leading-relaxed">
                Konsultasikan kebutuhan sistem bisnis Anda gratis bersama tim kami.
              </p>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-mid hover:bg-brand-dark flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-bold text-white transition-colors duration-200"
              >
                Konsultasi Gratis <WhatsAppIcon />
              </a>
            </div>

            {related.length > 0 && (
              <div className="border-border rounded-2xl border p-6">
                <h2 className="font-display text-text mb-4 text-base font-bold">Artikel Terkait</h2>
                <ul className="space-y-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/blog/${r.slug}`} className="group flex gap-3">
                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <Image src={r.img} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                        <span>
                          <span className="text-text group-hover:text-brand-mid line-clamp-2 block text-sm font-semibold">{r.title}</span>
                          <span className="text-muted text-xs">{formatArticleDate(r.date)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CtaCard
        title="Ingin Prosesnya Lebih Cepat dan Rapi?"
        subtitle="Diskusikan kebutuhan sistem Anda dengan tim kami, konsultasi gratis tanpa komitmen."
      />
    </>
  );
}
