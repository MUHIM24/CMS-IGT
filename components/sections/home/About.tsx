import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GlobeIcon, ChartIcon } from "@/components/icons/figma-icons";

const MILESTONES = [
  { yr: "2016", ev: "Didirikan di Jakarta sebagai konsultan IT" },
  { yr: "2019", ev: "Spesialisasi sistem multifinance & SLIK OJK" },
  { yr: "2022", ev: "Meluncurkan platform LOS & CMO mobile" },
  { yr: "2024", ev: "Melayani 40+ perusahaan di seluruh Indonesia" },
];

const VISI_MISI = [
  {
    icon: <GlobeIcon />,
    title: "Visi",
    body: "Menjadi mitra teknologi terpercaya bagi perusahaan Indonesia yang ingin tumbuh melalui sistem digital yang handal.",
  },
  {
    icon: <ChartIcon />,
    title: "Misi",
    body: "Menghadirkan solusi perangkat lunak yang tepat sasaran, aman, dan scalable dengan fokus pada dampak bisnis nyata.",
  },
];

export function About() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=680&h=510&fit=crop&auto=format"
                alt="Professional software development team collaborating"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: "linear-gradient(160deg, transparent 55%, #071C26CC)" }}
              />
            </div>
            <div className="bg-brand-deeper border-brand/30 absolute right-0 bottom-8 hidden w-64 rounded-xl border p-5 shadow-2xl lg:block">
              <div className="text-brand mb-3 text-xs font-black tracking-widest uppercase">Perjalanan Kami</div>
              {MILESTONES.map((m) => (
                <div key={m.yr} className="flex gap-3 border-b border-white/5 py-2 last:border-0">
                  <span className="font-display text-brand-light shrink-0 text-base font-bold">{m.yr}</span>
                  <span className="text-sm leading-relaxed text-white/55">{m.ev}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-brand mb-4 text-sm font-bold tracking-widest uppercase">Tentang Kami</p>
            <h2 className="font-display text-text mb-5 text-3xl leading-tight font-bold sm:text-4xl">
              Dibangun untuk Presisi,
              <br />
              <span className="gradient-text">Dipercaya untuk Kompleksitas</span>
            </h2>
            <p className="text-muted mb-5 text-base leading-relaxed">
              PT Inovasi Gatarawana Teknologi adalah perusahaan solusi IT yang berfokus pada
              pengembangan sistem enterprise untuk industri keuangan, multifinance, dan korporasi
              di Indonesia.
            </p>
            <p className="text-muted mb-8 text-base leading-relaxed">
              Keahlian inti kami mencakup sistem multifinance end-to-end, integrasi SLIK OJK
              otomatis, aplikasi mobile LOS, dan aplikasi lapangan untuk CMO.
            </p>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {VISI_MISI.map((card) => (
                <div
                  key={card.title}
                  className="border-border hover:border-brand/40 rounded-xl border p-5 transition-all duration-200"
                >
                  <div className="text-brand mb-3">{card.icon}</div>
                  <h3 className="font-display text-text mb-2 text-base font-bold">{card.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
            <Link
              href="/tentang"
              className="text-brand hover:text-brand-light flex items-center gap-2 text-sm font-semibold transition-colors duration-150"
            >
              Selengkapnya <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
