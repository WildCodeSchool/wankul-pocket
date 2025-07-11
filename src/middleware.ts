import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicPaths = ["/landingpage"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublicPath = publicPaths.includes(pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/landingpage", request.url));
  }

  if (token && pathname === "/landingpage") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|Laink|Terracid|headerLogo.png).*)",
  ],
};
