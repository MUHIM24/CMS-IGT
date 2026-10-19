import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ContentList } from "@/components/admin/ContentList";
import { PageHeader, primaryButtonClass } from "@/components/admin/ui";
import { caseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = { title: "Portfolio" };

export default function AdminPortfolioPage() {
  return (
    <>
      <PageHeader
        title="Portfolio"
        subtitle={`${caseStudies.length} studi kasus tampil di /portfolio & Beranda`}
        action={
          <Link href="/admin/portfolio/baru" className={primaryButtonClass}>
            <Plus size={20} /> Tambah Proyek
          </Link>
        }
      />
      <ContentList
        noun="proyek"
        items={caseStudies.map((p, i) => ({
          id: p.slug,
          title: p.title,
          subtitle: `${p.client} · ${p.desc}`,
          badges: [p.tag],
          image: p.img,
          editHref: `/admin/portfolio/${i + 1}`,
        }))}
      />
    </>
  );
}
