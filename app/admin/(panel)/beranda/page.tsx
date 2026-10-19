import type { Metadata } from "next";
import { DemoForm } from "@/components/admin/DemoForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Card, Field, inputClass, PageHeader, textareaClass } from "@/components/admin/ui";
import { companyFacts } from "@/lib/content/company-facts";

export const metadata: Metadata = { title: "Hero Beranda" };

// Isi default = teks yang sekarang tayang di Hero Beranda (components/sections/home/Hero.tsx)
export default function AdminHeroPage() {
  return (
    <>
      <PageHeader title="Hero Beranda" subtitle="Bagian paling atas halaman Beranda" />
      <Card className="max-w-4xl">
        <DemoForm>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_220px]">
            <Field label="Judul">
              <input defaultValue="Mengubah Ide Menjadi Inovasi Digital" className={inputClass} />
            </Field>
            <Field label="Kata Disorot" hint="warna biru">
              <input defaultValue="Inovasi" className={inputClass} />
            </Field>
          </div>
          <Field label="Paragraf">
            <textarea
              rows={4}
              className={textareaClass}
              defaultValue="PT Inovasi Gantarawana Teknologi menghadirkan perangkat lunak enterprise, sistem core multifinance, dan aplikasi mobile yang dirancang untuk kebutuhan bisnis pembiayaan Indonesia, presisi, patuh regulasi, dan siap skala."
            />
          </Field>
          <div>
            <div className="mb-3 text-base font-medium">Poin Keunggulan</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {companyFacts.map((f, i) => (
                <div key={f.title} className="bg-surface space-y-3 rounded-3xl p-4">
                  <input defaultValue={f.title} aria-label={`Judul poin ${i + 1}`} className={inputClass} />
                  <input defaultValue={f.sub} aria-label={`Keterangan poin ${i + 1}`} className={inputClass} />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Tombol Utama">
              <input defaultValue="Konsultasi Gratis" className={inputClass} />
            </Field>
            <Field label="Tombol Kedua">
              <input defaultValue="Lihat Layanan" className={inputClass} />
            </Field>
          </div>
          <ImageUpload
            name="image"
            label="Gambar Kartu Visual"
            defaultUrl="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=520&h=280&fit=crop&auto=format"
          />
        </DemoForm>
      </Card>
    </>
  );
}
