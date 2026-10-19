import type { Metadata } from "next";
import { DemoForm } from "@/components/admin/DemoForm";
import { Card, Field, inputClass, PageHeader, textareaClass } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Tentang Kami" };

// Isi default = teks yang tayang di section Tentang Kami (Beranda) & halaman /tentang
export default function AdminAboutPage() {
  return (
    <>
      <PageHeader title="Tentang Kami" subtitle="Profil perusahaan, visi, dan misi" />
      <Card className="max-w-4xl">
        <DemoForm>
          <Field label="Judul Section">
            <input defaultValue="Dibangun untuk Presisi, Dipercaya untuk Kompleksitas" className={inputClass} />
          </Field>
          <Field label="Profil Perusahaan">
            <textarea
              rows={4}
              className={textareaClass}
              defaultValue="PT Inovasi Gantarawana Teknologi adalah perusahaan solusi IT yang berfokus pada pengembangan sistem enterprise untuk industri keuangan, multifinance, dan korporasi di Indonesia."
            />
          </Field>
          <Field label="Keahlian Inti">
            <textarea
              rows={3}
              className={textareaClass}
              defaultValue="Keahlian inti kami mencakup sistem multifinance end-to-end, integrasi SLIK OJK otomatis, aplikasi mobile LOS, dan aplikasi lapangan untuk CMO."
            />
          </Field>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Visi">
              <textarea
                rows={4}
                className={textareaClass}
                defaultValue="Menjadi mitra teknologi terpercaya bagi perusahaan Indonesia yang ingin tumbuh melalui sistem digital yang handal."
              />
            </Field>
            <Field label="Misi">
              <textarea
                rows={4}
                className={textareaClass}
                defaultValue="Menghadirkan solusi perangkat lunak yang tepat sasaran, aman, dan scalable dengan fokus pada dampak bisnis nyata."
              />
            </Field>
          </div>
        </DemoForm>
      </Card>
    </>
  );
}
