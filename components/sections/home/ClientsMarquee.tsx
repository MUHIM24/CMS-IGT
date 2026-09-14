import Image from "next/image";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { clients } from "@/lib/content/clients";

// Baru ada 2 logo klien resmi - marquee auto-scroll dinonaktifkan dulu (kurang natural buat
// cuma 2 item). Aktifkan lagi (lihat git history commit sebelum ini buat versi animasinya)
// begitu jumlah logo klien nambah jadi ~5+.
export function ClientsMarquee() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>Klien Kami</SectionLabel>
          <h2 className="font-display text-text text-3xl font-bold sm:text-4xl">Dipercaya oleh</h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="border-border flex h-24 w-48 items-center justify-center rounded-xl border bg-white p-4"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={160}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
