import {
  BarChart3,
  Briefcase,
  Building2,
  Headset,
  HelpCircle,
  Image as ImageIcon,
  Info,
  KeyRound,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  Newspaper,
  Package,
  Phone,
  Settings,
  Sparkles,
  Star,
  UserCircle,
  UserCog,
  Users,
} from "lucide-react";

// Struktur menu dashboard, mengikuti pola IzinPro (lib/admin-nav.ts) tapi disesuaikan konten PT IGT.
// ready=false: halaman belum dibuat (tahap berikutnya), tampil sebagai "Segera" dan tidak bisa diklik.
export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  ready: boolean;
}

export const adminNav: { label: string; items: AdminNavItem[] }[] = [
  {
    label: "Utama",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, ready: true },
      { label: "Analitik", href: "/admin/analitik", icon: BarChart3, ready: true },
    ],
  },
  {
    label: "Konten",
    items: [
      { label: "Blog & Artikel", href: "/admin/blog", icon: Newspaper, ready: true },
      { label: "Komentar", href: "/admin/komentar", icon: MessageSquare, ready: true },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon, ready: true },
    ],
  },
  {
    label: "Company Profile",
    items: [
      { label: "Hero Beranda", href: "/admin/beranda", icon: Sparkles, ready: true },
      { label: "Tentang Kami", href: "/admin/tentang-kami", icon: Info, ready: true },
      { label: "Layanan", href: "/admin/layanan", icon: Package, ready: true },
      { label: "Portfolio", href: "/admin/portfolio", icon: Briefcase, ready: true },
      { label: "Tim", href: "/admin/tim", icon: Users, ready: true },
      { label: "Testimoni", href: "/admin/testimoni", icon: Star, ready: true },
      { label: "Klien", href: "/admin/klien", icon: Building2, ready: true },
      { label: "FAQ", href: "/admin/faq", icon: HelpCircle, ready: true },
      { label: "Kontak", href: "/admin/kontak", icon: Phone, ready: true },
      { label: "CTA Banner", href: "/admin/cta-banner", icon: Headset, ready: true },
    ],
  },
  {
    label: "Sistem",
    items: [
      { label: "Pengguna", href: "/admin/pengguna", icon: UserCog, ready: true },
      { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings, ready: true },
    ],
  },
  {
    label: "Akun",
    items: [
      { label: "Profil Saya", href: "/admin/profil", icon: UserCircle, ready: true },
      { label: "Ubah Password", href: "/admin/ubah-password", icon: KeyRound, ready: true },
    ],
  },
];
