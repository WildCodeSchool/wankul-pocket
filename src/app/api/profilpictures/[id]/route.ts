import { profilPictureMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { ProfilPictureModel } from "@/model/ProfilPictureModel";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const profilPictureId = await parseInt(params.id, 10);
  if (isNaN(profilPictureId)) {
    return NextResponse.json(
      { error: profilPictureMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT id, image_path FROM profil_picture WHERE id = ?",
      [profilPictureId]
    );
    const results = Array.isArray(rows) ? (rows as ProfilPictureModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: profilPictureMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/profilpictures/[id]) :", error);
    return NextResponse.json(
      { error: profilPictureMessages.server },
      { status: 500 }
    );
  }
}
