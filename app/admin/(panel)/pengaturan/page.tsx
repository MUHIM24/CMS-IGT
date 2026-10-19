import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { DemoForm } from "@/components/admin/DemoForm";
import { Card, Field, inputClass, PageHeader, textareaClass } from "@/components/admin/ui";
import { siteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = { title: "Pengaturan" };

// Isi default = nilai yang sekarang dipakai situs (site-settings & metadata Beranda)
export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader title="Pengaturan" subtitle="Identitas situs dan SEO" />
      <div className="grid max-w-4xl grid-cols-1 gap-8">
        <Card>
          <h2 className="mb-6 text-2xl font-bold">Identitas Situs</h2>
          <DemoForm submitLabel="Simpan Identitas">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Nama Perusahaan">
                <input defaultValue={siteSettings.companyName} className={inputClass} />
              </Field>
              <Field label="Nama Singkat" hint="tampil di Google">
                <input defaultValue={siteSettings.shortName} className={inputClass} />
              </Field>
            </div>
            <Field label="Slogan">
              <input defaultValue={siteSettings.tagline} className={inputClass} />
            </Field>
            <Field label="Domain">
              <input defaultValue={siteSettings.siteUrl} disabled className={inputClass} />
            </Field>
          </DemoForm>
        </Card>
        <Card>
          <h2 className="mb-6 text-2xl font-bold">SEO Beranda</h2>
          <DemoForm submitLabel="Simpan SEO">
            <Field label="Judul Halaman" hint="ideal 50-60 karakter">
              <input defaultValue={SITE_TITLE} className={inputClass} />
            </Field>
            <Field label="Meta Description" hint="ideal 140-160 karakter">
              <textarea
                rows={3}
                className={textareaClass}
                defaultValue={SITE_DESCRIPTION}
              />
            </Field>
          </DemoForm>
        </Card>
      </div>
    </>
  );
}
