import { AdminSelect } from "@/components/admin/AdminSelect";
import { DemoForm } from "@/components/admin/DemoForm";
import { Card, Field, inputClass, textareaClass } from "@/components/admin/ui";
import { serviceCategories, type ServiceDetail } from "@/lib/content/services";

// Form tambah/edit layanan (tahap tampilan). Field mengikuti struktur data lib/content/services.ts.
export function ServiceForm({ service }: { service?: ServiceDetail }) {
  return (
    <Card className="max-w-3xl">
      <DemoForm submitLabel={service ? "Simpan Perubahan" : "Tambah Layanan"}>
        <Field label="Nama Layanan">
          <input defaultValue={service?.title} required className={inputClass} placeholder="mis. Mobile LOS" />
        </Field>
        <Field label="Kategori">
          <AdminSelect name="category" options={serviceCategories} defaultValue={service?.category} />
        </Field>
        <Field label="Deskripsi" hint="tampil di kartu /layanan">
          <textarea defaultValue={service?.desc} required rows={5} className={textareaClass} placeholder="Jelaskan manfaat layanan ini" />
        </Field>
        <Field label="URL Gambar">
          <input defaultValue={service?.img} type="url" className={inputClass} placeholder="https://..." />
        </Field>
        <Field label="Teks Alternatif Gambar" hint="untuk aksesibilitas & SEO">
          <input defaultValue={service?.imgAlt} className={inputClass} placeholder="Deskripsi singkat isi gambar" />
        </Field>
      </DemoForm>
    </Card>
  );
}
