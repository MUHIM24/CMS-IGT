import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Font dashboard mengikuti referensi BuildWithAngga (Poppins); situs publik tetap Outfit + DM Sans.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Dashboard tidak boleh diindeks (lapis ketiga, selain robots.txt Disallow & header X-Robots-Tag dari proxy.ts)
export const metadata: Metadata = {
  title: { default: "Dashboard | PT IGT", template: "%s | Dashboard PT IGT" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // shrink-0: body memakai flex kolom; tanpa ini pembungkus menyusut ke tinggi layar dan latar body (lebih terang) terlihat di bawahnya
  return <div className={`${poppins.className} bg-admin-bg text-text min-h-screen shrink-0`}>{children}</div>;
}
