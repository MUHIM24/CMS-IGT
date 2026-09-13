import Image from "next/image";

const WHY = [
  { title: "Tim Berpengalaman di Industri Keuangan", body: "Tenaga ahli kami memiliki rekam jejak nyata dalam implementasi sistem multifinance, perbankan digital, dan koperasi." },
  { title: "Laporan Kerja Rutin dan Transparan", body: "Progress proyek dilaporkan secara berkala melalui sprint demo dua minggu sekali untuk memastikan akuntabilitas." },
  { title: "Terintegrasi dengan Sistem Internal Klien", body: "Solusi kami dirancang API-first sehingga dapat terhubung langsung dengan sistem core, ERP, atau platform internal." },
  { title: "SLA yang Disepakati Bersama", body: "Kami menyediakan SLA yang jelas dan fleksibel mencakup waktu respons, cakupan dukungan, dan jaminan uptime." },
  { title: "Sistem Patuh Regulasi OJK", body: "Setiap sistem keuangan dirancang memenuhi persyaratan POJK, audit trail lengkap, dan standar keamanan data nasabah." },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-text mb-10 text-3xl leading-tight font-bold sm:text-4xl">
              Mengapa Harus Pilih <span className="gradient-text">Layanan Kami</span>?
            </h2>
            <div className="space-y-7">
              {WHY.map((w, i) => (
                <div key={w.title} className="group flex gap-5">
                  <div className="from-brand to-brand-mid font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base font-black text-white transition-all duration-200 group-hover:scale-105">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-display text-text mb-1.5 text-base font-bold">{w.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=750&fit=crop&auto=format"
                  alt="Tim profesional teknologi berdiskusi"
                  fill
                  sizes="(min-width: 1024px) 448px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(160deg, transparent 50%, #071C26BB)" }} />
              </div>
              <div className="bg-brand-deeper border-brand/30 absolute -bottom-5 -left-5 rounded-2xl border px-6 py-4 shadow-2xl">
                <div className="text-brand-light mb-1 text-xs font-bold tracking-widest uppercase">Proyek Selesai Tepat Waktu</div>
                <div className="font-display text-3xl leading-none font-black text-white">95%+</div>
              </div>
              <div className="font-display absolute -top-4 -right-4 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-bold text-white shadow-xl">
                Patuh OJK
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
