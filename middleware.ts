import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const PUBLIC_PREFIX = [
  "/_next",
  "/assets",
  "/public",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

const API_BASE_PATH = "/api/v1";

function isPublic(pathname: string) {
  if (PUBLIC_PREFIX.some((p) => pathname.startsWith(p))) return true;
  return AUTH_ROUTES.includes(pathname);
}

function getVerifyUrl(req: NextRequest) {
  return new URL(`${API_BASE_PATH}/auth/verify`, req.nextUrl.origin).toString();
}

async function verifySession(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") ?? "";
  if (!cookieHeader) return false;

  try {
    const res = await fetch(getVerifyUrl(req), {
      method: "GET",
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (isPublic(pathname)) return NextResponse.next();

  const ok = await verifySession(req);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (!ok && !isAuthRoute) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(url);
  }

  if (ok && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/.*|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
