import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/users")) {
    return NextResponse.redirect(new URL("/landingpage", request.url));
  }

  if (token && pathname === "/landingpage") {
    return NextResponse.redirect(new URL("/homepage", request.url));
  }

  if (!token && pathname !== "/landingpage") {
    return NextResponse.redirect(new URL("/landingpage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
