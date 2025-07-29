// lib/auth/checkUserAuth.ts
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function checkUserAuth(expectedEmail?: string) {
  const session = await getServerSession(authOptions);
  const sessionUserEmail = session?.user?.email;

  if (!sessionUserEmail) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      ),
    };
  }

  if (expectedEmail && sessionUserEmail !== expectedEmail) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Utilisateur non autorisé" },
        { status: 401 }
      ),
    };
  }

  return {
    authorized: true,
    email: sessionUserEmail,
  };
}
