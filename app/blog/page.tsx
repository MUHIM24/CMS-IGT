import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — PT Inovasi Gatarawana Teknologi",
  description: "Artikel dan insight seputar teknologi, segera hadir.",
};

export default function BlogPage() {
  return (
    <section className="bg-surface px-6 py-24 text-center">
      <span className="bg-brand/10 text-brand inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wide uppercase">
        Blog
      </span>
      <h1 className="font-display text-text mt-5 text-3xl font-bold">Segera Hadir</h1>
      <p className="text-muted mx-auto mt-4 max-w-md">
        Kami sedang menyiapkan artikel seputar teknologi. Kembali lagi nanti.
      </p>
    </section>
  );
}
