"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { primaryButtonClass } from "@/components/admin/ui";

// Form tahap tampilan: belum ada database, jadi submit TIDAK menyimpan apa pun.
// Pengguna diberi tahu terus terang lewat notifikasi, supaya tidak mengira datanya tersimpan.
export function DemoForm({
  children,
  submitLabel = "Simpan Perubahan",
  fullWidthSubmit = false,
}: {
  children: React.ReactNode;
  submitLabel?: string;
  fullWidthSubmit?: boolean;
}) {
  const [notice, setNotice] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setNotice(true);
        window.setTimeout(() => setNotice(false), 5000);
      }}
      className="space-y-6"
    >
      {children}
      <button type="submit" className={`${primaryButtonClass} ${fullWidthSubmit ? "w-full" : ""}`}>
        {submitLabel}
      </button>
      <div role="status" aria-live="polite">
        {notice && (
          <p className="bg-surface-2 text-brand-dark flex items-start gap-3 rounded-2xl px-5 py-4 text-sm">
            <Info size={18} className="mt-0.5 shrink-0" />
            Mode tampilan: perubahan belum disimpan. Penyimpanan data aktif setelah database tersedia (Fase 2).
          </p>
        )}
      </div>
    </form>
  );
}
