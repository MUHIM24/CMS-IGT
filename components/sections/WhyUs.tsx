const reasons = [
  {
    title: "Pengalaman di Sektor yang Menuntut Presisi",
    description:
      "Terbiasa membangun sistem untuk proses bisnis yang gak boleh salah — dari compliance OJK sampai alur approval kredit berlapis.",
  },
  {
    title: "Tim yang Terlibat Langsung",
    description:
      "Proyek ditangani tim inti, bukan outsource lepas — Anda berkomunikasi langsung dengan yang mengerjakan sistem Anda.",
  },
  {
    title: "Pendampingan Setelah Go-Live",
    description:
      "Dukungan berlanjut setelah serah terima proyek, bukan cuma sampai deployment selesai.",
  },
  {
    title: "Solusi Disesuaikan, Bukan Generik",
    description:
      "Setiap sistem dibangun sesuai proses kerja klien, bukan template satu ukuran untuk semua.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-brand-dark px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="bg-brand-light/15 text-brand-light inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
            Kenapa Kami
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold">
            Partner yang Bisa Diandalkan
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="font-display text-base font-bold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
