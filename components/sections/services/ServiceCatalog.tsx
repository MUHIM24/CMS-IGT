"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { SERVICE_ANCHOR_EVENT, services, serviceAnchor, serviceCategories, type ServiceCategory } from "@/lib/content/services";

type Filter = "Semua" | ServiceCategory;
const FILTERS: Filter[] = ["Semua", ...serviceCategories];

export function ServiceCatalog() {
  const [active, setActive] = useState<Filter>("Semua");
  const visible = active === "Semua" ? services : services.filter((s) => s.category === active);

  // Link footer ke kartu layanan saat filter lain aktif: tampilkan semua dulu supaya kartu tujuan ada, lalu scroll ke sana
  useEffect(() => {
    function showTarget(e: Event) {
      const anchor = (e as CustomEvent<string>).detail;
      setActive("Semua");
      requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" }));
    }
    window.addEventListener(SERVICE_ANCHOR_EVENT, showTarget);
    return () => window.removeEventListener(SERVICE_ANCHOR_EVENT, showTarget);
  }, []);

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
            id={serviceAnchor(svc.title)}
            // scroll-mt: ruang untuk navbar fixed saat dituju dari link Produk di footer
            className="group border-border hover:bg-brand-dark hover:border-brand-dark flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-250 hover:-translate-y-[3px] hover:shadow-xl"
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
