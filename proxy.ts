import { NextResponse, type NextRequest } from "next/server";
import { readSessionToken, SESSION_COOKIE } from "@/lib/admin/session";

// Kunci semua halaman /admin kecuali /admin/login. Juga menempelkan X-Robots-Tag noindex
// supaya dashboard tidak pernah masuk Google (lapis kedua selain robots.txt & metadata).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === "/admin/login";

  let response: NextResponse;
  if (!session && !isLogin) {
    const url = new URL("/admin/login", request.url);
    if (pathname !== "/admin") url.searchParams.set("next", pathname);
    response = NextResponse.redirect(url);
  } else if (session && (isLogin || pathname === "/admin")) {
    response = NextResponse.redirect(new URL("/admin/dashboard", request.url));
  } else {
    response = NextResponse.next();
  }
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
