import Link from "next/link";
import { JsonLd } from "@/components/shared/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/structured-data";
import type { LegalDocument } from "@/lib/content/legal";

const dateFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });

// Halaman teks legal (Kebijakan Privasi, Syarat Layanan): hero ringkas tanpa foto, isi satu kolom yang nyaman dibaca.
export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: doc.title, path: doc.path }])} />
      <section className="bg-surface-2 pt-[72px]">
        <div className="mx-auto max-w-3xl px-6 pt-10 pb-12 lg:px-10 lg:pt-14 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-muted mb-5 flex items-center gap-2 text-sm">
            <Link href="/" className="hover:text-brand-dark underline-offset-4 transition-colors duration-150 hover:underline">
              Beranda
            </Link>
            <span aria-hidden="true">&rsaquo;</span>
            <span className="text-text font-medium">{doc.title}</span>
          </nav>
          <h1 className="font-display text-text mb-3 text-4xl font-bold sm:text-5xl">{doc.title}</h1>
          <p className="text-muted text-sm">Terakhir diperbarui {dateFormatter.format(new Date(doc.updatedAt))}</p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-text mb-10 text-base leading-relaxed sm:text-lg">{doc.intro}</p>
          <div className="space-y-10">
            {doc.sections.map((section, i) => (
              <div key={section.heading}>
                <h2 className="font-display text-text mb-3 text-xl font-bold sm:text-2xl">
                  {i + 1}. {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p key={p} className="text-muted mb-3 text-base leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.items && (
                  <ul className="text-muted mb-3 list-disc space-y-2 pl-5 text-base leading-relaxed">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.note && <p className="text-muted text-base leading-relaxed">{section.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
