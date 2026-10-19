import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ContentList } from "@/components/admin/ContentList";
import { PageHeader, primaryButtonClass } from "@/components/admin/ui";
import { services } from "@/lib/content/services";

export const metadata: Metadata = { title: "Layanan" };

export default function AdminServicesPage() {
  return (
    <>
      <PageHeader
        title="Layanan"
        subtitle={`${services.length} produk & layanan tampil di halaman /layanan`}
        action={
          <Link href="/admin/layanan/baru" className={primaryButtonClass}>
            <Plus size={20} /> Tambah Layanan
          </Link>
        }
      />
      <ContentList
        noun="layanan"
        items={services.map((s, i) => ({
          id: String(i + 1),
          title: s.title,
          subtitle: s.desc,
          badges: [s.category],
          image: s.img,
          editHref: `/admin/layanan/${i + 1}`,
        }))}
      />
    </>
  );
}
