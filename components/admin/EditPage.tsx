import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/admin/ui";

// Kerangka halaman tambah/edit: tautan kembali + judul. Dipakai semua form di dashboard.
export function EditPage({ backHref, backLabel, title, subtitle, children }: { backHref: string; backLabel: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <>
      <Link href={backHref} className="text-muted hover:text-brand-mid mb-4 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft size={16} /> {backLabel}
      </Link>
      <PageHeader title={title} subtitle={subtitle} />
      {children}
    </>
  );
}
