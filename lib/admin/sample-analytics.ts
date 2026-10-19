// DATA CONTOH untuk grafik dashboard (tahap tampilan). Situs BELUM terhubung ke sistem analitik
// (Vercel Analytics / Google Analytics / Search Console API). Semua grafik yang memakai file ini wajib
// menampilkan <SampleDataBadge />. Ganti dengan data asli di Fase 2, jangan disalin ke situs publik.
// Bentuk data dibuat masuk akal untuk domain baru (tayang pertengahan September 2026): sebelum itu nol.

const MONTHS = ["Nov", "Des", "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"];

export const monthlyVisits = {
  labels: MONTHS,
  series: [{ name: "Kunjungan", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 268] }],
};

// Pola mingguan sederhana yang deterministik (tanpa Math.random supaya server & browser sama)
function daily(days: number, base: number) {
  return Array.from({ length: days }, (_, i) => {
    const weekday = (i + 2) % 7;
    const weekend = weekday === 5 || weekday === 6 ? 0.45 : 1;
    const growth = 1 + i / (days * 2.2);
    return Math.round(base * weekend * growth * (0.85 + ((i * 37) % 11) / 30));
  });
}

function dayLabels(days: number) {
  const end = new Date("2026-10-20");
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(end);
    d.setDate(end.getDate() - (days - 1 - i));
    return days <= 7
      ? d.toLocaleDateString("id-ID", { weekday: "short" })
      : d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  });
}

export type Range = 7 | 30 | 90;

export function trafficFor(range: Range) {
  const pageViews = daily(range, 14);
  const visitors = pageViews.map((v, i) => Math.round(v * (0.42 + ((i * 13) % 7) / 50)));
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
  return {
    labels: dayLabels(range),
    series: [
      { name: "Page Views", values: pageViews },
      { name: "Pengunjung Unik", values: visitors },
    ],
    totals: {
      pageViews: sum(pageViews),
      visitors: sum(visitors),
      bounceRate: range === 7 ? 58 : range === 30 ? 61 : 63,
      avgDuration: range === 7 ? "1m 48d" : range === 30 ? "1m 39d" : "1m 31d",
    },
    sources: [
      { label: "Google Search", value: Math.round(sum(visitors) * 0.46) },
      { label: "Langsung (Direct)", value: Math.round(sum(visitors) * 0.33) },
      { label: "LinkedIn", value: Math.round(sum(visitors) * 0.12) },
      { label: "Referral", value: Math.round(sum(visitors) * 0.09) },
    ],
  };
}

// Halaman terpopuler: path asli situs, angka views contoh
export const topPages = [
  { path: "/", title: "Beranda", share: 0.38 },
  { path: "/layanan", title: "Layanan Kami", share: 0.19 },
  { path: "/blog/apa-itu-slik-ojk", title: "Apa Itu SLIK OJK", share: 0.12 },
  { path: "/tentang", title: "Tentang Kami", share: 0.1 },
  { path: "/portfolio", title: "Portfolio", share: 0.09 },
  { path: "/kontak", title: "Hubungi Kami", share: 0.07 },
];
