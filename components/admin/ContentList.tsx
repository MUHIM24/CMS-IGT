"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Info, Pencil, Trash2 } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";
import { Badge } from "@/components/admin/ui";

// Daftar konten serbaguna dashboard. Aksi per baris mengikuti IzinPro (referensi user):
// toggle tampil/sembunyi, duplikat, edit, hapus (pop-up konfirmasi).
// Tahap tampilan: toggle hanya berubah di layar ini; duplikat & hapus menampilkan notifikasi mode tampilan.
export interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  badges?: string[];
  image?: string;
  // cover untuk foto, contain untuk logo (supaya tidak terpotong)
  imageFit?: "cover" | "contain";
  avatar?: boolean;
  editHref?: string;
  active?: boolean;
}

const iconButton = "text-admin-placeholder hover:text-brand-mid hover:bg-surface-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors";

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      title={on ? "Tampil di situs" : "Disembunyikan"}
      onClick={onChange}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? "bg-brand-mid" : "bg-admin-field"}`}
    >
      <span className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
    </button>
  );
}

function AvatarPlaceholder() {
  return (
    <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <rect width="100" height="100" className="fill-surface-2" />
        <circle cx="50" cy="38" r="18" className="fill-brand" />
        <ellipse cx="50" cy="96" rx="36" ry="30" className="fill-brand" />
      </svg>
    </span>
  );
}

export function ContentList({ items, noun, withToggle = true, withDuplicate = true }: { items: ListItem[]; noun: string; withToggle?: boolean; withDuplicate?: boolean }) {
  const [active, setActive] = useState<Record<string, boolean>>(() => Object.fromEntries(items.map((i) => [i.id, i.active ?? true])));
  const [pendingDelete, setPendingDelete] = useState<string>();
  const [notice, setNotice] = useState<string>();

  function flash(text: string) {
    setNotice(text);
    window.setTimeout(() => setNotice(undefined), 5000);
  }

  // Satu pembungkus: kalau dikembalikan sebagai fragment, tiap elemen jadi sel grid sendiri saat dipakai di layout grid (bug halaman Klien)
  return (
    <div className="min-w-0">
      <ConfirmDelete
        item={pendingDelete}
        noun={noun}
        onCancel={() => setPendingDelete(undefined)}
        onConfirm={() => {
          flash(`Mode tampilan: "${pendingDelete}" tidak dihapus. Penghapusan aktif setelah database tersedia (Fase 2).`);
          setPendingDelete(undefined);
        }}
      />
      <div role="status" aria-live="polite">
        {notice && (
          <p className="bg-surface-2 text-brand-dark mb-4 flex items-start gap-3 rounded-2xl px-5 py-4 text-sm">
            <Info size={18} className="mt-0.5 shrink-0" /> {notice}
          </p>
        )}
      </div>
      <ul className="divide-border divide-y overflow-hidden rounded-3xl bg-white">
        {items.map((it) => (
          <li key={it.id} className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6 ${active[it.id] ? "" : "opacity-60"}`}>
            <div className="flex min-w-0 flex-1 items-center gap-4">
              {it.avatar ? (
                <AvatarPlaceholder />
              ) : it.image ? (
                <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={it.image} alt="" fill sizes="80px" className={it.imageFit === "contain" ? "object-contain p-1" : "object-cover"} />
                </span>
              ) : null}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{it.title}</span>
                  {it.badges?.map((b) => <Badge key={b}>{b}</Badge>)}
                  {!active[it.id] && <Badge tone="muted">Disembunyikan</Badge>}
                </div>
                {it.subtitle && <p className="text-muted mt-1 line-clamp-2 text-sm">{it.subtitle}</p>}
              </div>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-1">
              {withToggle && (
                <Toggle on={active[it.id]} label={`Tampilkan ${it.title} di situs`} onChange={() => setActive((s) => ({ ...s, [it.id]: !s[it.id] }))} />
              )}
              {withDuplicate && (
                <button type="button" onClick={() => flash(`Mode tampilan: "${it.title}" belum diduplikat. Aktif setelah database tersedia (Fase 2).`)} aria-label={`Duplikat ${it.title}`} title="Duplikat" className={`${iconButton} ml-2`}>
                  <Copy size={18} />
                </button>
              )}
              {it.editHref && (
                <Link href={it.editHref} aria-label={`Edit ${it.title}`} title="Edit" className={iconButton}>
                  <Pencil size={18} />
                </Link>
              )}
              <button type="button" onClick={() => setPendingDelete(it.title)} aria-label={`Hapus ${it.title}`} title="Hapus" className={iconButton}>
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
