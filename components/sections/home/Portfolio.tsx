import Image from "next/image";
import { PillLink } from "@/components/shared/PillLink";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { caseStudies } from "@/lib/content/case-studies";

export function Portfolio() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Portfolio</SectionLabel>
          <h2 className="font-display text-text mb-4 text-3xl font-bold sm:text-4xl">
            Proyek yang Mendefinisikan Keahlian Kami
          </h2>
          <div className="mt-8">
            <PillLink href="/portfolio">Lihat semua portfolio</PillLink>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                <span className="bg-brand-mid absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-bold text-white">{p.tag}</span>
              </div>
              <div className="p-6">
                <div className="text-brand-mid mb-2 text-xs font-semibold">{p.client}</div>
                <h3 className="font-display text-text mb-2.5 text-base font-bold">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
