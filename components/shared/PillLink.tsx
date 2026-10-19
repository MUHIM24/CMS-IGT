import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons/figma-icons";

// Tombol pill "lihat selengkapnya": outline biru brand → terisi biru tua brand-mid saat hover (oranye ditolak user).
// Isi hover sengaja brand-mid, bukan brand: teks putih di brand cuma 3.40 (gagal AA), di brand-mid 8.92.
export function PillLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group border-brand text-brand-mid hover:bg-brand-mid hover:border-brand-mid inline-flex min-h-11 items-center gap-4 rounded-full border py-2 pr-2 pl-7 text-sm font-bold tracking-wider uppercase transition-colors duration-200 hover:text-white"
    >
      {children}
      <span className="bg-brand group-hover:text-brand-mid flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-200 group-hover:bg-white">
        <span className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5">
          <ArrowRight size={16} />
        </span>
      </span>
    </Link>
  );
}
