import { SectionLabel } from "@/components/shared/SectionLabel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Apa itu CNV Robot SLIK dan bagaimana cara kerjanya?",
    a: "CNV Robot SLIK adalah sistem robotic automation yang terhubung langsung ke portal SLIK OJK. Ketika data calon debitur diinput, robot secara otomatis melakukan pengecekan riwayat kredit dan mengembalikan hasilnya ke sistem Anda, tanpa intervensi manual, lebih cepat, dan minim human error.",
  },
  {
    q: "Apakah sistem yang dibangun sudah sesuai regulasi OJK?",
    a: "Ya. Seluruh sistem keuangan yang kami kembangkan dirancang mengikuti ketentuan POJK yang berlaku, dilengkapi audit trail lengkap, enkripsi data nasabah, dan laporan yang siap audit oleh regulator.",
  },
  {
    q: "Berapa lama waktu pengembangan untuk Core Finance System?",
    a: "Rata-rata implementasi Core Finance System membutuhkan 3-6 bulan. Kami menggunakan metodologi Agile dengan sprint dua mingguan sehingga klien dapat memantau progress secara rutin.",
  },
  {
    q: "Apakah aplikasi mobile mendukung iOS dan Android?",
    a: "Ya. Semua aplikasi mobile kami tersedia untuk Android dan iOS, dikembangkan dengan pendekatan cross-platform agar performa optimal di kedua platform.",
  },
  {
    q: "Apakah source code menjadi milik klien setelah proyek selesai?",
    a: "Sepenuhnya ya. Setelah proyek selesai dan pembayaran dilunasi, seluruh source code, dokumentasi teknis, dan aset proyek diserahkan kepada klien tanpa syarat tambahan.",
  },
  {
    q: "Apakah ada layanan pemeliharaan setelah sistem go-live?",
    a: "Ya. Kami menyediakan paket pemeliharaan pasca-launch mencakup perbaikan bug, pembaruan keamanan, peningkatan fitur, serta dukungan teknis sesuai SLA yang disepakati bersama.",
  },
];

export function FAQ() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-14 text-center">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display text-text mb-4 text-3xl font-bold sm:text-4xl">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-muted text-base leading-relaxed">Belum menemukan jawaban yang Anda cari? Hubungi tim kami langsung.</p>
        </div>
        <Accordion className="gap-3 space-y-3" defaultValue={["faq-0"]}>
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-surface border-border data-open:border-brand overflow-hidden rounded-2xl border px-7"
            >
              <AccordionTrigger className="font-display text-text py-5 text-base font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted text-base leading-relaxed">{faq.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
