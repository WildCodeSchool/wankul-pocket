import { cardsMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, image_path, card_number, clan, rarity, drop_rate, official_rate, is_holo, quote, booster_id FROM card;"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
