"use client";

import { useState } from "react";
import Image from "next/image";
import { FilterTabs } from "@/components/shared/FilterTabs";
import { caseStudies } from "@/lib/content/case-studies";
import { serviceCategories, type ServiceCategory } from "@/lib/content/services";

type Filter = "Semua" | ServiceCategory;

// Tab hanya untuk kategori yang punya proyek, supaya tidak ada tab yang hasilnya kosong
const FILTERS: Filter[] = ["Semua", ...serviceCategories.filter((c) => caseStudies.some((p) => p.category === c))];

export function PortfolioGrid() {
  const [active, setActive] = useState<Filter>("Semua");
  const visible = active === "Semua" ? caseStudies : caseStudies.filter((p) => p.category === active);

  return (
    <>
      <FilterTabs
        options={FILTERS}
        active={active}
        onChange={setActive}
        labelFor={(f) => (f === "Semua" ? "Semua Portfolio" : f)}
        ariaLabel="Filter kategori portfolio"
      />
      <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {visible.map((p) => (
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
    </>
  );
}
