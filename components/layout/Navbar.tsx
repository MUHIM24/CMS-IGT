"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

// "Tim" disembunyikan sementara — belum ada foto tim asli (lihat app/tim/page.tsx, biar gampang
// diaktifkan lagi: tambah balik { label: "Tim", href: "/tim" } begitu foto sudah tersedia).
const links = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const waLink = buildWhatsAppLink();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: transparent ? "transparent" : "rgba(7,28,38,0.96)",
        backdropFilter: transparent ? "none" : "blur(12px)",
        boxShadow: transparent ? "none" : "0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3">
            <Image src="/logo-icon.png" alt="PT Inovasi Gatarawana Teknologi logo" width={36} height={36} className="h-9 w-9 object-contain" priority />
            <div className="text-left">
              <div className="font-display text-base leading-tight font-bold tracking-tight text-white">
                PT Inovasi Gatarawana
              </div>
              <div className="text-brand-light text-xs font-semibold tracking-[0.15em] uppercase">Teknologi</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => {
              const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group relative text-base font-medium transition-colors duration-150 ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-px transition-all duration-200"
                    style={{ width: isActive ? "100%" : "0%", background: isActive ? "var(--color-accent)" : "var(--color-brand)" }}
                  />
                  {!isActive && (
                    <span className="bg-brand absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-200 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-accent-light active:scale-95 hidden items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:shadow-lg lg:flex"
          >
            Hubungi Kami
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            className="p-1.5 text-white lg:hidden"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-brand-deeper bg-brand-deeper flex flex-col gap-1 border-t px-6 py-5 lg:hidden">
          {links.map((l) => {
            const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block border-b border-white/5 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-[var(--color-accent)] py-3 text-center text-sm font-semibold text-white"
          >
            Hubungi Kami
          </a>
        </div>
      )}
    </header>
  );
}
