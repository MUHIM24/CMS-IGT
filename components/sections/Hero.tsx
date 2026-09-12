import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/lib/content/site-settings";

export function Hero() {
  return (
    <section className="hero-gradient px-6 py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div className="text-center lg:text-left">
          <span className="border-accent/30 bg-accent/10 text-accent mx-auto inline-block max-w-[92%] rounded-full border px-4 py-2 text-xs font-bold tracking-wide uppercase sm:max-w-none lg:mx-0">
            Jasa Website, Aplikasi, Sistem & IT Consultant
          </span>

          <h1 className="font-display mt-6 text-4xl leading-tight font-bold sm:text-5xl">
            {siteSettings.tagline}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-white/60 lg:mx-0">
            {siteSettings.companyName} membantu bisnis lintas industri membangun website,
            aplikasi, sistem, dan mobile app — didukung pengalaman nyata membangun sistem
            untuk sektor pembiayaan yang menuntut presisi tinggi.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/kontak"
              className="bg-accent hover:bg-accent-light rounded-xl px-8 py-4 text-sm font-bold text-white transition-colors"
            >
              Konsultasi Gratis
            </Link>
            <Link
              href="/layanan"
              className="rounded-xl border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>

        <div className="animate-float relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={siteSettings.heroImageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
