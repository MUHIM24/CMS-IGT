import Image from "next/image";
import { siteSettings } from "@/lib/content/site-settings";

interface AboutProps {
  variant?: "teaser" | "full";
}

export function About({ variant = "teaser" }: AboutProps) {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl lg:order-2">
          <Image
            src={siteSettings.aboutImageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 24rem, 90vw"
            className="object-cover"
          />
        </div>

        <div className="text-center lg:order-1 lg:text-left">
          <span className="bg-brand/10 text-brand inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
            Tentang Kami
          </span>
          <h2 className="font-display text-text mt-5 text-3xl font-bold">
            Solusi Teknologi yang Dibangun dengan Presisi
          </h2>
          <p className="text-muted mt-5 leading-relaxed">
            {siteSettings.companyName} adalah perusahaan penyedia jasa IT yang membantu
            bisnis lintas industri membangun website, aplikasi, sistem, dan mobile app.
            Kami juga punya pengalaman nyata mengerjakan sistem untuk sektor pembiayaan —
            mulai dari automation compliance OJK sampai core system kredit end-to-end —
            yang menuntut standar presisi dan keandalan tinggi.
          </p>

          {variant === "full" && (
            <div className="mt-10 grid gap-6 text-left sm:grid-cols-2">
              <div className="border-border rounded-xl border p-6">
                <h3 className="font-display text-text text-base font-bold">Visi</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  Menjadi mitra teknologi tepercaya yang mempercepat pertumbuhan digital
                  bisnis di berbagai industri.
                </p>
              </div>
              <div className="border-border rounded-xl border p-6">
                <h3 className="font-display text-text text-base font-bold">Misi</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">
                  Membangun solusi yang andal, presisi, dan sesuai kebutuhan nyata setiap
                  klien — bukan solusi generik satu ukuran untuk semua.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
