import { ChatIcon, SendIcon } from "@/components/icons/figma-icons";

const inputClass =
  "border-border text-text placeholder:text-muted w-full rounded-xl border bg-white px-4 py-3 text-base outline-none disabled:cursor-not-allowed disabled:bg-surface";

// Kolom komentar (tampilan saja, sesuai keputusan user: blog statis dulu).
// Belum ada database, jadi form sengaja NONAKTIF + keterangan jujur, supaya pengunjung tidak mengira
// komentarnya terkirim. Aktifkan di Fase 2 (CMS/database): simpan komentar + moderasi + tampilkan daftar.
export function CommentSection() {
  return (
    <section id="komentar" className="mt-12 scroll-mt-28">
      <h2 className="font-display text-text mb-5 flex items-center gap-2.5 text-2xl font-bold">
        <span className="text-brand-mid">
          <ChatIcon />
        </span>
        Komentar (0)
      </h2>
      <div className="border-border rounded-2xl border p-6">
        <h3 className="font-display text-text mb-4 text-base font-bold">Tinggalkan Komentar</h3>
        <form aria-describedby="komentar-status">
          <fieldset disabled className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-text mb-2 block text-sm font-semibold">
                  Nama <span className="text-accent-text">*</span>
                </span>
                <input type="text" placeholder="Nama Anda" className={inputClass} />
              </label>
              <label className="block">
                <span className="text-text mb-2 block text-sm font-semibold">Email</span>
                <input type="email" placeholder="Email (opsional, tidak ditampilkan)" className={inputClass} />
              </label>
            </div>
            <label className="block">
              <span className="text-text mb-2 block text-sm font-semibold">
                Komentar <span className="text-accent-text">*</span>
              </span>
              <textarea rows={4} placeholder="Tulis komentar Anda di sini..." className={`${inputClass} resize-y`} />
            </label>
            <button
              type="submit"
              className="bg-brand-mid flex min-h-11 items-center gap-2 rounded-full px-6 text-base font-bold text-white disabled:opacity-50"
            >
              Kirim Komentar <SendIcon />
            </button>
          </fieldset>
        </form>
        <p id="komentar-status" className="text-muted mt-4 text-sm">
          Fitur komentar segera aktif. Sementara itu, diskusikan pertanyaan Anda langsung dengan tim kami melalui
          tombol WhatsApp.
        </p>
      </div>
    </section>
  );
}
