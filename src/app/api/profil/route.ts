import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // adapte si nécessaire

export async function PATCH(req: Request) {
  const body = await req.json();
  const { email, profil_picture_id, username } = body;

  if (!email) {
    return NextResponse.json({ error: "Email requis" }, { status: 400 });
  }

  try {
    const fields: string[] = [];
    const values: any[] = [];

    if (profil_picture_id !== undefined) {
      fields.push("profil_picture_id = ?");
      values.push(profil_picture_id);
    }

    if (username !== undefined) {
      fields.push("username = ?");
      values.push(username);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { error: "Aucune donnée à mettre à jour" },
        { status: 400 }
      );
    }

    values.push(email);
    const sql = `UPDATE user SET ${fields.join(", ")} WHERE email = ?`;

    await db.query(sql, values);

    return NextResponse.json({ message: "Utilisateur mis à jour" });
  } catch (err) {
    console.error("❌ Erreur SQL dans PATCH /api/profil :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
