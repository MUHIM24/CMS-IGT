import type { Metadata } from "next";
import { ContentList } from "@/components/admin/ContentList";
import { DemoForm } from "@/components/admin/DemoForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Card, Field, inputClass, PageHeader } from "@/components/admin/ui";
import { clients } from "@/lib/content/clients";

export const metadata: Metadata = { title: "Klien" };

export default function AdminClientsPage() {
  return (
    <>
      <PageHeader title="Klien" subtitle={`${clients.length} logo klien tampil di Beranda & /portfolio`} />
      <div className="grid grid-cols-1 gap-8 2xl:grid-cols-[1fr_420px]">
        <ContentList
          noun="logo klien"
          withDuplicate={false}
          items={clients.map((c) => ({ id: c.name, title: c.name, image: c.logo, imageFit: "contain" as const }))}
        />
        <Card>
          <h2 className="mb-6 text-2xl font-bold">Tambah Logo Klien</h2>
          <DemoForm submitLabel="Tambah Logo" fullWidthSubmit>
            <Field label="Nama Perusahaan">
              <input required className={inputClass} placeholder="Nama resmi klien" />
            </Field>
            <ImageUpload name="logo" label="Logo" />
            <p className="text-muted text-sm">Pastikan sudah ada izin tertulis dari klien sebelum logonya ditampilkan.</p>
          </DemoForm>
        </Card>
      </div>
    </>
  );
}
