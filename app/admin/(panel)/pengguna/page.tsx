import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Info } from "lucide-react";
import { ContentList } from "@/components/admin/ContentList";
import { PageHeader } from "@/components/admin/ui";
import { readSessionToken, SESSION_COOKIE } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Pengguna" };

// Tahap tampilan: hanya ada satu akun (dari env). Manajemen banyak pengguna & peran butuh database (Fase 2).
export default async function AdminUsersPage() {
  const session = await readSessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  const name = session?.username ?? "";
  return (
    <>
      <PageHeader title="Pengguna" subtitle="Akun yang bisa masuk ke dashboard" />
      <p className="bg-surface-2 text-brand-dark mb-6 flex items-start gap-3 rounded-2xl px-5 py-4 text-sm">
        <Info size={18} className="mt-0.5 shrink-0" />
        Saat ini hanya ada satu akun administrator. Tambah pengguna dan pengaturan peran (Admin, Editor, Penulis) aktif setelah database
        tersedia (Fase 2).
      </p>
      <ContentList
        noun="pengguna"
        withToggle={false}
        withDuplicate={false}
        items={[{ id: name, title: name.charAt(0).toUpperCase() + name.slice(1), subtitle: `@${name} · Administrator`, avatar: true, badges: ["Aktif"], editHref: "/admin/profil" }]}
      />
    </>
  );
}
