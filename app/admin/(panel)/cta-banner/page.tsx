import type { Metadata } from "next";
import { DemoForm } from "@/components/admin/DemoForm";
import { Card, Field, inputClass, PageHeader, textareaClass } from "@/components/admin/ui";

export const metadata: Metadata = { title: "CTA Banner" };

// Isi default = teks CTA Banner di Beranda (components/sections/home/CTABanner.tsx)
export default function AdminCtaPage() {
  return (
    <>
      <PageHeader title="CTA Banner" subtitle="Ajakan konsultasi di bagian bawah Beranda" />
      <Card className="max-w-3xl">
        <DemoForm>
          <Field label="Label Kecil">
            <input defaultValue="Mulai Proyek Anda" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Judul">
              <input defaultValue="Siap Membangun Sistem yang" className={inputClass} />
            </Field>
            <Field label="Judul (bagian disorot)">
              <input defaultValue="Andal dan Scalable?" className={inputClass} />
            </Field>
          </div>
          <Field label="Deskripsi">
            <textarea
              rows={3}
              className={textareaClass}
              defaultValue="Konsultasikan kebutuhan sistem Anda dengan tim kami, analisis kebutuhan, rekomendasi arsitektur, dan estimasi proyek tanpa biaya awal."
            />
          </Field>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Tombol Utama">
              <input defaultValue="Jadwalkan Konsultasi" className={inputClass} />
            </Field>
            <Field label="Tombol Kedua">
              <input defaultValue="Hubungi Langsung" className={inputClass} />
            </Field>
          </div>
        </DemoForm>
      </Card>
    </>
  );
}
