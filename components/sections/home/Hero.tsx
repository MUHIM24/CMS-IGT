import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

const STATS = [
  { val: "8+", sub: "Tahun Pengalaman" },
  { val: "100+", sub: "Proyek Selesai" },
  { val: "40+", sub: "Klien Perusahaan" },
];

const PROGRESS_BARS = [
  { label: "Integrasi SLIK OJK", pct: 100, colorClass: "bg-brand" },
  { label: "Mobile LOS", pct: 87, colorClass: "bg-brand-light" },
  { label: "Aplikasi Mobile CMO", pct: 74, colorClass: "bg-accent" },
];

export function Hero() {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #67BED9 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />
      <div className="bg-brand absolute top-1/3 right-0 h-[480px] w-[480px] rounded-full opacity-10 blur-3xl" />
      <div className="bg-brand-light absolute bottom-0 left-1/4 h-64 w-64 rounded-full opacity-[0.08] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="order-2 lg:order-1">
            <div className="bg-brand/10 mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
              <span className="text-brand-light text-sm font-bold tracking-widest uppercase">
                Web Apps &middot; Core Finance &middot; Mobile Apps &middot; CMS
              </span>
            </div>
            <h1 className="font-display mb-6 text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-[52px]">
              Mengubah Ide Menjadi <span className="gradient-text">Inovasi</span> Digital
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              PT Inovasi Gatarawana Teknologi menghadirkan perangkat lunak enterprise, sistem core
              multifinance, dan aplikasi mobile yang dirancang untuk kebutuhan bisnis pembiayaan
              Indonesia, presisi, patuh regulasi, dan siap skala.
            </p>
            <div className="flex flex-col gap-3.5 sm:flex-row">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-accent-light flex min-h-11 items-center justify-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-8 py-4 text-sm font-bold tracking-wide text-white transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
              >
                Konsultasi Gratis
                <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                  <ArrowRight />
                </span>
              </a>
              <Link
                href="/layanan"
                className="border-brand/30 text-brand-light hover:bg-brand/10 hover:border-brand flex min-h-11 items-center justify-center gap-2 rounded-xl border px-8 py-4 text-sm font-semibold transition-all duration-200"
              >
                Lihat Layanan
              </Link>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-10">
              {STATS.map((s) => (
                <div key={s.sub}>
                  <div className="font-display mb-1 text-2xl leading-none font-black text-white sm:text-3xl">{s.val}</div>
                  <div className="text-brand-light/60 text-sm font-medium sm:text-xs">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative w-full max-w-[400px]">
              <div className="animate-float relative z-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">
                <Image
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=520&h=280&fit=crop&auto=format"
                  alt="Software development team at work"
                  width={520}
                  height={280}
                  className="mb-5 h-44 w-full rounded-xl bg-slate-800 object-cover"
                />
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white">Core Finance System</span>
                  <span className="bg-brand/20 text-brand-light rounded-md px-2.5 py-1 text-xs font-bold">Produksi</span>
                </div>
                <div className="space-y-2.5">
                  {PROGRESS_BARS.map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-1 flex justify-between">
                        <span className="text-sm text-white/60">{bar.label}</span>
                        <span className="text-sm text-white/40">{bar.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06]">
                        <div className={`h-1.5 rounded-full ${bar.colorClass}`} style={{ width: `${bar.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="font-display absolute -top-3 -left-5 z-20 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-base font-bold text-white shadow-xl">
                Patuh OJK
              </div>
              <div className="bg-brand-mid border-brand/40 absolute -right-3 -bottom-4 z-20 rounded-xl border px-4 py-3 shadow-xl">
                <div className="text-brand-light mb-0.5 text-xs font-bold tracking-wider uppercase">Uptime Sistem</div>
                <div className="font-display text-xl leading-none font-black text-white">99.9%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="text-xs font-bold tracking-[0.2em] text-white/20 uppercase">Gulir</div>
        <div className="h-10 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </div> */}
    </section>
  );
}
