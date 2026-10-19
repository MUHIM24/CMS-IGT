import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ArticleTable } from "@/components/admin/ArticleTable";
import { PageHeader, primaryButtonClass } from "@/components/admin/ui";
import { articles } from "@/lib/content/articles";

export const metadata: Metadata = { title: "Blog & Artikel" };

export default function AdminBlogPage() {
  return (
    <>
      <PageHeader
        title="Blog & Artikel"
        subtitle={`${articles.length} artikel terbit di /blog`}
        action={
          <Link href="/admin/blog/baru" className={primaryButtonClass}>
            <Plus size={20} /> Tulis Artikel
          </Link>
        }
      />
      <ArticleTable articles={articles} />
    </>
  );
}
