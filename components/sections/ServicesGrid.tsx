import Link from "next/link";
import { getServices } from "@/lib/content/services";
import { serviceIcons } from "@/components/icons/ServiceIcons";

interface ServicesGridProps {
  limit?: number;
}

export function ServicesGrid({ limit }: ServicesGridProps) {
  const services = getServices();
  const items = limit ? services.slice(0, limit) : services;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="bg-brand/10 text-brand inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
            Layanan Kami
          </span>
          <h2 className="font-display text-text mt-5 text-3xl font-bold">
            Solusi Teknologi End-to-End
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => {
            const Icon = serviceIcons[service.slug];
            return (
              <div
                key={service.slug}
                className="card-glow border-border rounded-2xl border bg-white p-7 transition-transform hover:-translate-y-1"
              >
                <div className="bg-brand/10 text-brand flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-muted mt-4 font-display text-xs font-bold">{service.order}</div>
                <h3 className="font-display text-text mt-1 text-lg font-bold">{service.title}</h3>
                <p className="text-muted mt-3 text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        {limit && (
          <div className="mt-10 text-center">
            <Link
              href="/layanan"
              className="nav-link text-brand text-sm font-semibold"
            >
              Lihat semua layanan →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
