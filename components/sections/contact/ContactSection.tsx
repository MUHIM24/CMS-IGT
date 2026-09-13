"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MapPinIcon, PhoneIcon, MailIcon, LinkedinIcon, InstagramIcon, CheckIcon } from "@/components/icons/figma-icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { siteSettings, buildWhatsAppLink } from "@/lib/content/site-settings";

const CONTACT_ROWS = [
  { Icon: MapPinIcon, label: "Alamat", val: siteSettings.address },
  { Icon: PhoneIcon, label: "Telepon", val: siteSettings.phone },
  { Icon: MailIcon, label: "Email", val: siteSettings.email },
];

const SERVICE_OPTIONS = [
  "Web Apps",
  "CMS",
  "CNV Robot SLIK",
  "Core Finance System",
  "Mobile Approval",
  "Mobile LOS",
  "Mobile CMO",
  "Mobile CNV",
  "Konsultasi / Lainnya",
];

const inputClass = "h-auto rounded-xl border-border px-4 py-3 text-sm text-text focus-visible:border-brand focus-visible:ring-0";

export function ContactSection({
  showHeading = true,
  firstSection = false,
}: {
  showHeading?: boolean;
  firstSection?: boolean;
}) {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [`Halo PT Inovasi Gatarawana Teknologi, saya ${form.name}.`, `Email: ${form.email}`];
    if (form.company) lines.push(`Perusahaan: ${form.company}`);
    if (form.service) lines.push(`Layanan yang diminati: ${form.service}`);
    lines.push(`Kebutuhan: ${form.message}`);

    window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section className={`bg-surface ${firstSection ? "pt-32 pb-24 lg:pt-40 lg:pb-32" : "py-24 lg:py-32"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            {showHeading && (
              <>
                <SectionLabel>Hubungi Kami</SectionLabel>
                <h2 className="font-display text-text mb-5 text-3xl leading-tight font-bold sm:text-4xl">
                  Mari Diskusikan Kebutuhan Teknologi Anda
                </h2>
                <p className="text-muted mb-10 text-base leading-relaxed">
                  Tim kami siap merespons setiap pertanyaan dan permintaan konsultasi dalam satu hari kerja.
                  Tidak ada komitmen awal, cukup ceritakan kebutuhan Anda.
                </p>
              </>
            )}

            <div className="mb-10 space-y-5">
              {CONTACT_ROWS.map((row) => (
                <div key={row.label} className="flex gap-4">
                  <div className="bg-brand/10 text-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <row.Icon />
                  </div>
                  <div>
                    <div className="text-muted mb-0.5 text-xs font-black tracking-widest uppercase">{row.label}</div>
                    <div className="text-text text-sm font-medium">{row.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              {[LinkedinIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="border-border text-muted hover:bg-brand hover:border-brand flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-150 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="border-border rounded-2xl border bg-white p-8 shadow-sm">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div className="bg-brand mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white">
                  <CheckIcon />
                </div>
                <h3 className="font-display text-text mb-2 text-xl font-bold">WhatsApp Terbuka di Tab Baru</h3>
                <p className="text-muted mb-6 text-sm">
                  Pesan Anda sudah kami siapkan, tinggal ditekan kirim di WhatsApp untuk mengirimkannya ke tim kami.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-brand hover:text-brand-light text-sm font-semibold transition-colors duration-150"
                >
                  Isi pesan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-muted mb-2 block text-sm font-bold tracking-widest uppercase">Nama Lengkap *</label>
                    <Input
                      required
                      placeholder="Nama Anda"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-muted mb-2 block text-sm font-bold tracking-widest uppercase">Email *</label>
                    <Input
                      type="email"
                      required
                      placeholder="email@perusahaan.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-muted mb-2 block text-sm font-bold tracking-widest uppercase">Perusahaan</label>
                  <Input
                    placeholder="PT Nama Perusahaan Anda"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-muted mb-2 block text-sm font-bold tracking-widest uppercase">Layanan yang Diminati</label>
                  <Select value={form.service} onValueChange={(value) => setForm({ ...form, service: value ?? "" })}>
                    <SelectTrigger className={`w-full ${inputClass} justify-between`}>
                      <SelectValue placeholder="Pilih produk / layanan..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-muted mb-2 block text-sm font-bold tracking-widest uppercase">Kebutuhan / Pertanyaan *</label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Ceritakan kebutuhan sistem atau proyek Anda..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} h-auto resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="hover:bg-accent-light w-full rounded-xl bg-[var(--color-accent)] py-3.5 text-sm font-bold tracking-wide text-white transition-all duration-150 hover:shadow-lg active:scale-[0.98]"
                >
                  Kirim via WhatsApp
                </button>
                <p className="text-muted text-center text-sm">
                  Tombol ini membuka WhatsApp dengan pesan yang sudah terisi otomatis dari form di atas.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
