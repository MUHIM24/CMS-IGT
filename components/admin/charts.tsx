"use client";

import { useState } from "react";

// Grafik dashboard tanpa library (HTML + SVG). Mengikuti skill dataviz:
// - Warna seri tervalidasi (validate_palette.js): brand #2596BE + accent #F97316 lolos CVD & normal-vision.
//   Oranye di atas putih 2.73 (WARN) -> wajib relief: legenda, tooltip, dan tampilan tabel (ChartTable).
// - Satu sumbu Y, grid samar, batang tipis ujung membulat 4px, garis 2px, tooltip saat hover/fokus.
// - Teks memakai token teks, bukan warna seri.

export const SERIES_COLORS = ["var(--color-brand)", "var(--color-accent)"] as const;

function niceMax(value: number) {
  if (value <= 0) return 4;
  const pow = 10 ** Math.floor(Math.log10(value));
  const step = [1, 2, 2.5, 5, 10].find((s) => s * pow * 4 >= value) ?? 10;
  return step * pow * 4;
}

function Gridlines({ max }: { max: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="border-border absolute right-0 left-0 border-t" style={{ bottom: `${(i / 4) * 100}%` }}>
          <span className="text-admin-placeholder absolute -top-2.5 -left-11 w-9 text-right text-[11px]">
            {Math.round((max * i) / 4).toLocaleString("id-ID")}
          </span>
        </div>
      ))}
    </div>
  );
}

// Tampilan tabel (relief aksesibilitas & kontras)
export function ChartTable({ labels, series }: { labels: string[]; series: { name: string; values: number[] }[] }) {
  return (
    <details className="mt-4">
      <summary className="text-brand-mid hover:text-brand-dark cursor-pointer text-sm font-medium">Lihat sebagai tabel</summary>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-admin-placeholder border-border border-b">
              <th scope="col" className="py-2 pr-4 font-medium">Periode</th>
              {series.map((s) => (
                <th key={s.name} scope="col" className="py-2 pr-4 text-right font-medium">{s.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {labels.map((l, i) => (
              <tr key={l} className="border-border border-b last:border-0">
                <td className="py-2 pr-4">{l}</td>
                {series.map((s) => (
                  <td key={s.name} className="py-2 pr-4 text-right tabular-nums">{s.values[i].toLocaleString("id-ID")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

export function Legend({ series }: { series: { name: string }[] }) {
  if (series.length < 2) return null;
  return (
    <ul className="flex flex-wrap gap-4 text-sm">
      {series.map((s, i) => (
        <li key={s.name} className="text-text flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: SERIES_COLORS[i] }} aria-hidden="true" /> {s.name}
        </li>
      ))}
    </ul>
  );
}

// Batang (1 atau 2 seri berdampingan). Hover/fokus per kelompok menampilkan tooltip.
export function BarChart({ labels, series, height = 240 }: { labels: string[]; series: { name: string; values: number[] }[]; height?: number }) {
  const [hover, setHover] = useState<number>();
  const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
  return (
    <div>
      <div className="relative ml-11" style={{ height }}>
        <Gridlines max={max} />
        <div className="absolute inset-0 flex items-end gap-1 sm:gap-2">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(undefined)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(undefined)}
              aria-label={`${label}: ${series.map((s) => `${s.name} ${s.values[i]}`).join(", ")}`}
              className={`relative flex h-full flex-1 items-end justify-center gap-[2px] rounded-lg transition-colors ${hover === i ? "bg-surface-2/70" : ""}`}
            >
              {series.map((s, si) => (
                <span
                  key={s.name}
                  className="block w-full max-w-7 rounded-t-[4px]"
                  style={{ height: `${(s.values[i] / max) * 100}%`, minHeight: s.values[i] > 0 ? 2 : 0, background: SERIES_COLORS[si] }}
                />
              ))}
              {hover === i && (
                <span className="border-border pointer-events-none absolute bottom-full z-10 mb-2 rounded-xl border bg-white px-3 py-2 text-left text-xs whitespace-nowrap shadow-lg">
                  <span className="text-text block font-semibold">{label}</span>
                  {series.map((s, si) => (
                    <span key={s.name} className="text-text flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: SERIES_COLORS[si] }} aria-hidden="true" />
                      {s.name}: <b className="tabular-nums">{s.values[i].toLocaleString("id-ID")}</b>
                    </span>
                  ))}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* overflow-hidden: label ujung yang disembunyikan di HP tetap memakan tempat dan bisa membuat scroll samping */}
      <div className="mt-2 ml-11 flex gap-1 overflow-hidden sm:gap-2" aria-hidden="true">
        {labels.map((l, i) => (
          <span key={l} className={`text-admin-placeholder flex-1 text-center text-[11px] whitespace-nowrap ${labels.length > 7 && i % 2 ? "invisible sm:visible" : ""}`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// Garis (1-2 seri) dengan crosshair + tooltip. Path di SVG skala bebas, titik & label di HTML supaya tidak gepeng.
export function LineChart({ labels, series, height = 260 }: { labels: string[]; series: { name: string; values: number[] }[]; height?: number }) {
  const [hover, setHover] = useState<number>();
  const max = niceMax(Math.max(...series.flatMap((s) => s.values)));
  const x = (i: number) => (labels.length === 1 ? 50 : (i / (labels.length - 1)) * 100);
  const y = (v: number) => 100 - (v / max) * 100;
  const step = Math.ceil(labels.length / 8);

  return (
    <div>
      <div className="relative ml-11" style={{ height }}>
        <Gridlines max={max} />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {series.map((s, si) => (
            <polyline
              key={s.name}
              points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
              fill="none"
              stroke={SERIES_COLORS[si]}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}
        </svg>
        {hover !== undefined && (
          <>
            <div className="bg-border pointer-events-none absolute top-0 bottom-0 w-px" style={{ left: `${x(hover)}%` }} aria-hidden="true" />
            {series.map((s, si) => (
              <span
                key={s.name}
                aria-hidden="true"
                className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full ring-2 ring-white"
                style={{ left: `${x(hover)}%`, bottom: `${100 - y(s.values[hover])}%`, background: SERIES_COLORS[si] }}
              />
            ))}
            <div
              className="border-border pointer-events-none absolute top-0 z-10 rounded-xl border bg-white px-3 py-2 text-xs whitespace-nowrap shadow-lg"
              style={x(hover) > 60 ? { right: `${100 - x(hover) + 2}%` } : { left: `${x(hover) + 2}%` }}
            >
              <span className="text-text block font-semibold">{labels[hover]}</span>
              {series.map((s, si) => (
                <span key={s.name} className="text-text flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: SERIES_COLORS[si] }} aria-hidden="true" />
                  {s.name}: <b className="tabular-nums">{s.values[hover].toLocaleString("id-ID")}</b>
                </span>
              ))}
            </div>
          </>
        )}
        {/* Area hover per titik (lebih lebar dari markernya) */}
        <div className="absolute inset-0 flex" onMouseLeave={() => setHover(undefined)}>
          {labels.map((l, i) => (
            <button
              key={l}
              type="button"
              aria-label={`${l}: ${series.map((s) => `${s.name} ${s.values[i]}`).join(", ")}`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(undefined)}
              className="h-full flex-1"
            />
          ))}
        </div>
      </div>
      <div className="relative mt-2 ml-11 h-4" aria-hidden="true">
        {labels.map((l, i) =>
          i % step === 0 || i === labels.length - 1 ? (
            <span key={l} className="text-admin-placeholder absolute -translate-x-1/2 text-[11px] whitespace-nowrap" style={{ left: `${x(i)}%` }}>
              {l}
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
}

// Batang horizontal untuk proporsi (sumber traffic). Satu seri: tanpa legenda, judul sudah menamainya.
export function HBarList({ items }: { items: { label: string; value: number }[] }) {
  const total = items.reduce((a, b) => a + b.value, 0) || 1;
  return (
    <ul className="space-y-5">
      {items.map((it) => {
        const pct = (it.value / total) * 100;
        return (
          <li key={it.label}>
            <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
              <span className="text-text font-medium">{it.label}</span>
              <span className="text-admin-placeholder tabular-nums">
                {it.value.toLocaleString("id-ID")} · {pct.toFixed(1).replace(".", ",")}%
              </span>
            </div>
            <div className="bg-admin-field h-2 overflow-hidden rounded-full">
              <div className="bg-brand h-full rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function SampleDataBadge() {
  return (
    <span className="bg-accent/10 text-accent-text inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold" title="Belum terhubung ke sistem analitik">
      Data contoh
    </span>
  );
}
