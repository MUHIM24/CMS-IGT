// Gaya tombol ajakan (CTA) bersama, supaya semua tombol seragam:
// pill, 16px, DM Sans (font-display) tebal tanpa tracking lebar (keputusan user 2026-10-20, opsi B),
// hover: naik 2px + bayangan oranye lembut, panah bergeser 4px. Gerak dimatikan untuk "kurangi animasi".
// Sengaja TANPA utility display (flex/hidden) supaya tiap pemakai bebas atur, mis. "hidden lg:flex".

export const ctaPrimaryClass =
  "group font-display hover:bg-accent-light items-center justify-center gap-2.5 rounded-full bg-[var(--color-accent)] text-base font-bold text-brand-dark transition-all duration-200 hover:shadow-lg hover:shadow-accent/30 motion-safe:hover:-translate-y-0.5 active:scale-[0.98]";

// Tombol outline di latar gelap (Hero, CTA Banner)
export const ctaOutlineOnDarkClass =
  "font-display border-brand/30 text-brand-light hover:bg-brand/10 hover:border-brand items-center justify-center gap-2.5 rounded-full border text-base font-bold transition-all duration-200";

// Bungkus ikon panah di dalam tombol CTA
export const ctaArrowClass = "transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1";
