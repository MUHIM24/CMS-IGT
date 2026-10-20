import Image from "next/image";
import { PillLink } from "@/components/shared/PillLink";
import { CheckIcon, GlobeIcon, ChartIcon } from "@/components/icons/figma-icons";

// Kapabilitas yang sudah terbukti di proyek berjalan (bukan timeline tahun, perusahaan masih baru)
const TRACK_RECORD = [
  "Loan origination dari registrasi hingga pencairan",
  "Robot cek SLIK OJK otomatis",
  "Verifikasi data debitur via Dukcapil",
  "Aplikasi Android untuk CMO & approval",
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
    <section id="tentang-kami" className="scroll-mt-16 bg-white py-24 lg:py-32">
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
              <div className="text-brand-light mb-3 text-xs font-black tracking-widest uppercase">Sudah Berjalan</div>
              {TRACK_RECORD.map((item) => (
                <div key={item} className="flex gap-3 border-b border-white/5 py-2 last:border-0">
                  <span className="text-brand-light mt-0.5 shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-brand-mid mb-4 text-base font-bold tracking-widest uppercase">Tentang Kami</p>
            <h2 className="font-display text-text mb-5 text-3xl leading-tight font-bold sm:text-4xl">
              Dibangun untuk Presisi,
              <br />
              <span className="gradient-text">Dipercaya untuk Kompleksitas</span>
            </h2>
            <p className="text-muted mb-5 text-base leading-relaxed">
              PT Inovasi Gantarawana Teknologi adalah perusahaan solusi IT yang berfokus pada
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
            {/* Tablet: tombol di tengah di bawah kartu Visi/Misi; mobile & desktop tetap rata kiri */}
            <div className="sm:flex sm:justify-center lg:block">
              <PillLink href="/tentang">Selengkapnya</PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
