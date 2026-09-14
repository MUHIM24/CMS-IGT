import type { Metadata } from "next";
import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { caseStudies } from "@/lib/content/case-studies";
import { clients } from "@/lib/content/clients";

export const metadata: Metadata = {
  title: "Portofolio Jasa IT Konsultan Jakarta | Proyek Sistem Finance & Mobile",
  description:
    "Portofolio proyek jasa pembuatan sistem core finance, aplikasi mobile, dan automation SLIK OJK yang pernah kami kerjakan untuk klien pembiayaan di Indonesia.",
};

export default function PortfolioPage() {
  return (
    <section className="bg-white pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="font-display text-text mb-4 text-3xl font-bold sm:text-4xl">
            Proyek yang Mendefinisikan Keahlian Kami
          </h2>
          <p className="text-muted mx-auto max-w-lg text-base leading-relaxed">
            Contoh implementasi nyata, nama klien digeneralisasi sesuai perjanjian kerahasiaan.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {caseStudies.map((p) => (
            <div
              key={p.slug}
              className="border-border hover:border-brand/60 hover:shadow-brand/[0.08] group overflow-hidden rounded-2xl border transition-all duration-250 hover:-translate-y-[3px] hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #071C2688, transparent)" }} />
                <span className="bg-brand absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-bold text-white">{p.tag}</span>
              </div>
              <div className="p-6">
                <div className="text-brand mb-2 text-xs font-semibold">{p.client}</div>
                <h3 className="font-display text-text mb-2.5 text-base font-bold">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-border border-t pt-12">
          <div className="text-muted mb-8 text-center text-xs font-black tracking-widest uppercase">Klien Kami</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {clients.map((c) => (
              <div
                key={c.name}
                className="border-border flex h-16 w-32 items-center justify-center rounded-xl border bg-white p-3"
              >
                <Image src={c.logo} alt={c.name} width={120} height={48} className="h-full w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
