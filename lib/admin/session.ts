// Sesi login dashboard /admin (tahap tampilan, akun dummy tunggal).
// Kredensial & kunci HANYA dari env (ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SESSION_SECRET), tidak pernah
// ditulis di kode karena repo GitHub publik. Env kosong = login ditolak (fail closed).
// Token = "username.kadaluarsa.tandaTangan" (HMAC-SHA256), disimpan di cookie httpOnly.
// Pakai Web Crypto supaya jalan di proxy.ts maupun Server Action.

export const SESSION_COOKIE = "igt_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 jam

const encoder = new TextEncoder();

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

function toBase64Url(bytes: ArrayBuffer) {
  let binary = "";
  for (const b of new Uint8Array(bytes)) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(getSecret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toBase64Url(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

// Bandingkan string dengan waktu konstan (hindari timing attack)
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function isAuthConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && getSecret());
}

export function checkCredentials(username: string, password: string) {
  if (!isAuthConfigured()) return false;
  return safeEqual(username, process.env.ADMIN_USERNAME!) && safeEqual(password, process.env.ADMIN_PASSWORD!);
}

export async function createSessionToken(username: string) {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `${username}.${expires}`;
  return `${payload}.${await sign(payload)}`;
}

export async function readSessionToken(token: string | undefined): Promise<{ username: string } | null> {
  if (!token || !getSecret()) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [username, expires, signature] = parts;
  if (Number(expires) < Math.floor(Date.now() / 1000)) return null;
  const expected = await sign(`${username}.${expires}`);
  return safeEqual(signature, expected) ? { username } : null;
}
