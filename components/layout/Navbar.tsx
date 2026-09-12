"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/lib/content/site-settings";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/layanan", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-brand-dark sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-icon.png"
            alt=""
            width={36}
            height={37}
            className="shrink-0 rounded-md"
          />
          <span className="font-display truncate text-sm font-bold text-white sm:hidden">
            PT IGT
          </span>
          <span className="font-display hidden truncate text-sm font-bold text-white sm:inline">
            {siteSettings.companyName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-md text-xl text-white lg:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
