"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DemoForm } from "@/components/admin/DemoForm";
import { Field, inputClass, secondaryButtonClass, textareaClass } from "@/components/admin/ui";
import type { MediaItem } from "@/components/admin/MediaLibrary";

// Detail media (pola IzinPro): pratinjau besar + metadata yang bisa diedit (judul, alt, keterangan) + info file.
// Tahap tampilan: Simpan lewat DemoForm (tidak menyimpan apa pun sampai database tersedia).

function sourceLabel(url: string) {
  if (url.startsWith("blob:")) return "Upload baru (pratinjau)";
  if (url.includes("images.unsplash.com")) return "Unsplash";
  return "File lokal situs";
}

function formatLabel(m: MediaItem) {
  const fromName = m.name.split(".").pop();
  if (fromName && fromName !== m.name && fromName.length <= 4) return fromName.toUpperCase();
  return m.url.includes("images.unsplash.com") ? "JPG (Unsplash)" : "-";
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// URL lengkap untuk disalin: path lokal ("/clients/...") diberi origin situs
function absoluteUrl(url: string) {
  return url.startsWith("/") ? `${window.location.origin}${url}` : url;
}

export function MediaDetailDialog({
  item,
  onClose,
  onDelete,
}: {
  item: MediaItem | undefined;
  onClose: () => void;
  onDelete: (item: MediaItem) => void;
}) {
  return (
    <Dialog open={item !== undefined} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl gap-0 overflow-y-auto rounded-3xl bg-white p-0 ring-0 shadow-2xl sm:max-w-5xl">
        <DialogTitle className="sr-only">Detail media</DialogTitle>
        {/* key: form & dimensi direset tiap ganti gambar */}
        {item && <MediaDetail key={item.url} item={item} onDelete={onDelete} />}
      </DialogContent>
    </Dialog>
  );
}

function MediaDetail({ item, onDelete }: { item: MediaItem; onDelete: (item: MediaItem) => void }) {
  const [dimensions, setDimensions] = useState<string>();
  const [copied, setCopied] = useState(false);
  const isLogo = item.kind === "Logo";

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(absoluteUrl(item.url));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard ditolak browser: kolom URL di bawah tetap bisa diseleksi manual
    }
  }

  const info = [
    { label: "Nama file", value: item.name },
    { label: "Jenis", value: item.kind },
    { label: "Format", value: formatLabel(item) },
    { label: "Dimensi asli", value: dimensions ?? "Memuat..." },
    ...(item.sizeBytes ? [{ label: "Ukuran", value: formatSize(item.sizeBytes) }] : []),
    { label: "Sumber", value: sourceLabel(item.url) },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
      <div className={`flex min-h-64 items-center justify-center p-6 lg:min-h-[32rem] ${isLogo ? "bg-white" : "bg-admin-bg"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau media bebas (termasuk blob upload) */}
        <img
          src={item.url}
          alt={item.alt}
          onLoad={(e) => setDimensions(`${e.currentTarget.naturalWidth} × ${e.currentTarget.naturalHeight} px`)}
          className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain"
        />
      </div>

      <div className="border-border space-y-6 border-t p-6 sm:p-8 lg:border-t-0 lg:border-l">
        <div>
          <h2 className="pr-8 text-xl font-bold [overflow-wrap:anywhere] sm:text-2xl">{item.name}</h2>
          <p className="text-admin-placeholder mt-1 text-sm">Klik di luar atau tekan Esc untuk menutup.</p>
        </div>

        <DemoForm submitLabel="Simpan Detail" fullWidthSubmit>
          <Field label="Judul" hint="nama yang mudah dicari di Media Library">
            <input name="title" defaultValue={item.title} required className={inputClass} />
          </Field>
          <Field label="Alt text" hint="deskripsi gambar untuk SEO & pembaca layar">
            <textarea name="alt" defaultValue={item.alt} rows={2} className={textareaClass} placeholder="Contoh: Tim berdiskusi di depan laptop" />
          </Field>
          <Field label="Keterangan" hint="opsional, caption di bawah gambar">
            <textarea name="caption" rows={2} className={textareaClass} placeholder="Keterangan singkat gambar" />
          </Field>
        </DemoForm>

        <dl className="bg-admin-bg grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-3xl p-5 text-sm">
          {info.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-admin-placeholder">{row.label}</dt>
              <dd className="min-w-0 font-medium break-all">{row.value}</dd>
            </div>
          ))}
          <dt className="text-admin-placeholder">Dipakai di</dt>
          <dd className="min-w-0 font-medium">
            <ul className="space-y-1">
              {item.usedIn.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </dd>
        </dl>

        <div>
          <label htmlFor="media-url" className="text-admin-placeholder mb-2 block text-sm">
            URL file
          </label>
          <input id="media-url" readOnly value={item.url} onFocus={(e) => e.currentTarget.select()} className={`${inputClass} min-h-12 text-sm`} />
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={copyUrl} className={secondaryButtonClass}>
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Tersalin" : "Salin URL"}
          </button>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={secondaryButtonClass}>
            <ExternalLink size={16} /> Buka ukuran penuh
          </a>
          <button type="button" onClick={() => onDelete(item)} className={`${secondaryButtonClass} hover:border-accent-text hover:text-accent-text`}>
            <Trash2 size={16} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
