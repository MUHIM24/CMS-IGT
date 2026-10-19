"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Link2, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { inputClass, secondaryButtonClass } from "@/components/admin/ui";

const MAX_MB = 2;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

// Upload gambar (tahap tampilan): drag & drop / pilih file / tempel URL, pratinjau, validasi tipe & ukuran.
// Belum ada storage: file HANYA dipratinjau di browser (object URL), tidak dikirim ke server.
export function ImageUpload({ name, defaultUrl, label = "Gambar Utama" }: { name: string; defaultUrl?: string; label?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(defaultUrl);
  const [fileName, setFileName] = useState<string>();
  const [error, setError] = useState<string>();
  const [dragging, setDragging] = useState(false);
  const [mode, setMode] = useState<"file" | "url">("file");

  // bebaskan memori object URL lama
  useEffect(() => () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  function accept(file: File | undefined) {
    if (!file) return;
    if (!ACCEPT.includes(file.type)) return setError("Format harus JPG, PNG, atau WebP.");
    if (file.size > MAX_MB * 1024 * 1024) return setError(`Ukuran maksimal ${MAX_MB} MB.`);
    setError(undefined);
    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
  }

  function clear() {
    setPreview(undefined);
    setFileName(undefined);
    setError(undefined);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-base font-medium">{label}</span>
        <div className="bg-admin-field flex rounded-full p-1 text-sm" role="group" aria-label="Sumber gambar">
          {(["file", "url"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`flex min-h-9 items-center gap-1.5 rounded-full px-4 font-medium transition-colors ${
                mode === m ? "text-brand-mid bg-white shadow-sm" : "text-admin-placeholder hover:text-text"
              }`}
            >
              {m === "file" ? <UploadCloud size={16} /> : <Link2 size={16} />}
              {m === "file" ? "Upload" : "URL"}
            </button>
          ))}
        </div>
      </div>

      {mode === "url" ? (
        <input
          type="url"
          name={name}
          defaultValue={defaultUrl}
          onChange={(e) => setPreview(e.target.value || undefined)}
          className={inputClass}
          placeholder="https://..."
        />
      ) : preview ? (
        <div className="border-border overflow-hidden rounded-3xl border">
          {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau blob/URL bebas, bukan aset situs */}
          <img src={preview} alt="Pratinjau gambar" className="aspect-[16/9] w-full bg-slate-100 object-cover" />
          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <span className="text-muted min-w-0 truncate text-sm">{fileName ?? "Gambar saat ini"}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className={secondaryButtonClass}>
                <RefreshCw size={16} /> Ganti
              </button>
              <button type="button" onClick={clear} className={secondaryButtonClass}>
                <Trash2 size={16} /> Hapus
              </button>
            </div>
          </div>
        </div>
      ) : (
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
            accept(e.dataTransfer.files[0]);
          }}
          className={`flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragging ? "border-brand bg-surface-2" : "border-border bg-admin-field hover:border-brand-mid"
          }`}
        >
          <span className="text-brand-mid flex h-14 w-14 items-center justify-center rounded-full bg-white">
            <ImagePlus size={26} strokeWidth={1.75} />
          </span>
          <span className="text-base font-semibold">Seret gambar ke sini atau klik untuk memilih</span>
          <span className="text-admin-placeholder text-sm">JPG, PNG, atau WebP · maks. {MAX_MB} MB · disarankan 1200×675 px</span>
        </button>
      )}

      <input ref={inputRef} type="file" accept={ACCEPT.join(",")} className="sr-only" tabIndex={-1} onChange={(e) => accept(e.target.files?.[0])} />
      <div role="alert" aria-live="polite" className="mt-2 text-sm">
        {error && <p className="text-accent-text font-medium">{error}</p>}
      </div>
      <p className="text-admin-placeholder text-xs">Mode tampilan: gambar hanya dipratinjau di browser, belum diunggah ke server.</p>
    </div>
  );
}
