import { siteSettings } from "@/lib/content/site-settings";

// Belum ada form pengiriman pesan: data kontak resmi (email/telepon/alamat) belum tersedia,
// dan integrasi backend/CMS masih Fase 2 (lihat specs/02-plan.md ADR-3). Menampilkan form
// yang gak benar-benar bisa ngirim pesan melanggar antislop R-26, jadi sengaja belum dibuat.
export function ContactInfo() {
  const fields = [
    { label: "Alamat", value: siteSettings.officeAddress },
    { label: "Telepon", value: siteSettings.phone },
    { label: "Email", value: siteSettings.email },
  ];

  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="bg-brand/10 text-brand inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
          Kontak
        </span>
        <h1 className="font-display text-text mt-5 text-3xl font-bold">
          Hubungi Kami
        </h1>
        <p className="text-muted mt-4">
          Kanal kontak resmi sedang disiapkan. Sementara ini, informasi di bawah akan
          diperbarui begitu tersedia.
        </p>

        <div className="border-border mt-10 grid gap-4 rounded-2xl border bg-white p-6 text-left sm:grid-cols-3">
          {fields.map((field) => (
            <div key={field.label}>
              <div className="text-muted text-xs font-bold tracking-wider uppercase">
                {field.label}
              </div>
              <div className="text-text mt-1 text-sm font-medium">
                {field.value || "Segera diisi"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
