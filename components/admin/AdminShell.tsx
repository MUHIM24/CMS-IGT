"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, KeyRound, LogOut, Menu, UserCircle, X } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { adminNav } from "@/lib/admin/nav";
import { CommandPalette } from "@/components/admin/CommandPalette";
import { NotificationMenu } from "@/components/admin/NotificationMenu";

// Kerangka dashboard: topbar + sidebar kartu (profil + menu berkelompok), gaya BuildWithAngga.
// Desktop: sidebar menempel di kiri. Mobile: sidebar jadi panel geser dari kiri.
function Avatar({ size }: { size: number }) {
  return (
    <span className="block overflow-hidden rounded-full" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <rect width="100" height="100" className="fill-surface-2" />
        <circle cx="50" cy="38" r="18" className="fill-brand" />
        <ellipse cx="50" cy="96" rx="36" ry="30" className="fill-brand" />
      </svg>
    </span>
  );
}

// Menu pengguna di avatar (permintaan user): Profil Saya, Ubah Password, Keluar.
// Gaya sorot ditimpa ke biru muda (bawaan shadcn memakai token accent = oranye brand).
const menuItemClass =
  "text-text flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 text-base focus:bg-surface-2 focus:text-brand-mid data-highlighted:bg-surface-2 data-highlighted:text-brand-mid not-data-[variant=destructive]:focus:**:text-brand-mid [&_svg:not([class*=size-])]:size-5";

function UserMenu({ username }: { username: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Menu akun"
        className="hover:bg-white/70 data-popup-open:bg-white flex items-center gap-3 rounded-full py-1 pr-2 pl-1 transition-colors md:pl-4"
      >
        <span className="hidden text-base font-medium capitalize md:inline">Halo, {username}</span>
        <Avatar size={44} />
        <ChevronDown size={18} className="text-muted transition-transform duration-200 [[data-popup-open]_&]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="border-border w-64 rounded-2xl border bg-white p-2 shadow-xl ring-0">
        <div className="border-border mb-1 flex items-center gap-3 border-b px-3 pt-2 pb-3">
          <Avatar size={40} />
          <div className="min-w-0">
            <div className="truncate font-semibold capitalize">{username}</div>
            <div className="text-muted text-sm">Administrator</div>
          </div>
        </div>
        <DropdownMenuItem className={menuItemClass} render={<Link href="/admin/profil" />}>
          <UserCircle /> Profil Saya
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass} render={<Link href="/admin/ubah-password" />}>
          <KeyRound /> Ubah Password
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-0 my-1" />
        <DropdownMenuItem className={menuItemClass} onClick={() => logout()}>
          <LogOut /> Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarContent({ username, onNavigate }: { username: string; onNavigate: () => void }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Menu aktif di bagian bawah (mis. Ubah Password) bisa tersembunyi di sidebar yang di-scroll: gulirkan ke sana
  useEffect(() => {
    const active = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    const box = navRef.current?.closest<HTMLElement>(".overflow-y-auto");
    if (!active || !box) return;
    const top = active.getBoundingClientRect().top - box.getBoundingClientRect().top;
    // Hanya kotak sidebar yang digulir (bukan halaman), dan hanya kalau item aktif di luar area terlihat
    if (top < 0 || top > box.clientHeight - active.offsetHeight) box.scrollTop += top - box.clientHeight / 2;
  }, [pathname]);

  return (
    <>
      <div className="mb-8">
        <Avatar size={80} />
        <div className="mt-4 text-lg font-bold capitalize">{username}</div>
        <div className="text-muted text-sm">Administrator</div>
      </div>
      <nav ref={navRef} aria-label="Menu dashboard" className="space-y-6">
        {adminNav.map((group) => (
          <div key={group.label}>
            <div className="text-muted mb-2 text-xs font-semibold tracking-wider uppercase">{group.label}</div>
            <ul className="space-y-1">
              {group.items.map(({ label, href, icon: Icon, ready }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                if (!ready) {
                  return (
                    <li key={href}>
                      <span className="text-muted flex min-h-11 cursor-not-allowed items-center gap-3 rounded-2xl px-3 text-base" title="Segera hadir">
                        <Icon size={22} strokeWidth={1.75} className="shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{label}</span>
                        <span className="bg-surface-2 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold">Segera</span>
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center gap-3 rounded-2xl px-3 text-base transition-colors duration-150 ${
                        active ? "bg-surface-2 text-brand-mid font-semibold" : "text-text hover:text-brand-mid"
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.75} className="shrink-0" />
                      <span className="min-w-0 truncate">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <form action={logout} className="border-border mt-8 border-t pt-6">
        <button type="submit" className="text-muted hover:text-brand-dark flex min-h-11 w-full items-center gap-3 rounded-2xl px-3 text-base">
          <LogOut size={22} strokeWidth={1.75} /> Keluar
        </button>
      </form>
    </>
  );
}

export function AdminShell({ username, children }: { username: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10">
      <header className="flex h-20 items-center justify-between gap-4 lg:h-24">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Buka menu dashboard"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white lg:hidden"
          >
            <Menu size={22} />
          </button>
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <Image src="/logo-icon.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
            <span className="hidden leading-tight sm:block">
              <span className="block text-lg font-bold">PT IGT</span>
              <span className="text-muted block text-sm">Dashboard Website</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lihat situs (tab baru)"
            className="text-text hover:text-brand-mid flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium"
          >
            <ExternalLink size={18} /> <span className="hidden xl:inline">Lihat Situs</span>
          </a>
          <CommandPalette />
          <NotificationMenu />
          <UserMenu username={username} />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl bg-white p-6 xl:p-7">
            <SidebarContent username={username} onNavigate={() => {}} />
          </div>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>

      {/* Sidebar mobile */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible"}`} aria-hidden={!open}>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Tutup menu dashboard"
          onClick={() => setOpen(false)}
          className={`bg-brand-deeper/50 absolute inset-0 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={`absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-4 flex justify-end">
            <button type="button" onClick={() => setOpen(false)} aria-label="Tutup menu dashboard" className="flex h-11 w-11 items-center justify-center">
              <X size={22} />
            </button>
          </div>
          <SidebarContent username={username} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}
