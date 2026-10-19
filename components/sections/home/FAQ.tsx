import { SectionLabel } from "@/components/shared/SectionLabel";
import { faqs } from "@/lib/content/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
          {faqs.map((faq, i) => (
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
