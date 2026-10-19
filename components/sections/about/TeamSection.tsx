import Image from "next/image";
import { LinkedinIcon } from "@/components/icons/figma-icons";
import { team } from "@/lib/content/team";

// Avatar placeholder (referensi user): lingkaran terang, siluet kepala + bahu warna brand. Dipakai sampai foto asli ada.
function AvatarPlaceholder() {
  return (
    <div className="h-28 w-28 overflow-hidden rounded-full" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <rect width="100" height="100" className="fill-surface-2" />
        <circle cx="50" cy="38" r="18" className="fill-brand" />
        <ellipse cx="50" cy="96" rx="36" ry="30" className="fill-brand" />
      </svg>
    </div>
  );
}

// Kartu tim: foto (atau placeholder kalau belum ada), nama/jabatan, tombol LinkedIn kalau URL-nya ada.
export function TeamSection() {
  return (
    // Padding bawah kecil: langsung disambung CtaCard yang sudah punya padding atas sendiri
    <section className="bg-white pt-20 pb-4 lg:pt-28 lg:pb-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <h2 className="font-display text-text mb-3 text-3xl font-bold sm:text-4xl">
            Tim <span className="gradient-text">Profesional</span> Kami
          </h2>
          <p className="text-muted mx-auto max-w-2xl text-base leading-relaxed">
            Didukung oleh tim ahli berpengalaman yang siap membantu kebutuhan sistem bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.role} className="border-border overflow-hidden rounded-2xl border bg-white">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-white">
                {m.photo ? (
                  <Image src={m.photo} alt={m.name ?? m.role} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                ) : (
                  <AvatarPlaceholder />
                )}
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <div className="font-display text-text text-base font-bold">{m.name ?? m.role}</div>
                  <div className="text-muted text-sm">{m.name ? m.role : m.focus}</div>
                </div>
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn ${m.name ?? m.role}`}
                    className="bg-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-brand-mid"
                  >
                    <LinkedinIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
