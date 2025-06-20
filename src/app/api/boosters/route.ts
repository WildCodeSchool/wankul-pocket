import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { boostersMessages } from "@/data/responseMessages";

interface BoosterResponse {
  id: number;
  name: string;
  image: string;
  season: number;
  set_name: string;
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, image, season, set_name FROM booster ORDER BY id ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json(
      { error: boostersMessages.server },
      { status: 500 }
    );
  }
}
