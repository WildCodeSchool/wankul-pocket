import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicPaths = ["/landingpage"];
const ALLOWED = [
  process.env.ALLOWED_ORIGIN_LOCAL!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const origin = request.headers.get("origin") || "";
  const res = NextResponse.next();

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

  if (ALLOWED.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PATCH,DELETE,OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization"
    );
    res.headers.set("Access-Control-Allow-Credentials", "true");
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: res.headers });
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|Laink|Terracid|headerLogo.png).*)",
  ],
};
