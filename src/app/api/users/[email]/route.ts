import { userMessages } from "@/data/responseMessages";
import { checkUserAuth } from "@/lib/checkUserAuth";
import { db } from "@/lib/db";
import { UserModel } from "@/model/UserModel";
import { NextRequest, NextResponse } from "next/server";

interface UpdateResult {
  affectedRows: number;
  warningStatus?: number;
}

export async function GET(_req: NextRequest) {
  const pathname = _req.nextUrl.pathname;
  const userEmail = pathname.split("/").pop();
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

export async function PATCH(req: Request) {
  try {
    const { email, profil_picture_id, username } = await req.json();
    const auth = await checkUserAuth(email);
    if (!auth.authorized) return auth.response;

    const fieldsToUpdate: string[] = [];
    const values: (string | number)[] = [];

    if (profil_picture_id !== undefined) {
      fieldsToUpdate.push("profil_picture_id = ?");
      values.push(profil_picture_id);
    }

    if (username !== undefined) {
      fieldsToUpdate.push("username = ?");
      values.push(username);
    }

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json(
        { error: "Aucun champ à mettre à jour." },
        { status: 400 }
      );
    }

    const sql = `UPDATE user SET ${fieldsToUpdate.join(", ")} WHERE email = ?`;
    values.push(email);

    const [result] = (await db.query(sql, values)) as [UpdateResult, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: userMessages.notFound || "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: userMessages.updateSuccess });
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error);
    return NextResponse.json({ error: userMessages.server }, { status: 500 });
  }
}
