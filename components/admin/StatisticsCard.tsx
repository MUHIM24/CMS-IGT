"use client";

import { useState } from "react";
import { ChartTable, Legend, LineChart, SampleDataBadge } from "@/components/admin/charts";
import { trafficFor, type Range } from "@/lib/admin/sample-analytics";

const RANGES: { value: Range; label: string }[] = [
  { value: 7, label: "7 Hari" },
  { value: 30, label: "30 Hari" },
  { value: 90, label: "90 Hari" },
];

// Kartu Statistik di Overview: page views & pengunjung unik dengan pilihan rentang (referensi user)
export function StatisticsCard() {
  const [range, setRange] = useState<Range>(30);
  const data = trafficFor(range);
  return (
    <div className="rounded-3xl bg-white p-6 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">Statistik</h2>
            <SampleDataBadge />
          </div>
          <p className="text-muted mt-1 text-sm">Page views & pengunjung unik website</p>
        </div>
        <RangeTabs value={range} onChange={setRange} />
      </div>
      <div className="mb-4">
        <Legend series={data.series} />
      </div>
      <LineChart labels={data.labels} series={data.series} />
      <ChartTable labels={data.labels} series={data.series} />
    </div>
  );
}

export function RangeTabs({ value, onChange }: { value: Range; onChange: (r: Range) => void }) {
  return (
    <div className="bg-admin-field inline-flex self-start rounded-full p-1" role="group" aria-label="Rentang waktu">
      {RANGES.map((r) => (
        <button
          key={r.value}
          type="button"
          onClick={() => onChange(r.value)}
          aria-pressed={value === r.value}
          className={`min-h-10 rounded-full px-4 text-sm font-medium transition-colors ${
            value === r.value ? "text-brand-mid bg-white shadow-sm" : "text-admin-placeholder hover:text-text"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
