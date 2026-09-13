import { ArrowRight, PhoneIcon } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

export function CTABanner() {
  return (
    <section className="bg-brand-deeper relative overflow-hidden py-24">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, var(--color-brand) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <div className="bg-accent/20 mb-7 inline-flex items-center rounded-full px-4 py-1.5">
          <span className="text-accent text-sm font-bold tracking-widest uppercase">Mulai Proyek Anda</span>
        </div>
        <h2 className="font-display mb-6 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-[44px]">
          Siap Membangun Sistem yang
          <br />
          <span className="gradient-text">Andal dan Scalable?</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/50">
          Konsultasikan kebutuhan sistem Anda dengan tim kami, analisis kebutuhan, rekomendasi
          arsitektur, dan estimasi proyek tanpa biaya awal.
        </p>
        <div className="flex flex-col justify-center gap-3.5 sm:flex-row">
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:bg-accent-light flex min-h-11 items-center justify-center gap-2.5 rounded-xl bg-[var(--color-accent)] px-9 py-4 text-sm font-bold text-white transition-all duration-200 hover:shadow-xl"
          >
            Jadwalkan Konsultasi
            <span className="transition-transform duration-150 group-hover:translate-x-0.5">
              <ArrowRight />
            </span>
          </a>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="border-brand/30 text-brand-light hover:bg-brand/10 hover:border-brand flex min-h-11 items-center justify-center gap-2.5 rounded-xl border px-9 py-4 text-sm font-semibold transition-all duration-200"
          >
            <PhoneIcon /> Hubungi Langsung
          </a>
        </div>
      </div>
    </section>
  );
}
