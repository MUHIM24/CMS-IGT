"use client";

import { useState } from "react";
import { Clock, Eye, MousePointerClick, Users } from "lucide-react";
import { BarChart, ChartTable, HBarList, Legend, SampleDataBadge } from "@/components/admin/charts";
import { RangeTabs } from "@/components/admin/StatisticsCard";
import { topPages, trafficFor, type Range } from "@/lib/admin/sample-analytics";

// Halaman Analitik (referensi IzinPro): rentang 7/30/90 hari, 4 kartu ringkasan, tren batang 2 seri,
// sumber traffic, halaman terpopuler. Semua DATA CONTOH sampai situs terhubung ke sistem analitik.
export function AnalyticsView() {
  const [range, setRange] = useState<Range>(7);
  const data = trafficFor(range);
  const tiles = [
    { icon: Eye, value: data.totals.pageViews.toLocaleString("id-ID"), label: `Page Views · ${range} hari` },
    { icon: Users, value: data.totals.visitors.toLocaleString("id-ID"), label: `Pengunjung Unik · ${range} hari` },
    { icon: MousePointerClick, value: `${data.totals.bounceRate}%`, label: `Bounce Rate · ${range} hari` },
    { icon: Clock, value: data.totals.avgDuration, label: `Rata-rata Durasi · ${range} hari` },
  ];
  // Tren batang: untuk 30/90 hari dikelompokkan per minggu supaya batang tidak terlalu rapat
  const group = range === 7 ? 1 : 7;
  const trend = {
    labels: data.labels.filter((_, i) => i % group === 0),
    series: data.series.map((s) => ({
      name: s.name,
      values: s.values.reduce<number[]>((acc, v, i) => {
        if (i % group === 0) acc.push(0);
        acc[acc.length - 1] += v;
        return acc;
      }, []),
    })),
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <RangeTabs value={range} onChange={setRange} />
        <SampleDataBadge />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-3xl bg-white p-6">
            <span className="bg-surface-2 text-brand-mid flex h-12 w-12 items-center justify-center rounded-full">
              <t.icon size={22} strokeWidth={1.75} />
            </span>
            <div className="mt-5 text-3xl font-bold tabular-nums">{t.value}</div>
            <div className="text-muted mt-1 text-sm">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
        <div className="rounded-3xl bg-white p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">
              Tren {range === 7 ? "Harian" : "Mingguan"} · {range} Hari Terakhir
            </h2>
            <Legend series={trend.series} />
          </div>
          <BarChart labels={trend.labels} series={trend.series} />
          <ChartTable labels={trend.labels} series={trend.series} />
        </div>
        <div className="rounded-3xl bg-white p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold">Sumber Traffic</h2>
          <HBarList items={data.sources} />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white">
        <h2 className="px-6 pt-6 pb-4 text-2xl font-bold sm:px-8 sm:pt-8">Halaman Terpopuler</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-border border-y">
              <tr className="text-admin-placeholder text-xs font-semibold tracking-wider uppercase">
                <th scope="col" className="py-4 pr-4 pl-6 sm:pl-8">Halaman</th>
                <th scope="col" className="px-4 py-4 text-right">Views</th>
                <th scope="col" className="py-4 pr-6 pl-4 text-right sm:w-1/3 sm:pr-8 sm:text-left">Porsi</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {topPages.map((pg) => (
                <tr key={pg.path}>
                  <td className="py-4 pr-4 pl-6 sm:pl-8">
                    <div className="font-medium">{pg.title}</div>
                    <div className="text-admin-placeholder text-sm break-all">{pg.path}</div>
                  </td>
                  <td className="px-4 py-4 text-right tabular-nums">{Math.round(data.totals.pageViews * pg.share).toLocaleString("id-ID")}</td>
                  <td className="py-4 pr-6 pl-4 sm:pr-8">
                    <div className="flex items-center justify-end gap-3 sm:justify-start">
                      {/* Batang porsi hanya di layar >= sm; di HP cukup persentase supaya tabel muat tanpa geser samping */}
                      <div className="bg-admin-field hidden h-2 flex-1 overflow-hidden rounded-full sm:block">
                        <div className="bg-brand h-full rounded-full" style={{ width: `${pg.share * 100 * 2.5}%` }} />
                      </div>
                      <span className="text-admin-placeholder w-12 text-right text-sm tabular-nums">{Math.round(pg.share * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
