import Link from "next/link";
import { ArrowRight } from "@/components/icons/figma-icons";
import { ctaPrimaryClass } from "@/components/shared/button-styles";

// Halaman 404 (referensi user). Next otomatis memberi noindex & status 404.
// Ilustrasi: colokan kabel terlepas dari stopkontak ("koneksi terputus"), warna brand.
function DisconnectedIllustration() {
  return (
    <svg viewBox="0 0 400 260" className="mx-auto h-auto w-full max-w-sm" role="img" aria-label="Ilustrasi colokan kabel yang terlepas">
      {/* latar lingkaran lembut */}
      <path
        d="M200 22c62 0 128 26 146 84 17 55-18 108-78 126-55 17-131 14-183-12-47-24-71-77-50-124C56 52 132 22 200 22z"
        className="fill-surface-2"
      />
      {/* garis lantai */}
      <line x1="40" y1="214" x2="360" y2="214" strokeWidth="2" strokeLinecap="round" className="stroke-border" />

      {/* kabel + colokan kiri */}
      <path d="M18 168c40 0 52-36 92-36h40" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-brand-mid" />
      <rect x="146" y="112" width="48" height="40" rx="10" className="fill-brand-mid" />
      <rect x="194" y="121" width="20" height="7" rx="2" className="fill-brand" />
      <rect x="194" y="136" width="20" height="7" rx="2" className="fill-brand" />

      {/* stopkontak + kabel kanan */}
      <rect x="236" y="106" width="52" height="52" rx="12" className="fill-brand-dark" />
      <rect x="244" y="121" width="12" height="7" rx="2" className="fill-brand-light" />
      <rect x="244" y="136" width="12" height="7" rx="2" className="fill-brand-light" />
      <path d="M288 132h30c40 0 46 36 64 36" fill="none" strokeWidth="6" strokeLinecap="round" className="stroke-brand-dark" />

      {/* percikan di celah */}
      <g strokeWidth="4" strokeLinecap="round" className="stroke-accent">
        <line x1="225" y1="104" x2="221" y2="90" />
        <line x1="232" y1="110" x2="243" y2="98" />
        <line x1="218" y1="110" x2="207" y2="99" />
        <line x1="225" y1="162" x2="221" y2="176" />
        <line x1="232" y1="156" x2="243" y2="168" />
      </g>

      {/* tanda tanya kecil */}
      <circle cx="318" cy="70" r="20" className="fill-white stroke-border" strokeWidth="2" />
      <text x="318" y="78" textAnchor="middle" className="fill-brand-mid font-display" fontSize="22" fontWeight="700">
        ?
      </text>
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="bg-surface flex min-h-[80vh] items-center pt-[72px]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16 text-center">
        <DisconnectedIllustration />
        <p className="font-display gradient-text mt-6 text-7xl leading-none font-bold sm:text-8xl">404</p>
        <h1 className="font-display text-text mt-4 text-2xl font-bold sm:text-3xl">Halaman Tidak Ditemukan</h1>
        <p className="text-muted mx-auto mt-3 max-w-md text-base leading-relaxed">
          Halaman yang Anda cari mungkin sudah dipindahkan, dihapus, atau alamatnya salah ketik.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={`${ctaPrimaryClass} flex min-h-11 px-7 py-3`}>
            <span className="rotate-180">
              <ArrowRight size={16} />
            </span>
            Kembali ke Beranda
          </Link>
          <Link
            href="/kontak"
            className="font-display border-border text-text hover:border-brand-mid hover:text-brand-mid flex min-h-11 items-center justify-center rounded-full border bg-white px-7 py-3 text-base font-bold transition-colors duration-200"
          >
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}
