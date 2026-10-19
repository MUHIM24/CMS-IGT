"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkCredentials, createSessionToken, isAuthConfigured, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/admin/session";

export interface LoginState {
  error?: string;
  // Dikembalikan supaya kolom username tidak kosong setelah gagal (React 19 me-reset form setelah action)
  username?: string;
}

// Hanya izinkan redirect ke halaman dalam /admin (cegah open redirect lewat ?next=)
function safeNext(next: FormDataEntryValue | null) {
  const value = typeof next === "string" ? next : "";
  return value.startsWith("/admin/") && !value.startsWith("//") ? value : "/admin/dashboard";
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAuthConfigured()) {
    return { error: "Login belum dikonfigurasi di server (ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET)." };
  }
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!checkCredentials(username, password)) {
    return { error: "Username atau password salah.", username };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect(safeNext(formData.get("next")));
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
