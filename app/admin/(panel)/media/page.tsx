import type { Metadata } from "next";
import { MediaLibrary, type MediaItem } from "@/components/admin/MediaLibrary";
import { PageHeader } from "@/components/admin/ui";
import { articles } from "@/lib/content/articles";
import { caseStudies } from "@/lib/content/case-studies";
import { clients } from "@/lib/content/clients";
import { services } from "@/lib/content/services";

export const metadata: Metadata = { title: "Media Library" };

// Nama file dari URL Unsplash / path lokal, supaya mudah dikenali
function fileName(url: string) {
  const path = url.split("?")[0];
  return path.split("/").pop() ?? path;
}

// Kumpulkan semua gambar yang benar-benar dipakai situs (tanpa duplikat), beserta lokasinya
function collectMedia(): MediaItem[] {
  const map = new Map<string, MediaItem>();
  // judul & alt diambil dari pemakaian pertama (sama dengan yang tayang di situs)
  const add = (url: string, kind: MediaItem["kind"], usedIn: string, title: string, alt: string) => {
    const existing = map.get(url);
    if (existing) existing.usedIn.push(usedIn);
    else map.set(url, { url, name: fileName(url), kind, title, alt, usedIn: [usedIn] });
  };
  clients.forEach((c) => add(c.logo, "Logo", `Logo klien: ${c.name}`, `Logo ${c.name}`, `Logo ${c.name}`));
  services.forEach((s) => add(s.img, "Foto", `Layanan: ${s.title}`, s.title, s.imgAlt));
  caseStudies.forEach((p) => add(p.img, "Foto", `Portfolio: ${p.title}`, p.title, p.title));
  articles.forEach((a) => add(a.img, "Foto", `Artikel: ${a.title}`, a.title, a.imgAlt));
  return [...map.values()];
}

export default function MediaPage() {
  const items = collectMedia();
  return (
    <>
      <PageHeader title="Media Library" subtitle={`${items.length} gambar dipakai di situs`} />
      <MediaLibrary items={items} />
    </>
  );
}
