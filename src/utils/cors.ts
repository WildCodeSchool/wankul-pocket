import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://wankulpocket.fr",
  "https://wankul-pocket.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export function getCorsHeaders(
  origin: string | null
): Record<string, string> | null {
  if (!origin) {
    return {};
  }

  if (allowedOrigins.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
  }

  return null;
}

export async function handleOptionsRequest(request: NextRequest) {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (!origin) {
    return new NextResponse(null, { status: 204 });
  }

  if (!corsHeaders) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
