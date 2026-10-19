"use client";

import { useState } from "react";
import Image from "next/image";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { services, serviceCategories, type ServiceCategory } from "@/lib/content/services";

type Filter = "Semua" | ServiceCategory;
const FILTERS: Filter[] = ["Semua", ...serviceCategories];

export function ServiceCatalog() {
  const [active, setActive] = useState<Filter>("Semua");
  const visible = active === "Semua" ? services : services.filter((s) => s.category === active);

  return (
    <>
      <FilterTabs
        options={FILTERS}
        active={active}
        onChange={setActive}
        labelFor={(f) => (f === "Semua" ? "Semua Layanan" : f)}
        ariaLabel="Filter kategori layanan"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((svc) => (
          <article
            key={svc.title}
            className="group border-border hover:bg-brand-dark hover:border-brand-dark flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <Image
                src={svc.img}
                alt={svc.imgAlt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="bg-brand-mid absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white">
                {svc.category}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-text mb-2 text-lg font-bold transition-colors duration-250 group-hover:text-white">
                {svc.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed transition-colors duration-250 group-hover:text-white/75">
                {svc.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
