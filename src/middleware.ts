import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/landingpage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!landingpage|_next|api|favicon.ico).*)"],
};
