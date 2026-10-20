import { HeadsetIcon, WhatsAppIcon } from "@/components/icons/figma-icons";
import { buildWhatsAppLink } from "@/lib/content/site-settings";

// Kartu ajakan konsultasi di akhir halaman dalam. Gradasi brand-mid → brand-dark, teks putih (≥ 8.92).
export function CtaCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Mobile: ikon di samping teks, tombol kotak selebar kartu dalam satu baris. Tablet: ikon di samping, tombol digeser sejajar awal judul
            (lebar ikon 56px + gap 20px = 76px). Desktop: teks kiri, tombol kanan. */}
        <div className="from-brand-mid to-brand-dark flex flex-col items-stretch gap-6 rounded-3xl bg-gradient-to-br px-5 py-8 sm:items-start sm:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="text-brand-light flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:h-14 sm:w-14">
              <HeadsetIcon />
            </span>
            <div>
              <h2 className="font-display text-lg leading-snug font-bold text-white sm:text-2xl">{title}</h2>
              <p className="mt-1 text-sm text-white/75 sm:text-base">{subtitle}</p>
            </div>
          </div>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-brand-mid hover:bg-surface-2 inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[13px] font-bold whitespace-nowrap transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lg sm:ml-[76px] sm:gap-2.5 sm:rounded-full sm:px-6 sm:py-3 sm:text-base lg:ml-0"
          >
            Konsultasikan Gratis Sekarang
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
