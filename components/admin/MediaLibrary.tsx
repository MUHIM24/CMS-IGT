"use client";

import { useRef, useState } from "react";
import { Check, Copy, ImagePlus, Info, Trash2 } from "lucide-react";
import { ConfirmDelete } from "@/components/admin/ConfirmDelete";

// Media Library (pola IzinPro): galeri semua gambar yang dipakai situs + upload.
// Tahap tampilan: upload hanya pratinjau di browser; hapus lewat konfirmasi lalu notifikasi mode tampilan.
export interface MediaItem {
  url: string;
  name: string;
  kind: "Foto" | "Logo";
  usedIn: string;
}

const FILTERS = ["Semua", "Foto", "Logo"] as const;
const MAX_MB = 2;

export function MediaLibrary({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Semua");
  const [uploads, setUploads] = useState<MediaItem[]>([]);
  const [copied, setCopied] = useState<string>();
  const [pendingDelete, setPendingDelete] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const all = [...uploads, ...items];
  const visible = filter === "Semua" ? all : all.filter((m) => m.kind === filter);

  function flash(text: string) {
    setNotice(text);
    window.setTimeout(() => setNotice(undefined), 5000);
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    const accepted = [...files].filter((f) => f.type.startsWith("image/") && f.size <= MAX_MB * 1024 * 1024);
    if (accepted.length < files.length) flash(`Sebagian file dilewati: hanya gambar maks. ${MAX_MB} MB.`);
    setUploads((u) => [
      ...accepted.map((f) => ({ url: URL.createObjectURL(f), name: f.name, kind: "Foto" as const, usedIn: "Baru diunggah (pratinjau, belum tersimpan)" })),
      ...u,
    ]);
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      window.setTimeout(() => setCopied(undefined), 1500);
    } catch {
      flash("Gagal menyalin URL. Salin manual dari kolom alamat gambar.");
    }
  }

  return (
    <>
      <ConfirmDelete
        item={pendingDelete}
        noun="gambar"
        onCancel={() => setPendingDelete(undefined)}
        onConfirm={() => {
          flash(`Mode tampilan: "${pendingDelete}" tidak dihapus. Penghapusan aktif setelah storage tersedia (Fase 2).`);
          setPendingDelete(undefined);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`mb-6 flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging ? "border-brand bg-surface-2" : "border-border hover:border-brand-mid bg-white"
        }`}
      >
        <span className="bg-surface-2 text-brand-mid flex h-14 w-14 items-center justify-center rounded-full">
          <ImagePlus size={26} strokeWidth={1.75} />
        </span>
        <span className="text-base font-semibold">Seret gambar ke sini atau klik untuk mengunggah</span>
        <span className="text-admin-placeholder text-sm">Bisa beberapa file sekaligus · JPG, PNG, WebP, SVG · maks. {MAX_MB} MB per file</span>
      </button>
      <input ref={inputRef} type="file" accept="image/*" multiple className="sr-only" tabIndex={-1} onChange={(e) => addFiles(e.target.files)} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="bg-admin-field inline-flex rounded-full p-1" role="group" aria-label="Filter jenis media">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-10 rounded-full px-4 text-sm font-medium transition-colors ${filter === f ? "text-brand-mid bg-white shadow-sm" : "text-admin-placeholder hover:text-text"}`}
            >
              {f} ({f === "Semua" ? all.length : all.filter((m) => m.kind === f).length})
            </button>
          ))}
        </div>
        <span className="text-admin-placeholder text-sm">Upload hanya pratinjau di browser, belum tersimpan ke server.</span>
      </div>

      <div role="status" aria-live="polite">
        {notice && (
          <p className="bg-surface-2 text-brand-dark mb-4 flex items-start gap-3 rounded-2xl px-5 py-4 text-sm">
            <Info size={18} className="mt-0.5 shrink-0" /> {notice}
          </p>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {visible.map((m) => (
          <li key={m.url} className="overflow-hidden rounded-3xl bg-white">
            <div className={`aspect-[4/3] ${m.kind === "Logo" ? "bg-white p-6" : "bg-slate-100"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau media bebas (termasuk blob upload) */}
              <img src={m.url} alt={m.name} loading="lazy" className={`h-full w-full ${m.kind === "Logo" ? "object-contain" : "object-cover"}`} />
            </div>
            <div className="p-4">
              <div className="truncate text-sm font-semibold" title={m.name}>{m.name}</div>
              <div className="text-admin-placeholder mt-0.5 truncate text-xs" title={m.usedIn}>{m.usedIn}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="bg-admin-field rounded-full px-3 py-1 text-xs font-medium">{m.kind}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => copy(m.url)}
                    aria-label={`Salin URL ${m.name}`}
                    title="Salin URL"
                    className="text-admin-placeholder hover:text-brand-mid hover:bg-surface-2 flex h-10 w-10 items-center justify-center rounded-full"
                  >
                    {copied === m.url ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(m.name)}
                    aria-label={`Hapus ${m.name}`}
                    title="Hapus"
                    className="text-admin-placeholder hover:text-brand-mid hover:bg-surface-2 flex h-10 w-10 items-center justify-center rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
