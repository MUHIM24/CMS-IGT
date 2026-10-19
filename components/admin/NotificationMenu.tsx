"use client";

import { Bell, BellOff } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Notifikasi (pola IzinPro). Belum ada sumber notifikasi (komentar/kontak masuk butuh database),
// jadi tampil kosong dengan keterangan jujur, bukan notifikasi karangan.
export function NotificationMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Notifikasi"
        className="text-text hover:text-brand-mid data-popup-open:text-brand-mid flex h-11 w-11 items-center justify-center rounded-full bg-white transition-colors"
      >
        <Bell size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="border-border w-80 max-w-[calc(100vw-2rem)] rounded-2xl border bg-white p-0 shadow-xl ring-0">
        <div className="border-border border-b px-5 py-4 font-semibold">Notifikasi</div>
        <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
          <span className="bg-surface-2 text-brand-mid flex h-14 w-14 items-center justify-center rounded-full">
            <BellOff size={24} strokeWidth={1.75} />
          </span>
          <p className="font-medium">Belum ada notifikasi</p>
          <p className="text-muted text-sm">Komentar dan pesan kontak baru akan muncul di sini setelah database aktif.</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
