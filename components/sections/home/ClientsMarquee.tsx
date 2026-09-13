import { SectionLabel } from "@/components/shared/SectionLabel";
import { clients } from "@/lib/content/clients";

// Logo resmi klien belum tersedia/diizinkan buat dipasang — sementara pakai chip nama teks
// dulu. Begitu file logo resmi + izin pemakaiannya siap, ganti <span> di MarqueeRow jadi
// <Image src={client.logo} .../>.
function MarqueeRow({ direction }: { direction: "left" | "right" }) {
  const items = [...clients, ...clients, ...clients];

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex w-max gap-4 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
      >
        {items.map((name, i) => (
          <div
            key={i}
            className="border-border flex h-16 shrink-0 items-center justify-center rounded-xl border bg-white px-8"
          >
            <span className="text-muted font-display text-sm font-semibold whitespace-nowrap">{name}</span>
          </div>
        ))}
      </div>
      <div className="from-surface pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent" />
      <div className="from-surface pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent" />
    </div>
  );
}

export function ClientsMarquee() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Klien Kami</SectionLabel>
          <h2 className="font-display text-text text-3xl font-bold sm:text-4xl">Dipercaya oleh</h2>
        </div>
        <div className="space-y-4">
          <MarqueeRow direction="left" />
          <MarqueeRow direction="right" />
        </div>
      </div>
    </section>
  );
}
