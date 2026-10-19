import { HeadsetIcon, WhatsAppIcon } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

// Kartu ajakan konsultasi di akhir halaman dalam. Gradasi brand-mid → brand-dark, teks putih (≥ 8.92).
export function CtaCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="from-brand-mid to-brand-dark flex flex-col items-start gap-6 rounded-3xl bg-gradient-to-br px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5 sm:items-center">
            <span className="text-brand-light flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <HeadsetIcon />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{title}</h2>
              <p className="mt-1 text-sm text-white/75 sm:text-base">{subtitle}</p>
            </div>
          </div>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-brand-mid hover:bg-surface-2 inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-full bg-white px-6 py-3 text-base font-bold transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lg"
          >
            Konsultasikan Gratis Sekarang
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
