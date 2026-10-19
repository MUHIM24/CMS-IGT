import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoForm } from "@/components/admin/DemoForm";
import { EditPage } from "@/components/admin/EditPage";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Card, Field, inputClass } from "@/components/admin/ui";
import { team } from "@/lib/content/team";

export const metadata: Metadata = { title: "Edit Anggota Tim" };

export default async function AdminTeamEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "baru";
  const m = isNew ? undefined : team[Number(id) - 1];
  if (!isNew && !m) notFound();

  return (
    <EditPage
      backHref="/admin/tim"
      backLabel="Kembali ke daftar tim"
      title={isNew ? "Tambah Anggota" : "Edit Anggota"}
      subtitle={m?.role ?? "Anggota baru tampil di /tentang"}
    >
      <Card className="max-w-3xl">
        <DemoForm submitLabel={isNew ? "Tambah Anggota" : "Simpan Perubahan"}>
          <Field label="Nama Lengkap">
            <input defaultValue={m?.name} className={inputClass} placeholder="Nama anggota tim" />
          </Field>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Jabatan">
              <input defaultValue={m?.role} required className={inputClass} />
            </Field>
            <Field label="Fokus Kerja">
              <input defaultValue={m?.focus} className={inputClass} />
            </Field>
          </div>
          <Field label="URL LinkedIn" hint="opsional, tombol muncul kalau diisi">
            <input type="url" defaultValue={m?.linkedin} className={inputClass} placeholder="https://www.linkedin.com/in/..." />
          </Field>
          <ImageUpload name="photo" defaultUrl={m?.photo} label="Foto" />
        </DemoForm>
      </Card>
    </EditPage>
  );
}
