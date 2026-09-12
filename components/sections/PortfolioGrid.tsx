import Image from "next/image";
import Link from "next/link";
import { getCaseStudies } from "@/lib/content/case-studies";

interface PortfolioGridProps {
  limit?: number;
}

export function PortfolioGrid({ limit }: PortfolioGridProps) {
  const caseStudies = getCaseStudies();
  const items = limit ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="bg-brand/10 text-brand inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
            Portfolio
          </span>
          <h2 className="font-display text-text mt-5 text-3xl font-bold">
            Proyek yang Pernah Kami Kerjakan
          </h2>
          <p className="text-muted mx-auto mt-4 max-w-xl text-sm">
            Nama klien disamarkan untuk menjaga kerahasiaan, deskripsi proyek berdasarkan
            pekerjaan nyata.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => {
            return (
              <div key={project.slug} className="border-border overflow-hidden rounded-2xl border bg-white">
                <div className="relative h-40 w-full">
                  <Image
                    src={project.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-accent text-xs font-bold tracking-wide uppercase">
                    {project.tag}
                  </span>
                  <h3 className="font-display text-text mt-2 text-lg font-bold">{project.title}</h3>
                  <div className="text-brand mt-1 text-xs font-semibold">{project.clientLabel}</div>
                  <p className="text-muted mt-3 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {limit && (
          <div className="mt-10 text-center">
            <Link href="/portfolio" className="nav-link text-brand text-sm font-semibold">
              Lihat semua portfolio →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
