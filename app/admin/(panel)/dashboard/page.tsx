import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Building2, HelpCircle, MessageSquare, Newspaper, Package, Plus } from "lucide-react";
import { BarChart, ChartTable, SampleDataBadge } from "@/components/admin/charts";
import { StatisticsCard } from "@/components/admin/StatisticsCard";
import { Badge, Card, PageHeader, StatCard, secondaryButtonClass } from "@/components/admin/ui";
import { monthlyVisits } from "@/lib/admin/sample-analytics";
import { articles, formatArticleDate } from "@/lib/content/articles";
import { caseStudies } from "@/lib/content/case-studies";
import { clients } from "@/lib/content/clients";
import { faqs } from "@/lib/content/faqs";
import { services } from "@/lib/content/services";

export const metadata: Metadata = { title: "Overview" };

// Semua angka dihitung dari konten situs yang benar-benar tayang (lib/content), bukan angka karangan.
const STATS = [
  { icon: Package, value: services.length, label: "Layanan" },
  { icon: Briefcase, value: caseStudies.length, label: "Portfolio" },
  { icon: Newspaper, value: articles.length, label: "Artikel Terbit" },
  { icon: HelpCircle, value: faqs.length, label: "FAQ" },
  { icon: Building2, value: clients.length, label: "Logo Klien" },
  { icon: MessageSquare, value: 0, label: "Komentar" },
];

const SITE_STATUS = [
  { label: "Google Search Console", value: "Terverifikasi", tone: "success" as const },
  { label: "Sitemap", value: `${6 + articles.length} URL`, tone: "brand" as const },
  { label: "Database / CMS", value: "Fase 2", tone: "muted" as const },
];

export default function DashboardPage() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <>
      <PageHeader title="Overview" subtitle="Ringkasan konten website PT IGT" />

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {STATS.map((s) => (
          <StatCard key={s.label} icon={s.icon} value={s.value} label={s.label} />
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_340px]">
        <Card>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Kunjungan Bulanan</h2>
              <p className="text-muted mt-1 text-sm">12 bulan terakhir · situs tayang September 2026</p>
            </div>
            <SampleDataBadge />
          </div>
          <BarChart labels={monthlyVisits.labels} series={monthlyVisits.series} />
          <ChartTable labels={monthlyVisits.labels} series={monthlyVisits.series} />
        </Card>
        <Card>
          <h2 className="text-2xl font-bold">Status Situs</h2>
          <p className="text-muted mt-1 mb-6 text-sm">igt-tech.id</p>
          <ul className="space-y-4">
            {SITE_STATUS.map((s) => (
              <li key={s.label} className="flex items-center justify-between gap-3">
                <span className="text-base">{s.label}</span>
                <Badge tone={s.tone}>{s.value}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mb-8">
        <StatisticsCard />
      </div>

      <Card>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Artikel Terbaru</h2>
            <p className="text-muted mt-1 text-sm">5 artikel terakhir yang terbit di blog</p>
          </div>
          <Link href="/admin/blog/baru" className={secondaryButtonClass}>
            <Plus size={18} /> Tulis Artikel
          </Link>
        </div>
        <ul className="divide-border divide-y">
          {latest.map((a) => (
            <li key={a.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <Link href={`/admin/blog/${a.slug}`} className="hover:text-brand-mid line-clamp-1 font-semibold">
                  {a.title}
                </Link>
                <div className="text-muted mt-1 text-sm">
                  {a.category} · {formatArticleDate(a.date)}
                </div>
              </div>
              <Badge tone="success">Terbit</Badge>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
