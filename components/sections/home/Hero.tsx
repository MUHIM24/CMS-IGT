import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowRight, CheckIcon } from "@/components/icons/figma-icons";
import { companyFacts } from "@/lib/content/company-facts";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

// Tahapan alur kredit yang memang dicakup sistem LOS yang sudah berjalan
const LOAN_FLOW = ["Registrasi & input CMO", "Cek SLIK OJK & scoring", "Analisa CA & survei", "Komite approval & pencairan"];

export function Hero() {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #67BED9 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />
      <div className="bg-brand absolute top-1/3 right-0 h-[480px] w-[480px] rounded-full opacity-10 blur-3xl" />
      <div className="bg-brand-light absolute bottom-0 left-1/4 h-64 w-64 rounded-full opacity-[0.08] blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20 lg:px-10 lg:pb-36">
        {/* Mobile: teks → poin keunggulan → tombol → visual. Desktop: semua teks di kiri, visual di kanan */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-x-10">
          <div className="lg:self-center">
            <h1 className="font-display mb-6 text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-[52px]">
              Mengubah Ide Menjadi <span className="gradient-text-on-dark">Inovasi</span> Digital
            </h1>
            <p className="mb-10 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              PT Inovasi Gantarawana Teknologi menghadirkan perangkat lunak enterprise, sistem core
              multifinance, dan aplikasi mobile yang dirancang untuk kebutuhan bisnis pembiayaan
              Indonesia, presisi, patuh regulasi, dan siap skala.
            </p>
            {/* Mobile: ikon di samping teks, 1 kolom. sm+: 3 kolom, ikon di atas teks biar gak patah baris */}
            <ul className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
              {companyFacts.map(({ Icon, title, sub }) => (
                <li key={title} className="flex items-center gap-3.5 sm:flex-col sm:items-start sm:gap-3">
                  <div className="text-brand-light flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04]">
                    <Icon />
                  </div>
                  <div className="leading-tight">
                    <div className="font-display text-lg font-bold text-white">{title}</div>
                    <div className="text-sm text-white/60">{sub}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3.5 sm:flex-row">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-accent-light flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-[var(--color-accent)] px-8 py-4 text-base font-bold tracking-wide text-brand-dark transition-all duration-200 hover:shadow-accent/30 hover:shadow-lg motion-safe:hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Konsultasi Gratis
                <span className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1">
                  <ArrowRight />
                </span>
              </a>
              <Link
                href="/layanan"
                className="border-brand/30 text-brand-light hover:bg-brand/10 hover:border-brand flex min-h-11 items-center justify-center gap-2 rounded-full border px-8 py-4 text-base font-semibold transition-all duration-200"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end lg:self-center">
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
                <ol className="space-y-2.5">
                  {LOAN_FLOW.map((step) => (
                    <li key={step} className="flex items-center gap-2.5 text-sm text-white/70">
                      <span className="bg-brand/20 text-brand-light flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <CheckIcon />
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="font-display absolute -top-3 -left-5 z-20 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-base font-bold text-brand-dark shadow-xl">
                Patuh OJK
              </div>
              <div className="bg-brand-dark border-brand/40 absolute -right-3 -bottom-4 z-20 rounded-xl border px-4 py-3 shadow-xl">
                <div className="text-brand-light mb-0.5 text-xs font-bold tracking-wider uppercase">Platform</div>
                <div className="font-display text-xl leading-none font-black text-white">Web + Android</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Indikator scroll (referensi user): kapsul outline + panah memantul, klik turun ke section Tentang Kami.
          Hanya di desktop; di mobile konten hero lebih tinggi dari layar jadi indikator bisa menimpa kartu visual. */}
      <a
        href="#tentang-kami"
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="group-hover:border-brand-light flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/40 pt-2 transition-colors duration-200">
          <span className="text-white/70 group-hover:text-brand-light motion-safe:animate-bounce [&_svg]:h-3.5 [&_svg]:w-3.5">
            <ArrowDownIcon />
          </span>
        </span>
        <span className="text-sm text-white/70 transition-colors duration-200 group-hover:text-white">Scroll down</span>
      </a>
    </section>
  );
}
