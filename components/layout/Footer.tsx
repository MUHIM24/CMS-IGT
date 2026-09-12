import Link from "next/link";
import { siteSettings } from "@/lib/content/site-settings";

const columns = [
  {
    heading: "Perusahaan",
    links: [
      { href: "/tentang", label: "Tentang Kami" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Layanan",
    links: [
      { href: "/layanan", label: "Semua Layanan" },
      { href: "/kontak", label: "Konsultasi Gratis" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-deeper border-t border-white/5 px-6 py-14 text-white/50">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <div className="font-display text-sm font-bold text-white">
            {siteSettings.companyName}
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">{siteSettings.tagline}</p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <div className="font-display text-xs font-bold tracking-wider text-white uppercase">
              {col.heading}
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6 text-xs">
        © {new Date().getFullYear()} {siteSettings.companyName}. Hak cipta dilindungi.
      </div>
    </footer>
  );
}
