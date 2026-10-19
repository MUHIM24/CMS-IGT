import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";

interface PageHeroProps {
  crumb: string;
  // path halaman ini, dipakai untuk JSON-LD BreadcrumbList
  path: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
  image: { src: string; alt: string };
  // true kalau di bawahnya ada kartu mengambang yang menumpuk ke hero (butuh ruang bawah lebih)
  withOverlap?: boolean;
}

// Hero halaman dalam (Layanan, Portfolio): latar terang, breadcrumb, H1 dua warna,
// foto di kanan memudar ke latar. Foto disembunyikan di mobile supaya hero tetap ringkas.
export function PageHero({ crumb, path, titleLead, titleAccent, subtitle, image, withOverlap = false }: PageHeroProps) {
  return (
    <section className="bg-surface-2 relative overflow-hidden pt-[72px]">
      <JsonLd data={buildBreadcrumbSchema([{ name: crumb, path }])} />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image src={image.src} alt={image.alt} fill priority sizes="50vw" className="object-cover" />
        <div className="from-surface-2 via-surface-2/40 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>

      <div
        className={`relative mx-auto max-w-7xl px-6 pt-10 lg:px-10 lg:pt-14 ${
          withOverlap ? "pb-24 lg:pb-28" : "pb-14 lg:pb-20"
        }`}
      >
        <nav aria-label="Breadcrumb" className="text-muted mb-5 flex items-center gap-2 text-sm">
          <Link href="/" className="hover:text-brand-dark underline-offset-4 transition-colors duration-150 hover:underline">
            Beranda
          </Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span className="text-text font-medium">{crumb}</span>
        </nav>
        <h1 className="font-display text-text mb-4 text-4xl font-bold sm:text-5xl">
          {titleLead} <span className="gradient-text">{titleAccent}</span>
        </h1>
        <p className="text-muted max-w-lg text-base leading-relaxed sm:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
