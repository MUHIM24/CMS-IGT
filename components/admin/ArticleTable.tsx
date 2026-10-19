"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUp, Eye, Info, Pencil, Search, Trash2 } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { formatArticleDate, type Article } from "@/lib/content/articles";

// Tabel artikel dashboard (referensi user). Layar >= 1280px: tabel; di bawahnya kartu bertumpuk (tanpa scroll samping),
// karena kolom sidebar membuat area konten < 850px di laptop kecil/tablet.
// Kolom views/statistik dari referensi sengaja tidak ada: belum ada data analitik.
// Hapus = mode tampilan (belum ada database), hanya notifikasi.

const AUTHOR = "Tim PT IGT";

function StatusBadge() {
  return (
    <span className="bg-brand-light/20 text-brand-dark inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold">
      <span className="bg-brand-mid h-1.5 w-1.5 rounded-full" aria-hidden="true" /> Terbit
    </span>
  );
}

function CategoryBadge({ children }: { children: React.ReactNode }) {
  return <span className="bg-admin-field text-text inline-flex rounded-full px-3 py-1 text-xs font-medium">{children}</span>;
}

const iconButton = "text-admin-placeholder hover:text-brand-mid hover:bg-surface-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors";

export function ArticleTable({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [desc, setDesc] = useState(true);
  const [notice, setNotice] = useState<string>();
  const [pendingDelete, setPendingDelete] = useState<string>();

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => !q || a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
      .sort((a, b) => (desc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [articles, query, desc]);

  function demoDelete(title: string) {
    setPendingDelete(undefined);
    setNotice(`Mode tampilan: "${title}" tidak dihapus. Penghapusan aktif setelah database tersedia (Fase 2).`);
    window.setTimeout(() => setNotice(undefined), 5000);
  }

  const actions = (a: Article) => (
    <div className="flex items-center justify-end gap-1">
      <a href={`/blog/${a.slug}`} target="_blank" rel="noopener noreferrer" aria-label={`Lihat artikel ${a.title}`} title="Lihat di situs" className={iconButton}>
        <Eye size={18} />
      </a>
      <Link href={`/admin/blog/${a.slug}`} aria-label={`Edit artikel ${a.title}`} title="Edit" className={iconButton}>
        <Pencil size={18} />
      </Link>
      <button type="button" onClick={() => setPendingDelete(a.title)} aria-label={`Hapus artikel ${a.title}`} title="Hapus" className={iconButton}>
        <Trash2 size={18} />
      </button>
    </div>
  );

  return (
    <div className="min-w-0">
      <ConfirmDelete item={pendingDelete} noun="artikel" onCancel={() => setPendingDelete(undefined)} onConfirm={() => pendingDelete && demoDelete(pendingDelete)} />
      <label className="relative mb-6 block max-w-md">
        <span className="sr-only">Cari artikel</span>
        <Search size={18} className="text-admin-placeholder absolute top-1/2 left-5 -translate-y-1/2" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari judul atau kategori..."
          className="text-text placeholder:text-admin-placeholder ring-brand/40 min-h-12 w-full rounded-full bg-white pr-5 pl-12 text-base outline-none focus:ring-2"
        />
      </label>

      <div role="status" aria-live="polite">
        {notice && (
          <p className="bg-surface-2 text-brand-dark mb-4 flex items-start gap-3 rounded-2xl px-5 py-4 text-sm">
            <Info size={18} className="mt-0.5 shrink-0" /> {notice}
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-3xl bg-white">
        {/* Desktop: tabel */}
        <table className="hidden w-full text-left xl:table">
          <thead className="border-border border-b">
            <tr className="text-admin-placeholder text-xs font-semibold tracking-wider uppercase">
              <th scope="col" className="py-4 pr-4 pl-6">Judul</th>
              <th scope="col" className="px-4 py-4">Kategori</th>
              <th scope="col" className="hidden px-4 py-4 2xl:table-cell">Penulis</th>
              <th scope="col" className="px-4 py-4" aria-sort={desc ? "descending" : "ascending"}>
                <button type="button" onClick={() => setDesc((v) => !v)} className="hover:text-brand-mid inline-flex items-center gap-1 uppercase">
                  Tanggal Terbit {desc ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
                </button>
              </th>
              <th scope="col" className="px-4 py-4">Status</th>
              <th scope="col" className="py-4 pr-6 pl-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {rows.map((a) => (
              <tr key={a.slug} className="hover:bg-surface transition-colors">
                <td className="py-4 pr-4 pl-6">
                  <div className="flex items-center gap-4">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <Image src={a.img} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <div className="min-w-0">
                      <Link href={`/admin/blog/${a.slug}`} className="hover:text-brand-mid line-clamp-1 font-medium">
                        {a.title}
                      </Link>
                      <div className="text-admin-placeholder text-sm">{a.readMinutes} menit baca</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4"><CategoryBadge>{a.category}</CategoryBadge></td>
                <td className="text-admin-placeholder hidden px-4 py-4 whitespace-nowrap 2xl:table-cell">{AUTHOR}</td>
                <td className="text-admin-placeholder px-4 py-4 whitespace-nowrap">{formatArticleDate(a.date)}</td>
                <td className="px-4 py-4"><StatusBadge /></td>
                <td className="py-4 pr-6 pl-4">{actions(a)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile: kartu */}
        <ul className="divide-border divide-y xl:hidden">
          {rows.map((a) => (
            <li key={a.slug} className="p-5">
              <div className="flex gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <Image src={a.img} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <div className="min-w-0">
                  <Link href={`/admin/blog/${a.slug}`} className="hover:text-brand-mid line-clamp-2 font-medium">
                    {a.title}
                  </Link>
                  <div className="text-admin-placeholder mt-1 text-sm">
                    {formatArticleDate(a.date)} · {a.readMinutes} menit baca
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <CategoryBadge>{a.category}</CategoryBadge>
                  <StatusBadge />
                </div>
                {actions(a)}
              </div>
            </li>
          ))}
        </ul>

        {rows.length === 0 && <p className="text-admin-placeholder p-8 text-center">Tidak ada artikel yang cocok.</p>}
      </div>
    </div>
  );
}
