import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { DemoForm } from "@/components/admin/DemoForm";
import { EditPage } from "@/components/admin/EditPage";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Card, Field, inputClass, textareaClass } from "@/components/admin/ui";
import { caseStudies } from "@/lib/content/case-studies";
import { serviceCategories } from "@/lib/content/services";

export const metadata: Metadata = { title: "Edit Proyek" };

export default async function AdminPortfolioEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "baru";
  const p = isNew ? undefined : caseStudies[Number(id) - 1];
  if (!isNew && !p) notFound();

  return (
    <EditPage
      backHref="/admin/portfolio"
      backLabel="Kembali ke daftar portfolio"
      title={isNew ? "Tambah Proyek" : "Edit Proyek"}
      subtitle={p?.title ?? "Proyek baru tampil di /portfolio"}
    >
      <Card className="max-w-3xl">
        <DemoForm submitLabel={isNew ? "Tambah Proyek" : "Simpan Perubahan"}>
          <Field label="Judul Proyek">
            <input defaultValue={p?.title} required className={inputClass} placeholder="mis. Aplikasi Mobile Loan Origination" />
          </Field>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Kategori" hint="untuk filter">
              <AdminSelect name="category" options={serviceCategories} defaultValue={p?.category} />
            </Field>
            <Field label="Label Kartu">
              <input defaultValue={p?.tag} className={inputClass} placeholder="mis. Mobile LOS" />
            </Field>
          </div>
          <Field label="Klien" hint="boleh disamarkan sesuai kerahasiaan">
            <input defaultValue={p?.client} className={inputClass} placeholder="Perusahaan Pembiayaan, Client A" />
          </Field>
          <Field label="Deskripsi">
            <textarea defaultValue={p?.desc} rows={4} className={textareaClass} />
          </Field>
          <ImageUpload name="image" defaultUrl={p?.img} label="Gambar Proyek" />
        </DemoForm>
      </Card>
    </EditPage>
  );
}
