"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, UserCheckIcon } from "@/components/icons/figma-icons";
import { testimonials } from "@/lib/content/testimonials";

const AUTOPLAY_MS = 5000;

// Carousel geser (scroll-snap) + tombol panah + titik halaman. Jumlah halaman dihitung dari lebar scroll,
// jadi otomatis menyesuaikan 1 kartu (mobile), 2 (tablet), 4 (desktop).
export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setPageCount(Math.max(1, Math.round(track.scrollWidth / track.clientWidth)));
      setPage(Math.round(track.scrollLeft / track.clientWidth));
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Auto-geser tiap 5 detik. Berhenti selama kursor/fokus keyboard ada di section, 5 detik setelah
  // interaksi (sentuh, klik), saat tab browser tidak aktif, dan mati total kalau "kurangi animasi".
  const holdRef = useRef(false);
  const lastInteractionRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const track = trackRef.current;
      if (!track || holdRef.current || document.hidden) return;
      if (Date.now() - lastInteractionRef.current < AUTOPLAY_MS) return;
      const total = Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
      if (total < 2) return;
      const current = Math.round(track.scrollLeft / track.clientWidth);
      track.scrollTo({ left: ((current + 1) % total) * track.clientWidth, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, []);

  function markInteraction() {
    lastInteractionRef.current = Date.now();
  }

  function goTo(target: number) {
    const track = trackRef.current;
    if (!track) return;
    markInteraction();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <section className="bg-white py-24 lg:py-32">
      <div
        className="mx-auto max-w-7xl px-6 lg:px-10"
        onMouseEnter={() => (holdRef.current = true)}
        onMouseLeave={() => (holdRef.current = false)}
        onFocus={() => (holdRef.current = true)}
        onBlur={() => (holdRef.current = false)}
        onTouchStart={markInteraction}
        onPointerDown={markInteraction}
      >
        <h2 className="font-display text-text mb-3 text-3xl font-bold sm:text-4xl">
          Testimoni <span className="gradient-text">Klien</span>
        </h2>
        <p className="text-muted mb-2 text-base">Kepercayaan dan kepuasan klien adalah prioritas kami.</p>
        <p className="text-muted mb-10 text-xs">
          Contoh ilustrasi. Kutipan asli tersedia atas permintaan dengan seizin klien.
        </p>

        <div
          ref={trackRef}
          className="-mx-2 flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <div key={t.quote} className="w-full shrink-0 snap-start px-2 sm:w-1/2 lg:w-1/4">
              <figure className="border-border flex h-full flex-col rounded-2xl border bg-white p-6">
                <div className="mb-4 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote className="text-text mb-6 flex-1 text-base leading-relaxed">{t.quote}</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="bg-brand/10 text-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                    <UserCheckIcon />
                  </span>
                  <span>
                    <span className="font-display text-text block text-sm font-bold">{t.role}</span>
                    <span className="text-muted block text-sm">{t.company}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Testimoni sebelumnya"
              className="border-border text-text hover:border-brand-mid flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-colors duration-200 disabled:opacity-40"
            >
              <ChevronLeftIcon />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Halaman testimoni ${i + 1}`}
                  aria-current={i === page}
                  className="flex h-6 w-6 items-center justify-center"
                >
                  <span className={`h-2.5 rounded-full transition-all duration-200 ${i === page ? "bg-brand-mid w-6" : "bg-border w-2.5"}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(Math.min(pageCount - 1, page + 1))}
              disabled={page === pageCount - 1}
              aria-label="Testimoni berikutnya"
              className="border-border text-text hover:border-brand-mid flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-colors duration-200 disabled:opacity-40"
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
