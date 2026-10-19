"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, ExternalLink, type LucideIcon, Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { adminNav } from "@/lib/admin/nav";

// "Cari atau ketik perintah" (Ctrl/Cmd + K), pola IzinPro. Mencari halaman dashboard yang sudah ada + aksi cepat.
interface Command {
  label: string;
  group: string;
  icon: LucideIcon;
  run: (router: ReturnType<typeof useRouter>) => void;
}

const COMMANDS: Command[] = [
  { label: "Tulis Artikel", group: "Aksi cepat", icon: Plus, run: (r) => r.push("/admin/blog/baru") },
  { label: "Tambah Layanan", group: "Aksi cepat", icon: Plus, run: (r) => r.push("/admin/layanan/baru") },
  { label: "Lihat Situs", group: "Aksi cepat", icon: ExternalLink, run: () => window.open("/", "_blank", "noopener,noreferrer") },
  ...adminNav.flatMap((g) =>
    g.items.filter((i) => i.ready).map((i) => ({ label: i.label, group: g.label, icon: i.icon, run: (r: ReturnType<typeof useRouter>) => r.push(i.href) })),
  ),
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  // Ctrl/Cmd + K membuka dari halaman mana pun di dashboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)) : COMMANDS;
  }, [query]);

  function openChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setQuery("");
      setActive(0);
    }
  }

  function run(cmd: Command | undefined) {
    if (!cmd) return;
    openChange(false);
    cmd.run(router);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Cari atau ketik perintah (Ctrl+K)"
        className="text-admin-placeholder hover:text-text flex h-11 items-center gap-3 rounded-full bg-white px-3 text-sm transition-colors md:w-72 md:px-4"
      >
        <Search size={18} />
        <span className="hidden min-w-0 flex-1 truncate text-left whitespace-nowrap md:inline">Cari atau ketik perintah...</span>
        <kbd className="border-border hidden shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap md:inline">Ctrl K</kbd>
      </button>

      <Dialog open={open} onOpenChange={openChange}>
        <DialogContent showCloseButton={false} className="top-[15%] w-[calc(100%-2rem)] max-w-xl translate-y-0 gap-0 overflow-hidden rounded-3xl bg-white p-0 ring-0 shadow-2xl sm:max-w-xl">
          <DialogTitle className="sr-only">Cari atau ketik perintah</DialogTitle>
          <div className="border-border flex items-center gap-3 border-b px-5">
            <Search size={20} className="text-admin-placeholder shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((i) => Math.min(i + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  run(results[active]);
                }
              }}
              placeholder="Cari halaman atau aksi..."
              aria-label="Cari halaman atau aksi"
              aria-controls="command-results"
              aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
              className="text-text placeholder:text-admin-placeholder min-h-16 flex-1 bg-transparent text-base outline-none"
            />
            <kbd className="border-border text-admin-placeholder rounded-md border px-1.5 py-0.5 font-mono text-[11px]">Esc</kbd>
          </div>
          <ul id="command-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && <li className="text-admin-placeholder px-4 py-8 text-center text-sm">Tidak ada hasil untuk &ldquo;{query}&rdquo;</li>}
            {results.map((cmd, i) => (
              <li
                key={cmd.label}
                id={`cmd-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => run(cmd)}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl px-4 ${i === active ? "bg-surface-2 text-brand-mid" : "text-text"}`}
              >
                <cmd.icon size={20} strokeWidth={1.75} className="shrink-0" />
                <span className="flex-1 font-medium">{cmd.label}</span>
                <span className="text-admin-placeholder text-xs">{cmd.group}</span>
                {i === active && <CornerDownLeft size={16} className="shrink-0" />}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
