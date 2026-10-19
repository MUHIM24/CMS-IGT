import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { services } from "@/lib/content/services";
import { buildServiceListSchema } from "@/lib/structured-data";
import { ServiceCatalog } from "@/components/sections/services/ServiceCatalog";
import { CtaCard } from "@/components/shared/CtaCard";
import { PageHero } from "@/components/shared/PageHero";
import { BadgeCheckIcon, ClockIcon, HeadsetIcon, ShieldCheckIcon, UserCheckIcon } from "@/components/icons/figma-icons";

export const metadata = pageMetadata({
  title: "Layanan Kami | PT IGT",
  description:
    "Pembuatan aplikasi web, CMS, aplikasi mobile, hingga sistem inti dan otomasi proses bisnis. Dirancang sesuai kebutuhan Anda dan dikerjakan end-to-end oleh tim PT IGT.",
  path: "/layanan",
});

// Isi tanpa angka/klaim baru, konsisten dengan poin di Beranda & /tentang
const HIGHLIGHTS = [
  { Icon: ClockIcon, label: "Pengembangan Agile" },
  { Icon: ShieldCheckIcon, label: "Patuh Regulasi OJK" },
  { Icon: UserCheckIcon, label: "Tim Berpengalaman" },
  { Icon: BadgeCheckIcon, label: "Integrasi Satu Pintu" },
  { Icon: HeadsetIcon, label: "Konsultasi Gratis" },
];

export default function LayananPage() {
  return (
    <>
      <JsonLd data={buildServiceListSchema(services.map((x) => ({ title: x.title, desc: x.desc, category: x.category })))} />
      <PageHero
        path="/layanan"
        crumb="Layanan"
        titleLead="Daftar"
        titleAccent="Layanan"
        subtitle="Produk dan layanan teknologi untuk mendukung proses bisnis pembiayaan Anda, dari pengajuan kredit hingga pencairan."
        image={{
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=960&h=600&fit=crop&auto=format",
          alt: "Tim berdiskusi merancang solusi sistem untuk klien",
        }}
        withOverlap
      />

      {/* Bar keunggulan: kartu mengambang, menumpuk di bawah hero */}
      <div className="relative z-10 mx-auto -mt-12 max-w-7xl px-6 lg:px-10">
        <ul className="border-border grid grid-cols-1 gap-x-6 gap-y-4 rounded-2xl border bg-white px-6 py-5 shadow-xl sm:grid-cols-2 lg:grid-cols-5">
          {HIGHLIGHTS.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="text-brand border-brand/25 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                <Icon />
              </span>
              <span className="text-text text-sm font-semibold">{label}</span>
            </li>
          ))}
        </ul>
      </div>

      <section className="bg-white pt-20 pb-4 lg:pt-24 lg:pb-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <h2 className="font-display text-text mb-10 text-center text-3xl leading-tight font-bold sm:text-4xl">
            Ekosistem Digital untuk
            <br />
            <span className="gradient-text">Transformasi Bisnis Anda</span>
          </h2>
          <ServiceCatalog />
        </div>
      </section>
      <CtaCard title="Siap Mendigitalkan Proses Bisnis Anda?" subtitle="Konsultasikan kebutuhan sistem Anda sekarang, gratis bersama tim kami." />
    </>
  );
}
