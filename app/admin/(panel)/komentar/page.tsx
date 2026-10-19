import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Komentar" };

const TABS = ["Semua", "Menunggu Moderasi", "Disetujui", "Spam"];

// Komentar artikel. Form komentar di /blog masih nonaktif (belum ada database), jadi daftar memang kosong:
// tampilkan keadaan kosong yang jujur, bukan komentar karangan.
export default function AdminCommentsPage() {
  return (
    <>
      <PageHeader title="Komentar" subtitle="Moderasi komentar dari pembaca artikel blog" />
      <div className="bg-admin-field mb-6 inline-flex flex-wrap rounded-full p-1" role="group" aria-label="Filter status komentar">
        {TABS.map((t, i) => (
          <span
            key={t}
            className={`flex min-h-10 items-center rounded-full px-4 text-sm font-medium ${i === 0 ? "text-brand-mid bg-white shadow-sm" : "text-admin-placeholder"}`}
          >
            {t} (0)
          </span>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-6 py-16 text-center">
        <span className="bg-surface-2 text-brand-mid flex h-16 w-16 items-center justify-center rounded-full">
          <MessageSquare size={28} strokeWidth={1.75} />
        </span>
        <h2 className="text-2xl font-bold">Belum ada komentar</h2>
        <p className="text-muted max-w-md text-base">
          Kolom komentar di halaman artikel masih nonaktif. Komentar pembaca akan muncul di sini untuk dimoderasi setelah database
          aktif (Fase 2).
        </p>
      </div>
    </>
  );
}
