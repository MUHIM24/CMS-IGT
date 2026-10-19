import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { readSessionToken, SESSION_COOKIE } from "@/lib/admin/session";

// Semua halaman panel (selain login). Sesi dicek lagi di server sebagai lapis kedua setelah proxy.ts.
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await readSessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");
  return <AdminShell username={session.username}>{children}</AdminShell>;
}
