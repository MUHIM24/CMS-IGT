import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ContentList } from "@/components/admin/ContentList";
import { PageHeader, primaryButtonClass } from "@/components/admin/ui";
import { faqs } from "@/lib/content/faqs";

export const metadata: Metadata = { title: "FAQ" };

export default function AdminFaqPage() {
  return (
    <>
      <PageHeader
        title="FAQ"
        subtitle={`${faqs.length} pertanyaan tampil di Beranda (juga dibaca Google lewat data terstruktur)`}
        action={
          <Link href="/admin/faq/baru" className={primaryButtonClass}>
            <Plus size={20} /> Tambah FAQ
          </Link>
        }
      />
      <ContentList noun="pertanyaan" items={faqs.map((f, i) => ({ id: String(i), title: f.q, subtitle: f.a, editHref: `/admin/faq/${i + 1}` }))} />
    </>
  );
}
