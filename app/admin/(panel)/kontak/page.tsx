import type { Metadata } from "next";
import { DemoForm } from "@/components/admin/DemoForm";
import { Card, Field, inputClass, PageHeader, textareaClass } from "@/components/admin/ui";
import { siteSettings } from "@/lib/content/site-settings";

export const metadata: Metadata = { title: "Kontak" };

// Isi default = lib/content/site-settings.ts (sumber tunggal kontak di situs)
export default function AdminContactPage() {
  return (
    <>
      <PageHeader title="Kontak" subtitle="Dipakai di halaman Kontak, footer, tombol WhatsApp, dan data terstruktur Google" />
      <Card className="max-w-3xl">
        <DemoForm>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Email">
              <input type="email" defaultValue={siteSettings.email} className={inputClass} />
            </Field>
            <Field label="Telepon">
              <input defaultValue={siteSettings.phone} className={inputClass} />
            </Field>
          </div>
          <Field label="Nomor WhatsApp" hint="format 62..., tanpa + dan spasi">
            <input defaultValue={siteSettings.whatsappNumber} inputMode="numeric" className={inputClass} />
          </Field>
          <Field label="Alamat">
            <textarea defaultValue={siteSettings.address} rows={3} className={textareaClass} />
          </Field>
        </DemoForm>
      </Card>
    </>
  );
}
