import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ContentList } from "@/components/admin/ContentList";
import { PageHeader, primaryButtonClass } from "@/components/admin/ui";
import { testimonials } from "@/lib/content/testimonials";

export const metadata: Metadata = { title: "Testimoni" };

export default function AdminTestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Testimoni"
        subtitle={`${testimonials.length} testimoni tampil di Beranda (masih contoh ilustrasi)`}
        action={
          <Link href="/admin/testimoni/baru" className={primaryButtonClass}>
            <Plus size={20} /> Tambah Testimoni
          </Link>
        }
      />
      <ContentList
        noun="testimoni"
        items={testimonials.map((t, i) => ({
          id: String(i),
          title: `${t.role}, ${t.company}`,
          subtitle: `“${t.quote}”`,
          badges: ["Contoh ilustrasi"],
          editHref: `/admin/testimoni/${i + 1}`,
        }))}
      />
    </>
  );
}
