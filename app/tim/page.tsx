import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/SectionLabel";

export const metadata: Metadata = {
  title: "Tim | PT Inovasi Gatarawana Teknologi",
  description: "Tim engineer, arsitek sistem, dan konsultan PT Inovasi Gatarawana Teknologi.",
};

const ROLES = [
  { title: "Direktur Utama", init: "DU", note: "Strategi & Pengembangan Bisnis" },
  { title: "Direktur Teknologi", init: "DT", note: "Arsitektur Sistem & Riset" },
  { title: "Kepala Rekayasa", init: "KR", note: "Pengiriman Proyek & Jaminan Kualitas" },
  { title: "Pimpinan Solusi Fintech", init: "SF", note: "Kepatuhan OJK & Sistem Multifinance" },
];

export default function TimPage() {
  return (
    <section className="bg-surface pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Tim Kami</SectionLabel>
          <h2 className="font-display text-text mb-4 text-3xl font-bold sm:text-4xl">Dipimpin oleh Para Praktisi</h2>
          <p className="text-muted mx-auto max-w-lg text-base">
            Tim kami terdiri dari engineer, arsitek sistem, dan konsultan dengan pengalaman nyata
            di industri keuangan dan teknologi enterprise Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((r) => (
            <div
              key={r.title}
              className="group border-border hover:border-brand/50 hover:shadow-brand/[0.1] rounded-2xl border bg-white p-7 text-center transition-all duration-200 hover:shadow-lg"
            >
              <div className="from-brand to-brand-mid font-display mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-xl font-black text-white transition-transform duration-200 group-hover:scale-105">
                {r.init}
              </div>
              <div className="font-display text-text mb-1 text-sm font-bold">{r.title}</div>
              <div className="text-brand text-xs">{r.note}</div>
            </div>
          ))}
        </div>
        <p className="text-muted mt-6 text-center text-sm">Profil lengkap tim tersedia atas permintaan.</p>
      </div>
    </section>
  );
}
