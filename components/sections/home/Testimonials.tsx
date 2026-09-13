"use client";

import { useRef, useState } from "react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/figma-icons";

const TESTIMONIALS = [
  {
    quote:
      "Sistem multifinance yang dibangun tim IGT berhasil mengotomatisasi proses verifikasi SLIK OJK yang sebelumnya memakan waktu 2-3 hari menjadi kurang dari 5 menit. Dampaknya langsung terasa pada kecepatan approval kredit kami.",
    name: "Manajer Teknologi",
    org: "Perusahaan Pembiayaan Konsumen",
  },
  {
    quote:
      "Aplikasi mobile CMO yang mereka kembangkan secara signifikan meningkatkan efisiensi tim lapangan kami. Sinkronisasi data real-time ke sistem core berjalan stabil bahkan di koneksi jaringan terbatas.",
    name: "Kepala Operasional",
    org: "Lembaga Keuangan Regional",
  },
  {
    quote:
      "Kami menghargai pendekatan profesional IGT dalam memahami kebutuhan regulasi OJK kami. Tim mereka tidak hanya membangun sistem, tetapi juga memastikan kesiapan audit dari hari pertama go-live.",
    name: "Direktur Kepatuhan",
    org: "Perusahaan Leasing",
  },
  {
    quote:
      "Tim IGT membantu kami migrasi sistem lama ke platform yang lebih modern tanpa mengganggu operasional harian. Prosesnya terencana dan komunikasinya jelas dari awal sampai akhir.",
    name: "Kepala IT",
    org: "Perusahaan Pembiayaan",
  },
  {
    quote:
      "Aplikasi Mobile Approval mempercepat proses persetujuan kredit di internal kami. Approval yang dulu butuh berhari-hari sekarang bisa selesai dalam hitungan jam.",
    name: "Manajer Kredit",
    org: "Perusahaan Leasing Regional",
  },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToIndex(i: number) {
    const scroller = scrollerRef.current;
    const card = scroller?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(i);
  }

  const prev = () => scrollToIndex(Math.max(active - 1, 0));
  const next = () => scrollToIndex(Math.min(active + 1, TESTIMONIALS.length - 1));

  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Testimoni</SectionLabel>
          <h2 className="font-display text-text mb-3 text-3xl font-bold sm:text-4xl">Apa Kata Klien Kami</h2>
          <p className="text-muted text-xs">
            Konten di bawah adalah sampel, kutipan aktual tersedia atas permintaan dengan seizin klien.
          </p>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="border-border hover:border-brand/40 hover:shadow-brand/[0.08] flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border bg-white p-6 transition-all duration-200 hover:shadow-lg sm:w-[47%] lg:w-[31%]"
            >
              <div className="text-accent mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-muted mb-6 flex-1 text-sm leading-relaxed">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="from-brand to-brand-mid font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white">
                  {initialsOf(t.name)}
                </div>
                <div>
                  <div className="font-display text-text text-sm font-bold">{t.name}</div>
                  <div className="text-muted mt-0.5 text-xs">{t.org}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Testimoni sebelumnya"
            onClick={prev}
            disabled={active === 0}
            className="border-border text-muted hover:border-brand hover:text-brand flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeftIcon />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Lihat testimoni ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === active ? "bg-brand h-2.5 w-2.5" : "bg-border h-2 w-2"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Testimoni berikutnya"
            onClick={next}
            disabled={active === TESTIMONIALS.length - 1}
            className="border-border text-muted hover:border-brand hover:text-brand flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
