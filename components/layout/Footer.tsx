import Image from "next/image";
import { LinkedinIcon, InstagramIcon } from "@/components/icons/figma-icons";

const footerLinks: Record<string, string[]> = {
  Perusahaan: ["Tentang Kami", "Karir", "Blog Teknis"],
  Produk: [
    "Web Apps",
    "CMS",
    "CNV Robot SLIK",
    "Core Finance System",
    "Mobile Approval",
    "Mobile LOS",
    "Mobile CMO",
    "Mobile CNV",
  ],
  Hukum: ["Kebijakan Privasi", "Syarat Layanan", "Keamanan Data"],
};

export function Footer() {
  return (
    <footer className="bg-brand-deeper border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <Image src="/logo-icon.png" alt="PT Inovasi Gatarawana Teknologi logo" width={36} height={36} className="h-9 w-9 object-contain" />
              <div>
                <div className="font-display text-base leading-tight font-bold text-white">
                  PT Inovasi Gatarawana Teknologi
                </div>
                <div className="text-brand-light text-xs font-semibold tracking-widest uppercase">IT Solutions</div>
              </div>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/35">
              Mitra teknologi terpercaya untuk sistem enterprise, fintech, dan mobile di Indonesia sejak 2016.
            </p>
            <div className="flex gap-2.5">
              {[LinkedinIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/40 transition-all duration-150 hover:bg-[var(--color-brand)] hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([cat, items]) => (
            <div key={cat}>
              <div className="mb-5 text-xs font-black tracking-widest text-white uppercase">{cat}</div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-brand-light text-sm text-white/35 transition-colors duration-150">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <div className="text-sm text-white/25">
            &copy; {new Date().getFullYear()} PT Inovasi Gatarawana Teknologi. Hak cipta dilindungi.
          </div>
          <div className="text-sm text-white/20">Jakarta, Indonesia</div>
        </div>
      </div>
    </footer>
  );
}
