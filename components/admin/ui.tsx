import type { LucideIcon } from "lucide-react";

// Komponen dasar dashboard, gaya mengikuti referensi BuildWithAngga (judul besar tebal, kartu putih
// sudut besar, input pill abu-abu tinggi, tombol pill solid), warna palet PT IGT.

export const inputClass =
  "bg-admin-field text-text placeholder:text-admin-placeholder min-h-14 w-full rounded-full px-6 text-base outline-none ring-brand/40 transition focus:ring-2 disabled:opacity-60";
export const textareaClass =
  "bg-admin-field text-text placeholder:text-admin-placeholder w-full rounded-3xl px-6 py-4 text-base leading-relaxed outline-none ring-brand/40 transition focus:ring-2";
export const primaryButtonClass =
  "bg-brand-mid hover:bg-brand-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold text-white transition-colors duration-200 disabled:opacity-60";
export const secondaryButtonClass =
  "border-border text-text hover:border-brand-mid hover:text-brand-mid inline-flex min-h-11 items-center justify-center gap-2 rounded-full border bg-white px-5 text-sm font-semibold transition-colors duration-200";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        {subtitle && <p className="text-muted mt-2 text-base">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-white p-6 sm:p-8 ${className}`}>{children}</div>;
}

// Kartu statistik solid (referensi user): latar brand-mid, lingkaran atas oranye SOLID (oranye transparan di atas biru
// terlihat kotor/abu, ditolak user), lingkaran bawah biru gelap, kotak ikon gelap, angka besar.
// Teks putih di brand-mid 8.92; label white/80 tetap > 4.5. Tanpa badge tren karena belum ada data pembanding.
export function StatCard({ icon: Icon, value, label }: { icon: LucideIcon; value: number | string; label: string }) {
  return (
    <div className="bg-brand-mid relative overflow-hidden rounded-3xl p-6 text-white">
      <span aria-hidden="true" className="bg-accent absolute -top-12 -right-12 h-40 w-40 rounded-full" />
      <span aria-hidden="true" className="bg-brand-dark/25 absolute -right-6 -bottom-16 h-32 w-32 rounded-full" />
      <span className="bg-brand-dark/70 relative flex h-14 w-14 items-center justify-center rounded-2xl">
        <Icon size={26} strokeWidth={1.75} />
      </span>
      <div className="relative mt-5 text-4xl font-bold">{value}</div>
      <div className="relative mt-1 text-base text-white/80">{label}</div>
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-3 block text-base font-medium">
        {label} {hint && <span className="text-muted text-sm font-normal">({hint})</span>}
      </span>
      {children}
    </label>
  );
}

export function Badge({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "success" | "muted" }) {
  const tones = {
    brand: "bg-brand/10 text-brand-mid",
    success: "bg-brand-light/20 text-brand-dark",
    muted: "bg-surface-2 text-muted",
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
