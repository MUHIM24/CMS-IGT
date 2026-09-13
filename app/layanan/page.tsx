import type { Metadata } from "next";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CodeIcon, SystemIcon, FintechIcon, ChartIcon, AppIcon, MobileIcon, ConsultIcon } from "@/components/icons/figma-icons";

export const metadata: Metadata = {
  title: "Layanan | PT Inovasi Gatarawana Teknologi",
  description: "Delapan produk terintegrasi: web apps, CMS, otomatisasi SLIK OJK, sistem core pembiayaan, hingga aplikasi mobile.",
};

const SERVICES = [
  { Icon: CodeIcon, tag: "Web", title: "Web Apps", desc: "Pengembangan aplikasi web modern berbasis React, Vue, atau Laravel, responsif, cepat, dan dapat dikustomisasi sesuai proses bisnis Anda, mulai dari portal internal hingga platform pelanggan." },
  { Icon: SystemIcon, tag: "Web", title: "CMS", desc: "Sistem manajemen konten yang memudahkan tim non-teknis dalam mengelola halaman, artikel, produk, dan data situs secara mandiri, tanpa perlu menyentuh kode." },
  { Icon: FintechIcon, tag: "Automation", title: "CNV Robot SLIK", desc: "Sistem robotic automation yang melakukan pengecekan SLIK OJK secara otomatis untuk memverifikasi riwayat kredit calon debitur, menggantikan proses cek manual dengan proses digital yang lebih cepat, akurat, dan minim human error.", highlight: true },
  { Icon: ChartIcon, tag: "Core System", title: "Core Finance System", desc: "Sistem inti pembiayaan (multifinance core system) yang mengelola proses kredit secara end-to-end, mulai dari input CMO, penilaian Credit Analyst (CA), survei lapangan, hingga approval, terintegrasi dalam satu platform modular.", highlight: true },
  { Icon: AppIcon, tag: "Mobile App", title: "Mobile Approval", desc: "Aplikasi mobile untuk proses persetujuan kredit end-to-end, menghubungkan setiap jenjang approval mulai dari level CMO hingga Board of Directors (BoD), mempercepat keputusan tanpa terikat ruang dan waktu." },
  { Icon: MobileIcon, tag: "Mobile App", title: "Mobile LOS", desc: "Aplikasi mobile untuk Credit Analyst dalam mereview kelengkapan dokumen, melakukan scoring, dan menilai kelayakan calon debitur, mendukung proses analisa kredit langsung dari perangkat mobile." },
  { Icon: MobileIcon, tag: "Mobile App", title: "Mobile CMO", desc: "Aplikasi mobile bagi tenaga pemasaran (CMO) untuk mengumpulkan dan melengkapi data customer secara digital pada tahap pengajuan kredit, mempercepat proses akuisisi di lapangan." },
  { Icon: ConsultIcon, tag: "Mobile App", title: "Mobile CNV", desc: "Adaptasi mobile dari sistem pengecekan SLIK OJK, menghadirkan proses verifikasi data debitur langsung dari genggaman, memberi fleksibilitas pengecekan kapan pun dan di mana pun dibutuhkan." },
];

export default function LayananPage() {
  return (
    <section className="bg-surface pt-32 pb-24 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Produk &amp; Layanan</SectionLabel>
          <h2 className="font-display text-text mb-4 text-3xl font-bold sm:text-4xl">
            Ekosistem Digital untuk Industri Pembiayaan
          </h2>
          <p className="text-muted mx-auto max-w-2xl text-base leading-relaxed">
            Delapan produk terintegrasi, dari web apps dan CMS, otomatisasi SLIK OJK, sistem core
            pembiayaan, hingga aplikasi mobile untuk setiap peran di lapangan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((svc) => (
            <div
              key={svc.title}
              className={`group hover:shadow-brand/[0.1] flex flex-col rounded-2xl border bg-white p-7 transition-all duration-250 hover:-translate-y-[3px] hover:shadow-xl ${
                svc.highlight ? "border-brand/50 hover:border-brand" : "border-border hover:border-brand/60"
              }`}
            >
              <div className="mb-5 flex items-start justify-between">
                <div className={`text-brand flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${svc.highlight ? "bg-brand/[0.18]" : "bg-brand/10"}`}>
                  <svc.Icon />
                </div>
                <span className={`rounded-md px-2.5 py-1 text-xs font-bold tracking-wide ${svc.highlight ? "bg-accent/15 text-accent" : "bg-brand/10 text-brand"}`}>
                  {svc.tag}
                </span>
              </div>
              <h3 className="font-display text-text mb-3 text-lg font-bold">{svc.title}</h3>
              <p className="text-muted flex-1 text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
