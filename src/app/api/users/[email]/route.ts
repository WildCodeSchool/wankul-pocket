import { userMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { UserModel } from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { email: string } }
) {
  const userEmail = params.email;
  if (typeof userEmail !== "string") {
    return NextResponse.json(
      { error: userMessages.invalidEmail },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT u.id, u.username, u.email, u.created_at, u.bananas, u.profil_picture_id, u.profil_id, p.image_path AS profil_picture_url FROM user AS u JOIN profil_picture AS p ON p.id = u.profil_picture_id WHERE u.email = ?",
      [userEmail]
    );
    const results = Array.isArray(rows) ? (rows as UserModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: userMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/users/[email]) :", error);
    return NextResponse.json({ error: userMessages.server }, { status: 500 });
  }
}
