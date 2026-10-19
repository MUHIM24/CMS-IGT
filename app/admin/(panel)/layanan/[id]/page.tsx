import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { PageHeader } from "@/components/admin/ui";
import { services } from "@/lib/content/services";

export const metadata: Metadata = { title: "Edit Layanan" };

// /admin/layanan/baru = tambah, /admin/layanan/<nomor> = edit (belum ada id di database, pakai urutan)
export default async function AdminServiceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "baru";
  const service = isNew ? undefined : services[Number(id) - 1];
  if (!isNew && !service) notFound();

  return (
    <>
      <Link href="/admin/layanan" className="text-muted hover:text-brand-mid mb-4 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft size={16} /> Kembali ke daftar layanan
      </Link>
      <PageHeader
        title={isNew ? "Tambah Layanan" : "Edit Layanan"}
        subtitle={isNew ? "Layanan baru akan tampil di halaman /layanan" : service!.title}
      />
      <ServiceForm service={service} />
    </>
  );
}
