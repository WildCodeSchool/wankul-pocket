import { userMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { UserModel } from "@/model/UserModel";
import { NextResponse } from "next/server";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

interface UpdateResult {
  affectedRows: number;
  warningStatus?: number;
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, username, email, created_at, bananas, profil_picture_id, profil_id FROM user ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: userMessages.server }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      username,
      email,
      created_at,
      bananas,
      profil_picture_id,
      profil_id,
    } = await req.json();

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof created_at !== "string" ||
      typeof bananas !== "number" ||
      typeof profil_picture_id !== "number" ||
      typeof profil_id !== "number" ||
      username.trim() === "" ||
      email.trim() === "" ||
      created_at.trim() === "" ||
      username.length > 100 ||
      email.length > 100 ||
      created_at.length > 10 ||
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
      "INSERT INTO user (username, email, created_at, bananas, profil_picture_id, profil_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        username.trim(),
        email.trim(),
        created_at.trim(),
        bananas,
        profil_picture_id,
        profil_id,
      ]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: userMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json({ error: userMessages.server }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = (await req.json()) as UserModel;
    const {
      id,
      username,
      email,
      created_at,
      bananas,
      profil_picture_id,
      profil_id,
    } = payload;
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: userMessages.invalidId },
        { status: 400 }
      );
    }
    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof created_at !== "string" ||
      typeof bananas !== "number" ||
      typeof profil_picture_id !== "number" ||
      typeof profil_id !== "number" ||
      username.trim() === "" ||
      email.trim() === "" ||
      created_at.trim() === "" ||
      username.length > 100 ||
      email.length > 100 ||
      created_at.length > 10 ||
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
      "UPDATE user SET username = ?, email = ?, created_at = ?, bananas = ?, profil_picture_id = ?, profil_id = ? WHERE id = ?",
      [
        username.trim(),
        email.trim(),
        created_at.trim(),
        bananas,
        profil_picture_id,
        profil_id,
      ]
    )) as [UpdateResult, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: userMessages.notFound || "Utilisateur non trouvée" },
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
