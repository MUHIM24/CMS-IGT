import { ArrowRight, PhoneIcon } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";
import { ctaArrowClass, ctaOutlineOnDarkClass, ctaPrimaryClass } from "@/components/shared/button-styles";

export function CTABanner() {
  return (
    <section className="bg-brand-deeper relative overflow-hidden py-24">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(ellipse at 50% 50%, var(--color-brand) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <div className="bg-accent/20 mb-7 inline-flex items-center rounded-full px-4 py-1.5">
          <span className="text-accent text-base font-bold tracking-widest uppercase">Mulai Proyek Anda</span>
        </div>
        <h2 className="font-display mb-6 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-[44px]">
          Siap Membangun Sistem yang
          <br />
          <span className="gradient-text-on-dark">Andal dan Scalable?</span>
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
            className={`${ctaPrimaryClass} flex min-h-11 px-9 py-4`}
          >
            Jadwalkan Konsultasi
            <span className={ctaArrowClass}>
              <ArrowRight />
            </span>
          </a>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ctaOutlineOnDarkClass} flex min-h-11 px-9 py-4`}
          >
            <PhoneIcon /> Hubungi Langsung
          </a>
        </div>
      </div>
    </section>
  );
}
