import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoForm } from "@/components/admin/DemoForm";
import { EditPage } from "@/components/admin/EditPage";
import { Card, Field, inputClass, textareaClass } from "@/components/admin/ui";
import { faqs } from "@/lib/content/faqs";

export const metadata: Metadata = { title: "Edit FAQ" };

export default async function AdminFaqEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "baru";
  const f = isNew ? undefined : faqs[Number(id) - 1];
  if (!isNew && !f) notFound();

  return (
    <EditPage
      backHref="/admin/faq"
      backLabel="Kembali ke daftar FAQ"
      title={isNew ? "Tambah FAQ" : "Edit FAQ"}
      subtitle="Jawaban harus faktual, karena ikut dibaca Google & AI"
    >
      <Card className="max-w-3xl">
        <DemoForm submitLabel={isNew ? "Tambah FAQ" : "Simpan Perubahan"}>
          <Field label="Pertanyaan">
            <input defaultValue={f?.q} required className={inputClass} />
          </Field>
          <Field label="Jawaban">
            <textarea defaultValue={f?.a} required rows={5} className={textareaClass} />
          </Field>
        </DemoForm>
      </Card>
    </EditPage>
  );
}
