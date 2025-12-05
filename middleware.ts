import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/.*|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|__nextjs/.*).*)",
  ],
};
