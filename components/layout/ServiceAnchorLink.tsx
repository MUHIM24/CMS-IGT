"use client";

import Link from "next/link";
import { SERVICE_ANCHOR_EVENT } from "@/lib/content/services";

// Link ke kartu layanan di /layanan. Next Link mengganti hash lewat pushState (tanpa event hashchange),
// jadi setelah klik dikirim event sendiri supaya ServiceCatalog bisa membuka filter "Semua" lalu scroll ke kartunya.
export function ServiceAnchorLink({ anchor, className, children }: { anchor: string; className?: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/layanan#${anchor}`}
      className={className}
      onClick={() => window.setTimeout(() => window.dispatchEvent(new CustomEvent(SERVICE_ANCHOR_EVENT, { detail: anchor })), 0)}
    >
      {children}
    </Link>
  );
}
