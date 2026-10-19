import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ContentList } from "@/components/admin/ContentList";
import { PageHeader, primaryButtonClass } from "@/components/admin/ui";
import { team } from "@/lib/content/team";

export const metadata: Metadata = { title: "Tim" };

export default function AdminTeamPage() {
  return (
    <>
      <PageHeader
        title="Tim"
        subtitle={`${team.length} anggota tampil di /tentang (nama & foto belum diisi)`}
        action={
          <Link href="/admin/tim/baru" className={primaryButtonClass}>
            <Plus size={20} /> Tambah Anggota
          </Link>
        }
      />
      <ContentList
        noun="anggota tim"
        withDuplicate={false}
        items={team.map((m, i) => ({
          id: m.role,
          title: m.name ?? m.role,
          subtitle: m.name ? m.role : m.focus,
          avatar: !m.photo,
          image: m.photo,
          editHref: `/admin/tim/${i + 1}`,
        }))}
      />
    </>
  );
}
