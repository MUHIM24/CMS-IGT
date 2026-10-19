import { redirect } from "next/navigation";

// /admin -> dashboard (proxy.ts sudah mengalihkan ke login kalau belum masuk)
export default function AdminIndex() {
  redirect("/admin/dashboard");
}
