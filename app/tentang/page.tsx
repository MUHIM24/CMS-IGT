import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { buildWhatsAppLink } from "@/lib/content/site-settings";
import {
  ArrowRight,
  CheckIcon,
  GlobeIcon,
  ChartIcon,
  ClockIcon,
  ShieldCheckIcon,
  ConsultIcon,
  BadgeCheckIcon,
  HeadsetIcon,
  UserCheckIcon,
  ClipboardCheckIcon,
  HeartIcon,
} from "@/components/icons/figma-icons";

export const metadata: Metadata = {
  title: "Tentang Kami | Konsultan IT & Software House Jakarta - PT IGT",
  description:
    "PT Inovasi Gatarawana Teknologi, konsultan IT dan software house di Jakarta, mitra teknologi terpercaya untuk industri keuangan dan multifinance Indonesia.",
};

const HIGHLIGHTS = [
  { Icon: ClockIcon, label: "Pengembangan Agile & Terstruktur" },
  { Icon: ShieldCheckIcon, label: "Patuh Regulasi OJK 100%" },
  { Icon: ConsultIcon, label: "Tim Berpengalaman di Keuangan" },
  { Icon: BadgeCheckIcon, label: "Integrasi API-First" },
  { Icon: HeadsetIcon, label: "Dukungan Pasca Go-Live" },
];

const MILESTONES = [
  { yr: "2016", ev: "Didirikan di Jakarta sebagai konsultan IT untuk korporasi" },
  { yr: "2018", ev: "Membangun sistem web enterprise pertama untuk lembaga keuangan" },
  { yr: "2019", ev: "Spesialisasi sistem multifinance & integrasi SLIK OJK" },
  { yr: "2021", ev: "Meluncurkan Core Finance System versi modular pertama" },
  { yr: "2022", ev: "Meluncurkan platform LOS, CMO & CNV mobile" },
  { yr: "2024", ev: "Melayani 40+ perusahaan di seluruh Indonesia" },
];

const VALUES = [
  { Icon: ShieldCheckIcon, title: "Integritas", body: "Kami bekerja dengan jujur, amanah, dan bertanggung jawab dalam setiap layanan yang kami berikan kepada klien." },
  { Icon: UserCheckIcon, title: "Profesional", body: "Didukung oleh tim ahli berpengalaman dan kompeten di bidang sistem keuangan dan teknologi enterprise." },
  { Icon: ClockIcon, title: "Efisien", body: "Proses cepat dan tepat waktu untuk menghargai waktu bisnis klien dalam setiap tahap pengembangan." },
  { Icon: ClipboardCheckIcon, title: "Transparan", body: "Informasi proyek yang jelas, pelaporan berkala, dan proses yang terpantau baik oleh seluruh pemangku kepentingan." },
  { Icon: HeartIcon, title: "Fokus pada Klien", body: "Kepuasan dan keberhasilan klien adalah prioritas utama dalam setiap solusi dan layanan yang kami hadirkan." },
];

const MISI_POINTS = [
  "Menghadirkan layanan pengembangan sistem yang cepat, tepat sasaran, dan scalable.",
  "Memberikan solusi teknologi terbaik sesuai kebutuhan dan regulasi bisnis klien.",
  "Menjaga kepatuhan terhadap standar OJK dan keamanan data nasabah.",
  "Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan dan hasil nyata.",
];

export default function TentangPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-deeper relative overflow-hidden pt-28 pb-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #67BED9 1px, transparent 1px)", backgroundSize: "36px 36px" }}
        />
        <div className="bg-brand absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-8 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="transition-colors duration-150 hover:text-white">Beranda</Link>
            <span>/</span>
            <span className="text-brand-light">Tentang Kami</span>
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div className="pb-16">
              <h1 className="font-display mb-5 text-4xl leading-tight font-bold text-white sm:text-5xl">
                Tentang <span className="gradient-text">PT Inovasi Gatarawana Teknologi</span>
              </h1>
              <p className="font-display mb-4 text-lg font-semibold text-white/80">
                Mitra Teknologi Terpercaya untuk Industri Keuangan &amp; Multifinance Indonesia
              </p>
              <p className="text-base leading-relaxed text-white/50">
                Sejak 2016, kami hadir untuk membangun sistem enterprise yang presisi, patuh regulasi
                OJK, dan siap skala, dari sistem core pembiayaan hingga aplikasi mobile lapangan.
              </p>
            </div>

            <div className="relative flex items-end justify-end">
              <div className="relative w-full max-w-md overflow-hidden rounded-t-2xl" style={{ height: "320px" }}>
                <Image
                  src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?w=720&h=480&fit=crop&auto=format"
                  alt="Tim PT Inovasi Gatarawana Teknologi"
                  fill
                  sizes="448px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #071C2660, transparent 60%)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights: kartu mengambang, sedikit menumpuk di atas foto hero */}
      <div className="relative z-10 mx-auto -mt-8 max-w-5xl px-6 lg:px-10">
        <div className="border-border grid grid-cols-1 gap-x-6 gap-y-5 rounded-2xl border bg-white px-6 py-6 shadow-2xl sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="bg-brand/10 text-brand border-brand/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                <item.Icon />
              </span>
              <span className="text-text text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Company detail */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=680&h=510&fit=crop&auto=format"
                  alt="Tim PT Inovasi Gatarawana Teknologi berkolaborasi"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(160deg, transparent 55%, #071C26CC)" }} />
              </div>
              <div className="bg-brand-deeper border-brand/30 absolute bottom-4 left-4 rounded-xl border px-5 py-3.5 shadow-2xl">
                <div className="text-brand mb-1 text-xs font-black tracking-widest uppercase">Proyek Selesai</div>
                <div className="font-display text-3xl leading-none font-black text-white">100+</div>
              </div>
            </div>

            <div>
              <SectionLabel>Tentang Kami</SectionLabel>
              <h2 className="font-display text-text mb-5 text-3xl leading-tight font-bold sm:text-4xl">
                PT IGT, Partner Tepat untuk <span className="gradient-text">Transformasi Digital Bisnis Anda</span>
              </h2>
              <p className="text-muted mb-4 text-base leading-relaxed">
                PT Inovasi Gatarawana Teknologi adalah perusahaan solusi IT yang berfokus pada
                pengembangan sistem enterprise untuk industri keuangan, multifinance, dan korporasi
                di Indonesia. Sejak berdiri, kami telah membangun reputasi atas deliverability,
                keandalan teknis, dan kepatuhan terhadap regulasi OJK.
              </p>
              <p className="text-muted mb-8 text-base leading-relaxed">
                Kami memahami bahwa setiap bisnis pembiayaan membutuhkan sistem yang tidak hanya
                fungsional, tetapi juga aman, audit-ready, dan dapat berkembang bersama skala bisnis.
                Karena itu, kami hadir dengan layanan terlengkap dan pendampingan dari tim ahli
                berpengalaman.
              </p>
              <div className="border-border grid grid-cols-3 gap-6 border-t pt-8">
                {[
                  { val: "100+", sub: "Proyek Selesai" },
                  { val: "99%", sub: "Kepuasan Klien" },
                  { val: "8+", sub: "Tahun Pengalaman" },
                ].map((s) => (
                  <div key={s.sub}>
                    <div className="font-display text-brand mb-1 text-2xl leading-none font-black sm:text-3xl">{s.val}</div>
                    <div className="text-muted text-xs font-medium">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <SectionLabel>Perjalanan Kami</SectionLabel>
            <h2 className="font-display text-text text-3xl font-bold sm:text-4xl">
              Dari Konsultan ke Mitra <span className="gradient-text">Teknologi Enterprise</span>
            </h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="bg-border absolute top-7 bottom-7 left-7 w-0.5" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <div key={m.yr} className="group relative flex gap-6">
                  <div
                    className={`font-display relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white shadow-md transition-transform duration-200 group-hover:scale-105 ${
                      i < 2 ? "bg-brand-mid" : i < 4 ? "bg-brand" : "bg-accent"
                    }`}
                  >
                    {m.yr.slice(2)}
                  </div>
                  <div className="border-border hover:border-brand/50 hover:shadow-brand/[0.08] flex-1 rounded-2xl border bg-white px-6 py-5 transition-all duration-200 hover:shadow-lg">
                    <span className="font-display text-brand text-lg font-bold">{m.yr}</span>
                    <p className="text-muted mt-1 text-sm leading-relaxed">{m.ev}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <SectionLabel>Nilai-Nilai Kami</SectionLabel>
            <h2 className="font-display text-text mb-3 text-3xl font-bold sm:text-4xl">
              Nilai-Nilai yang <span className="gradient-text">Kami Junjung</span>
            </h2>
            <p className="text-muted text-base">Nilai-nilai ini menjadi komitmen kami dalam memberikan layanan terbaik bagi setiap klien.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group bg-surface border-border hover:border-brand/60 hover:shadow-brand/[0.08] rounded-2xl border p-6 text-center transition-all duration-200 hover:bg-white hover:shadow-lg"
              >
                <span className="bg-brand/10 text-brand border-brand/20 mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-110">
                  <v.Icon />
                </span>
                <h3 className="font-display text-text mb-2 text-base font-bold">{v.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <SectionLabel>Visi &amp; Misi</SectionLabel>
            <h2 className="font-display text-text text-3xl font-bold sm:text-4xl">
              Arah dan Tujuan <span className="gradient-text">Perusahaan Kami</span>
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-brand-deeper relative min-h-[320px] overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, var(--color-brand) 0%, transparent 70%)" }}
              />
              <div className="relative flex h-full flex-col p-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-brand/30 text-brand-light flex h-9 w-9 items-center justify-center rounded-xl">
                    <GlobeIcon />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">Visi Kami</h3>
                </div>
                <p className="flex-1 text-base leading-relaxed text-white/70">
                  Menjadi mitra teknologi terpercaya nomor satu bagi perusahaan keuangan dan
                  multifinance di Indonesia, menghadirkan sistem digital yang handal, patuh
                  regulasi, dan siap tumbuh bersama bisnis klien.
                </p>
                <div className="mt-8 flex items-end gap-1.5">
                  {[40, 60, 80, 55, 90, 70, 100].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm transition-all duration-300 ${i === 6 ? "bg-accent" : "bg-brand"}`}
                      style={{ height: `${h * 0.7}px`, opacity: i === 6 ? 1 : 0.3 + i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="border-border rounded-2xl border bg-white p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-brand/10 text-brand flex h-9 w-9 items-center justify-center rounded-xl">
                  <ChartIcon />
                </div>
                <h3 className="font-display text-text text-lg font-bold">Misi Kami</h3>
              </div>
              <div className="space-y-4">
                {MISI_POINTS.map((point, i) => (
                  <div key={i} className="flex gap-3.5">
                    <div className="bg-brand/10 text-brand mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      <CheckIcon />
                    </div>
                    <p className="text-muted text-base leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team section disembunyikan sementara — belum ada foto tim asli (lihat app/tim/page.tsx) */}

      {/* CTA */}
      <section className="bg-brand py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">Siap Bekerja Sama dengan Kami?</h3>
                <p className="mt-1 text-sm text-white/70">Konsultasikan kebutuhan teknologi Anda sekarang bersama tim ahli kami.</p>
              </div>
            </div>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:bg-surface-2 flex min-h-11 items-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold whitespace-nowrap text-[var(--color-brand)] transition-all duration-200 hover:shadow-xl active:scale-[0.98]"
            >
              Konsultasikan Sekarang
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                <ArrowRight size={15} />
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
