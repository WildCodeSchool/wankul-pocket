import { userMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { UserModel } from "@/model/UserModel";
import { NextResponse } from "next/server";

interface UpdateResult {
  affectedRows: number;
  warningStatus?: number;
}

export async function PATCH(req: Request) {
  try {
    const payload = (await req.json()) as UserModel;
    const { id, username, email, bananas, profil_picture_id, profil_id } =
      payload;
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: userMessages.invalidId },
        { status: 400 }
      );
    }
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof bananas !== "number" ||
      typeof profil_picture_id !== "number" ||
      typeof profil_id !== "number" ||
      username.trim() === "" ||
      email.trim() === "" ||
      username.length > 100 ||
      email.length > 100 ||
      bananas < 0 ||
      profil_picture_id <= 0 ||
      profil_id <= 0
    ) {
      return NextResponse.json(
        { error: userMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "UPDATE user SET username = ?, email = ?, bananas = ?, profil_picture_id = ?, profil_id = ? WHERE id = ?",
      [username.trim(), email.trim(), bananas, profil_picture_id, profil_id, id]
    )) as [UpdateResult, unknown];

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

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const userId = idParam !== null ? parseInt(idParam, 10) : NaN;

    if (isNaN(userId)) {
      return NextResponse.json(
        { error: userMessages.invalidId },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM user WHERE id = ?", [userId]);
    return NextResponse.json({ message: userMessages.deleted });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json({ error: userMessages.server }, { status: 500 });
  }
}
