import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { DemoForm } from "@/components/admin/DemoForm";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Card, Field, inputClass, PageHeader, textareaClass } from "@/components/admin/ui";
import { articleCategories, getArticle, type Article } from "@/lib/content/articles";

export const metadata: Metadata = { title: "Edit Artikel" };

// Isi artikel (blok terstruktur) ditampilkan sebagai teks bergaya markdown supaya bisa dibaca & diedit
function toEditableBody(article: Article) {
  return article.sections
    .map((s) => {
      const blocks = s.blocks.map((b) => {
        if (b.type === "p") return b.text;
        if (b.type === "list") return b.items.map((i) => `- ${i}`).join("\n");
        return b.items.map((i) => ("title" in i ? `- ${i.title}: ${i.desc}` : `- ${i.label} ${i.value}: ${i.desc}`)).join("\n");
      });
      return [`## ${s.heading}`, ...blocks].join("\n\n");
    })
    .join("\n\n");
}

export default async function AdminArticleEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "baru";
  const article = isNew ? undefined : getArticle(slug);
  if (!isNew && !article) notFound();

  return (
    <>
      <Link href="/admin/blog" className="text-muted hover:text-brand-mid mb-4 inline-flex items-center gap-2 text-sm font-medium">
        <ArrowLeft size={16} /> Kembali ke daftar artikel
      </Link>
      <PageHeader title={isNew ? "Tulis Artikel" : "Edit Artikel"} subtitle={article?.title ?? "Artikel baru akan tampil di /blog"} />
      <Card className="max-w-4xl">
        <DemoForm submitLabel={isNew ? "Terbitkan Artikel" : "Simpan Perubahan"}>
          <Field label="Judul">
            <input defaultValue={article?.title} required className={inputClass} placeholder="Judul artikel" />
          </Field>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Slug URL" hint="huruf kecil & tanda hubung">
              <input defaultValue={article?.slug} className={inputClass} placeholder="judul-artikel" />
            </Field>
            <Field label="Kategori">
              <AdminSelect name="category" options={articleCategories} defaultValue={article?.category} />
            </Field>
            <Field label="Tanggal Terbit">
              <input type="date" defaultValue={article?.date} className={inputClass} />
            </Field>
            <Field label="Estimasi Baca" hint="menit">
              <input type="number" min={1} defaultValue={article?.readMinutes ?? 3} className={inputClass} />
            </Field>
          </div>
          <Field label="Ringkasan" hint="juga dipakai sebagai meta description">
            <textarea defaultValue={article?.excerpt} rows={3} className={textareaClass} placeholder="1-2 kalimat ringkasan" />
          </Field>
          <Field label="Tag" hint="pisahkan dengan koma">
            <input defaultValue={article?.tags.join(", ")} className={inputClass} placeholder="SLIK OJK, Otomasi" />
          </Field>
          <ImageUpload name="image" defaultUrl={article?.img} />
          <Field label="Isi Artikel" hint="## untuk subjudul, - untuk poin">
            <textarea defaultValue={article ? toEditableBody(article) : ""} rows={16} className={`${textareaClass} font-mono text-sm`} />
          </Field>
        </DemoForm>
      </Card>
    </>
  );
}
