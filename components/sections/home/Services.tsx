import { PillLink } from "@/components/shared/PillLink";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CodeIcon, SystemIcon, FintechIcon, ChartIcon, AppIcon, MobileIcon, ConsultIcon } from "@/components/icons/figma-icons";

const SERVICES = [
  { Icon: CodeIcon, tag: "Web", title: "Web Apps", desc: "Pengembangan aplikasi web modern berbasis React, Vue, atau Laravel, responsif dan dapat dikustomisasi sesuai proses bisnis Anda." },
  { Icon: SystemIcon, tag: "Web", title: "CMS", desc: "Sistem manajemen konten yang memudahkan tim non-teknis mengelola halaman, artikel, dan data situs secara mandiri." },
  { Icon: FintechIcon, tag: "Automation", title: "CNV Robot SLIK", desc: "Sistem robotic automation pengecekan SLIK OJK, lebih cepat, akurat, dan minim human error dibanding proses manual.", highlight: true },
  { Icon: ChartIcon, tag: "Core System", title: "Core Finance System", desc: "Sistem inti pembiayaan end-to-end: input CMO, penilaian CA, survei lapangan, hingga approval dalam satu platform modular.", highlight: true },
  { Icon: AppIcon, tag: "Mobile App", title: "Mobile Approval", desc: "Aplikasi persetujuan kredit dari level CMO hingga BoD, mempercepat keputusan tanpa terikat ruang dan waktu." },
  { Icon: MobileIcon, tag: "Mobile App", title: "Mobile LOS", desc: "Aplikasi Credit Analyst untuk review dokumen, scoring, dan penilaian kelayakan debitur langsung dari perangkat mobile." },
  { Icon: MobileIcon, tag: "Mobile App", title: "Mobile CMO", desc: "Aplikasi pengumpulan data customer secara digital oleh tenaga pemasaran di lapangan, mempercepat proses akuisisi." },
  { Icon: ConsultIcon, tag: "Mobile App", title: "Mobile CNV", desc: "Verifikasi data debitur via SLIK OJK langsung dari genggaman, fleksibel kapan pun dan di mana pun dibutuhkan." },
];

export function Services() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Produk &amp; Layanan</SectionLabel>
          <h2 className="font-display text-text mb-4 text-3xl font-bold sm:text-4xl">
            Ekosistem Digital untuk Transformasi Bisnis Anda
          </h2>
          <p className="text-muted mx-auto max-w-2xl text-base leading-relaxed">
            Delapan produk terintegrasi, dari web apps, CMS, otomatisasi SLIK OJK, hingga aplikasi mobile lapangan.
          </p>
          <div className="mt-8">
            <PillLink href="/layanan">Lihat detail semua produk</PillLink>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className={`group hover:shadow-brand/[0.1] hover:bg-brand-dark flex flex-col rounded-2xl border bg-white p-6 transition-all duration-250 hover:-translate-y-[3px] hover:shadow-xl ${
                svc.highlight ? "border-brand/50 hover:border-brand" : "border-border hover:border-brand-dark"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`text-brand flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110 group-hover:bg-brand/20 group-hover:text-brand-light ${svc.highlight ? "bg-brand/[0.18]" : "bg-brand/10"}`}>
                  <svc.Icon />
                </div>
                <span className={`rounded-md px-2.5 py-1 text-xs font-bold tracking-wide transition-colors duration-250 ${svc.highlight ? "bg-accent/15 text-accent-text group-hover:bg-accent group-hover:text-brand-dark" : "bg-brand/10 text-brand-mid group-hover:bg-white/10 group-hover:text-white"}`}>
                  {svc.tag}
                </span>
              </div>
              <h3 className="font-display text-text transition-colors duration-250 group-hover:text-white mb-2 text-base font-bold">{svc.title}</h3>
              <p className="text-muted flex-1 text-sm leading-relaxed transition-colors duration-250 group-hover:text-white/75">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
