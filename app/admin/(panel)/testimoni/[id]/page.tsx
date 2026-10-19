import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoForm } from "@/components/admin/DemoForm";
import { EditPage } from "@/components/admin/EditPage";
import { Card, Field, inputClass, textareaClass } from "@/components/admin/ui";
import { testimonials } from "@/lib/content/testimonials";

export const metadata: Metadata = { title: "Edit Testimoni" };

export default async function AdminTestimonialEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "baru";
  const t = isNew ? undefined : testimonials[Number(id) - 1];
  if (!isNew && !t) notFound();

  return (
    <EditPage
      backHref="/admin/testimoni"
      backLabel="Kembali ke daftar testimoni"
      title={isNew ? "Tambah Testimoni" : "Edit Testimoni"}
      subtitle="Gunakan kutipan asli dan seizin klien"
    >
      <Card className="max-w-3xl">
        <DemoForm submitLabel={isNew ? "Tambah Testimoni" : "Simpan Perubahan"}>
          <Field label="Kutipan">
            <textarea defaultValue={t?.quote} required rows={4} className={textareaClass} placeholder="Kutipan asli dari klien" />
          </Field>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Nama / Jabatan">
              <input defaultValue={t?.role} className={inputClass} placeholder="mis. Kepala Divisi Kredit" />
            </Field>
            <Field label="Perusahaan">
              <input defaultValue={t?.company} className={inputClass} placeholder="Nama perusahaan klien" />
            </Field>
          </div>
        </DemoForm>
      </Card>
    </EditPage>
  );
}
