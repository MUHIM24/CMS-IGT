import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/lib/content/page-seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CtaCard } from "@/components/shared/CtaCard";
import { TeamSection } from "@/components/sections/about/TeamSection";
import { companyFacts } from "@/lib/content/company-facts";
import {
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

export const metadata = pageMetadata(pageSeo.about);

const HIGHLIGHTS = [
  { Icon: ClockIcon, label: "Pengembangan Agile & Terstruktur" },
  { Icon: ShieldCheckIcon, label: "Patuh Regulasi OJK" },
  { Icon: ConsultIcon, label: "Tim Berpengalaman" },
  { Icon: BadgeCheckIcon, label: "Integrasi API-First" },
  { Icon: HeadsetIcon, label: "Dukungan Pasca Go-Live" },
];

// Pengganti timeline tahun (perusahaan masih baru): tahapan kerja yang konsisten dengan FAQ & WhyUs
const WORK_STEPS = [
  { title: "Analisa Kebutuhan", body: "Kami pelajari proses bisnis, regulasi yang berlaku, dan sistem yang sudah Anda pakai sebelum menulis satu baris kode." },
  { title: "Desain Alur & Prototipe", body: "Alur kerja dan tampilan dirancang bersama tim Anda, lalu divalidasi lewat prototipe yang bisa dicoba." },
  { title: "Pengembangan Bertahap", body: "Dikerjakan dalam sprint dua mingguan, dengan demo di setiap akhir sprint supaya progres selalu terpantau." },
  { title: "Go-Live & Pendampingan", body: "Sistem dirilis ke produksi, source code dan dokumentasi diserahkan, lalu didampingi sesuai SLA yang disepakati." },
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
      <JsonLd data={buildBreadcrumbSchema([{ name: "Tentang Kami", path: "/tentang" }])} />
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
                Tentang <span className="gradient-text-on-dark">PT Inovasi Gantarawana Teknologi</span>
              </h1>
              <p className="font-display mb-4 text-lg font-semibold text-white/80">
                Mitra Teknologi Terpercaya untuk Industri Keuangan &amp; Multifinance Indonesia
              </p>
              <p className="text-base leading-relaxed text-white/50">
                Kami membangun sistem enterprise yang presisi, patuh regulasi OJK, dan siap skala,
                dari sistem core pembiayaan hingga aplikasi mobile lapangan.
              </p>
            </div>

            <div className="relative flex items-end justify-end">
              <div className="relative w-full max-w-md overflow-hidden rounded-t-2xl" style={{ height: "320px" }}>
                <Image
                  src="https://images.unsplash.com/photo-1758691736975-9f7f643d178e?w=720&h=480&fit=crop&auto=format"
                  alt="Tim PT Inovasi Gantarawana Teknologi"
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
      <div className="relative z-10 mx-auto -mt-8 max-w-7xl px-6 lg:px-10">
        <div className="border-border grid grid-cols-1 gap-x-6 gap-y-5 rounded-2xl border bg-white px-6 py-6 shadow-2xl sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
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
                  alt="Tim PT Inovasi Gantarawana Teknologi berkolaborasi"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(160deg, transparent 55%, #071C26CC)" }} />
              </div>
              <div className="bg-brand-deeper border-brand/30 absolute bottom-4 left-4 rounded-xl border px-5 py-3.5 shadow-2xl">
                <div className="text-brand-light mb-1.5 text-xs font-black tracking-widest uppercase">Didukung Oleh</div>
                <div className="font-display text-xl leading-tight font-black text-white">Tim Berpengalaman</div>
              </div>
            </div>

            <div>
              <SectionLabel>Tentang Kami</SectionLabel>
              <h2 className="font-display text-text mb-5 text-3xl leading-tight font-bold sm:text-4xl">
                PT IGT, Partner Tepat untuk <span className="gradient-text">Transformasi Digital Bisnis Anda</span>
              </h2>
              <p className="text-muted mb-4 text-base leading-relaxed">
                PT Inovasi Gantarawana Teknologi adalah perusahaan solusi IT yang berfokus pada
                pengembangan sistem enterprise untuk industri keuangan, multifinance, dan korporasi
                di Indonesia. Sistem yang kami bangun sudah berjalan di produksi dan dipakai
                perusahaan pembiayaan untuk memproses pengajuan kredit setiap hari.
              </p>
              <p className="text-muted mb-8 text-base leading-relaxed">
                Kami memahami bahwa setiap bisnis pembiayaan membutuhkan sistem yang tidak hanya
                fungsional, tetapi juga aman, audit-ready, dan dapat berkembang bersama skala bisnis.
                Karena itu, setiap proyek kami kerjakan bertahap, terdokumentasi, dan didampingi
                sampai sistem benar-benar dipakai.
              </p>
              {/* Mobile: ikon di samping teks, 1 kolom. sm+: 3 kolom, ikon di atas teks biar gak patah baris */}
              <ul className="border-border grid grid-cols-1 gap-5 border-t pt-8 sm:grid-cols-3 sm:gap-6">
                {companyFacts.map(({ Icon, title, sub }) => (
                  <li key={title} className="flex items-center gap-3.5 sm:flex-col sm:items-start sm:gap-3">
                    <div className="bg-brand/10 text-brand border-brand/20 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
                      <Icon />
                    </div>
                    <div className="leading-tight">
                      <div className="font-display text-text text-lg font-bold">{title}</div>
                      <div className="text-muted text-sm">{sub}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cara kerja */}
      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <SectionLabel>Cara Kami Bekerja</SectionLabel>
            <h2 className="font-display text-text text-3xl font-bold sm:text-4xl">
              Dari Kebutuhan ke <span className="gradient-text">Sistem yang Berjalan</span>
            </h2>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="bg-border absolute top-7 bottom-7 left-7 w-0.5" />
            <div className="space-y-6">
              {WORK_STEPS.map((step, i) => (
                <div key={step.title} className="group relative flex gap-6">
                  <div
                    className={`font-display relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-black shadow-md transition-transform duration-200 group-hover:scale-105 ${
                      i < WORK_STEPS.length - 1 ? "bg-brand-mid text-white" : "bg-accent text-brand-dark"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="border-border hover:border-brand/50 hover:shadow-brand/[0.08] flex-1 rounded-2xl border bg-white px-6 py-5 transition-all duration-200 hover:shadow-lg">
                    <h3 className="font-display text-text text-lg font-bold">{step.title}</h3>
                    <p className="text-muted mt-1 text-sm leading-relaxed">{step.body}</p>
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

      <TeamSection />

      <CtaCard
        title="Siap Bekerja Sama dengan Kami?"
        subtitle="Konsultasikan kebutuhan teknologi Anda sekarang, gratis bersama tim kami."
      />
    </>
  );
}
