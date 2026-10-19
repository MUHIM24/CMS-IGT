import { CheckIcon } from "@/components/icons/figma-icons";
import type { ArticleBlock, ArticleSection } from "@/lib/content/articles";

// Render isi artikel dari blok terstruktur (paragraf, daftar, kartu, langkah, sorotan).
function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-muted mb-4 text-base leading-relaxed">{block.text}</p>;

    case "list":
      return (
        <ul className="mb-4 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="text-muted flex gap-3 text-base leading-relaxed">
              <span className="bg-brand/10 text-brand-mid mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                <CheckIcon />
              </span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "cards":
      return (
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => (
            <div key={item.title} className="border-border rounded-2xl border p-5">
              <span className="bg-brand/10 text-brand-mid mb-3 flex h-8 w-8 items-center justify-center rounded-lg">
                <CheckIcon />
              </span>
              <div className="font-display text-text mb-1 text-base font-bold">{item.title}</div>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      );

    case "steps":
      return (
        <ol className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span className="bg-brand-mid font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <div className="font-display text-text mb-1 text-base font-bold">{item.title}</div>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "highlights":
      return (
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.label} className="bg-surface-2 rounded-2xl p-6">
              <div className="text-muted mb-1 text-sm font-semibold">{item.label}</div>
              <div className="font-display text-brand-mid mb-2 text-2xl font-bold sm:text-3xl">{item.value}</div>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      );
  }
}

export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-28">
          <h2 className="font-display text-text mb-4 text-2xl font-bold">{s.heading}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </section>
      ))}
    </div>
  );
}
