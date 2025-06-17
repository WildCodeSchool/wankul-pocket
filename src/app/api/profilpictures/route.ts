import { profilPictureMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";
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
      "SELECT id, image_path FROM profil_picture ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json(
      { error: profilPictureMessages.server },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { image_path } = await req.json();

    if (
      typeof image_path !== "string" ||
      image_path.trim() === "" ||
      image_path.length > 255
    ) {
      return NextResponse.json(
        { error: profilPictureMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "INSERT INTO profil_picture (image_path) VALUES (?)",
      [image_path.trim()]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: profilPictureMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json(
      { error: profilPictureMessages.server },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = (await req.json()) as ProfilPictureModel;
    const { id, image_path } = payload;
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: profilPictureMessages.invalidId },
        { status: 400 }
      );
    }
    if (
      typeof image_path !== "string" ||
      image_path.trim() === "" ||
      image_path.length > 255
    ) {
      return NextResponse.json(
        { error: profilPictureMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "UPDATE profil_picture SET image_path = ? WHERE id = ?",
      [image_path.trim(), id]
    )) as [UpdateResult, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: profilPictureMessages.notFound || "Image non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: profilPictureMessages.updateSuccess });
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error);
    return NextResponse.json(
      { error: profilPictureMessages.server },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const profilPictureId = idParam !== null ? parseInt(idParam, 10) : NaN;

    if (isNaN(profilPictureId)) {
      return NextResponse.json(
        { error: profilPictureMessages.invalidId },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM profil_picture WHERE id = ?", [
      profilPictureId,
    ]);
    return NextResponse.json({ message: profilPictureMessages.deleted });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json(
      { error: profilPictureMessages.server },
      { status: 500 }
    );
  }
}
