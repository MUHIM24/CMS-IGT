"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon, WhatsAppIcon } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

// Tombol mengambang kanan bawah: kembali ke atas (muncul setelah scroll) + chat WhatsApp.
// WA pakai biru brand, ikon putih 3.40 (lolos 3:1 untuk ikon).
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        tabIndex={showTop ? 0 : -1}
        className={`text-brand-mid border-border flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${
          showTop ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUpIcon />
      </button>
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="bg-brand shadow-brand/40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <WhatsAppIcon size={28} />
      </a>
    </div>
  );
}
