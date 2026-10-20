import Image from "next/image";
import Link from "next/link";
import { MailIcon, PhoneIcon } from "@/components/icons/figma-icons";
import { serviceAnchor, services } from "@/lib/content/services";
import { ServiceAnchorLink } from "@/components/layout/ServiceAnchorLink";
import { buildWhatsAppLink, siteSettings } from "@/lib/content/site-settings";

// Semua link footer wajib punya tujuan nyata (bukan href="#"). Halaman yang belum ada (Karir) dan akun sosial
// yang belum ada sengaja tidak ditampilkan; tambahkan begitu tersedia.
const COMPANY_LINKS = [
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
];

const LEGAL_LINKS = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat Layanan", href: "/syarat-layanan" },
];

const linkClass = "hover:text-brand-light text-sm text-white/60 transition-colors duration-150";

export function Footer() {
  return (
    <footer className="bg-brand-deeper border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* Mobile: Perusahaan & Produk berdampingan, Hubungi Kami selebar penuh (email panjang). Tablet: profil selebar
            penuh, tiga kolom di bawahnya supaya tidak ada ruang kosong di kanan */}
        <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-10 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <Image src="/logo-icon.png" alt="PT Inovasi Gantarawana Teknologi logo" width={36} height={36} className="h-9 w-9 object-contain" />
              <div>
                <div className="font-display text-base leading-tight font-bold text-white">
                  PT Inovasi Gantarawana Teknologi
                </div>
                <div className="text-brand-light text-xs font-semibold tracking-widest uppercase">IT Solutions</div>
              </div>
            </div>
            {/* Kolom profil (referensi user): hanya klaim faktual, tanpa angka tahun/sertifikasi yang belum ada datanya */}
            <div className="max-w-md space-y-4 sm:max-w-2xl lg:max-w-md text-sm leading-relaxed text-white/70">
              <p>
                <strong className="font-semibold text-white">{siteSettings.companyName}</strong> adalah software house
                yang membangun aplikasi web, aplikasi mobile, dan sistem pembiayaan untuk bisnis di Indonesia.
              </p>
              <p>
                Setiap proyek kami kerjakan bertahap dan transparan, dengan sistem yang patuh regulasi OJK, terhubung
                ke sistem yang sudah berjalan, dan source code yang sepenuhnya milik klien.
              </p>
              <address className="text-white/55 not-italic">{siteSettings.address}</address>
            </div>
          </div>

          <nav aria-label="Perusahaan">
            <div className="mb-5 text-xs font-black tracking-widest text-white uppercase">Perusahaan</div>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Produk">
            <div className="mb-5 text-xs font-black tracking-widest text-white uppercase">Produk</div>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.title}>
                  <ServiceAnchorLink anchor={serviceAnchor(s.title)} className={linkClass}>
                    {s.title}
                  </ServiceAnchorLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 sm:col-span-1">
            <div className="mb-5 text-xs font-black tracking-widest text-white uppercase">Hubungi Kami</div>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-brand-light mt-0.5 shrink-0">
                  <PhoneIcon />
                </span>
                <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {siteSettings.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-light mt-0.5 shrink-0">
                  <MailIcon />
                </span>
                <a href={`mailto:${siteSettings.email}`} className={`${linkClass} break-all`}>
                  {siteSettings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <div className="text-sm text-white/55">
            &copy; {new Date().getFullYear()} PT Inovasi Gantarawana Teknologi. Hak cipta dilindungi.
          </div>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
