import { profilPictureMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
