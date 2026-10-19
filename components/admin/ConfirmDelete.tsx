"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Pop-up konfirmasi hapus (permintaan user). Dipakai semua daftar di dashboard.
// Tombol Hapus pakai accent-text (#9A3412) dengan teks putih (6.27), bukan merah di luar palet.
export function ConfirmDelete({
  item,
  noun = "item",
  onCancel,
  onConfirm,
}: {
  item: string | undefined;
  noun?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={item !== undefined} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-3xl bg-white p-8 text-center ring-0 shadow-2xl data-[size=default]:max-w-md data-[size=default]:sm:max-w-md">
        <span className="bg-accent/10 text-accent-text mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Trash2 size={28} strokeWidth={1.75} />
        </span>
        <AlertDialogTitle className="text-text text-2xl font-bold">Hapus {noun}?</AlertDialogTitle>
        <AlertDialogDescription className="text-muted text-base leading-relaxed">
          <span className="text-text font-semibold">&ldquo;{item}&rdquo;</span> akan dihapus permanen. Tindakan ini tidak bisa
          dibatalkan.
        </AlertDialogDescription>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Tombol biasa: dialog dikendalikan dari luar (prop item), jadi penutupan eksplisit lewat onCancel */}
          <button
            type="button"
            onClick={onCancel}
            className="border-border text-text hover:border-brand-mid hover:text-brand-mid min-h-12 rounded-full border bg-white text-base font-semibold transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-accent-text hover:bg-brand-dark min-h-12 rounded-full text-base font-semibold text-white transition-colors"
          >
            Ya, Hapus
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
