import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { CtaCard } from "@/components/shared/CtaCard";
import { PageHero } from "@/components/shared/PageHero";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { clients } from "@/lib/content/clients";

export const metadata = pageMetadata({
  title: "Portfolio | PT IGT",
  description:
    "Proyek PT IGT yang sudah berjalan di produksi: sistem pembiayaan end-to-end, aplikasi mobile untuk tim lapangan, dan otomasi proses yang mempercepat kerja klien.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        path="/portfolio"
        crumb="Portfolio"
        titleLead="Portfolio"
        titleAccent="Kami"
        subtitle="Solusi yang kami bangun dan kini berjalan di produksi bersama klien kami."
        image={{
          src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=960&h=600&fit=crop&auto=format",
          alt: "Presentasi hasil proyek kepada tim klien",
        }}
      />
      <section className="bg-white pt-20 pb-4 lg:pt-24 lg:pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-text mb-12 text-center text-3xl leading-tight font-bold sm:text-4xl">
            Proyek yang Mendefinisikan
            <br />
            <span className="gradient-text">Keahlian Kami</span>
          </h2>

          <PortfolioGrid />

          <div className="border-border border-t pt-12">
            <div className="text-muted mb-8 text-center text-base font-black tracking-widest uppercase">Klien Kami</div>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {clients.map((c) => (
                <div
                  key={c.name}
                  className="border-border flex h-24 w-52 items-center justify-center rounded-xl border bg-white p-5"
                >
                  <Image src={c.logo} alt={c.name} width={200} height={96} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaCard title="Punya Kebutuhan Proyek Serupa?" subtitle="Ceritakan kebutuhan Anda, kami bantu rancang solusinya. Konsultasi gratis." />
    </>
  );
}
