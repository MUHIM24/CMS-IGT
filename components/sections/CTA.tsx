import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-brand-dark px-6 py-20 text-center text-white">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold">
          Mari Bangun Solusi Teknologi <span className="gradient-text">yang Tepat</span>
        </h2>
        <p className="mt-4 text-white/60">
          Ceritakan kebutuhan bisnis Anda, tim kami bantu cari solusinya.
        </p>
        <Link
          href="/kontak"
          className="bg-accent hover:bg-accent-light mt-8 inline-block rounded-xl px-8 py-4 text-sm font-bold text-white transition-colors"
        >
          Konsultasi Gratis
        </Link>
      </div>
    </section>
  );
}
