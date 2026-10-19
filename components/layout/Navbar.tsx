"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";
import { ctaPrimaryClass } from "@/components/shared/button-styles";

// "Tim" disembunyikan sementara — belum ada foto tim asli (lihat app/tim/page.tsx, biar gampang
// diaktifkan lagi: tambah balik { label: "Tim", href: "/tim" } begitu foto sudah tersedia).
const links = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
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

  // Menu mobile terbuka: kunci scroll halaman di belakang, Escape menutup
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
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
              <Image src="/logo-icon.png" alt="PT Inovasi Gantarawana Teknologi logo" width={36} height={36} className="h-9 w-9 object-contain" priority />
              <div className="text-left">
                <div className="font-display text-base leading-tight font-bold tracking-tight text-white">
                  PT Inovasi Gantarawana
                </div>
                <div className="text-brand-light text-xs font-semibold tracking-[0.15em] uppercase">Teknologi</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
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
              className={`${ctaPrimaryClass} hidden px-5 py-2.5 lg:flex`}
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
              <MenuIcon />
            </button>
          </div>
        </div>

      </header>
      {/* Menu mobile: panel putih geser dari kiri + latar gelap. Panel bisa di-scroll (scrollbar brand dari globals.css) */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Tutup menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={`bg-brand-deeper/60 absolute inset-0 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          aria-label="Menu utama"
          className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-border flex h-[72px] shrink-0 items-center justify-between border-b bg-white px-6">
            {/* Panel putih seluruhnya (keputusan user): logo teks gelap, TEKNOLOGI brand-mid (brand-light terlalu pucat di putih) */}
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <Image src="/logo-icon.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
              <span className="text-left">
                <span className="font-display text-text block text-base leading-tight font-bold tracking-tight">PT Inovasi Gantarawana</span>
                <span className="text-brand-mid block text-xs font-semibold tracking-[0.15em] uppercase">Teknologi</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="text-brand-dark -mr-2 flex h-11 w-11 items-center justify-center"
            >
              <XIcon />
            </button>
          </div>

          <div className="flex flex-1 flex-col px-6 py-6">
            <ul className="space-y-1">
              {links.map((l) => {
                const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-12 items-center text-xl font-medium transition-colors ${
                        isActive ? "text-brand-mid font-semibold" : "text-brand-dark hover:text-brand-mid"
                      }`}
                    >
                      {isActive && <span className="bg-accent mr-3 h-5 w-1 rounded-full" aria-hidden="true" />}
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`${ctaPrimaryClass} mt-8 flex min-h-12`}
            >
              Hubungi Kami
            </a>

            <p className="text-muted mt-auto pt-8 text-sm">
              &copy; {new Date().getFullYear()} PT Inovasi Gantarawana Teknologi
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
