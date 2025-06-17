import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cardsMessages } from "@/data/responseMessages";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const boosterId = parseInt(params.id, 10);
  if (isNaN(boosterId)) {
    return NextResponse.json(
      { error: cardsMessages.invalidId },
      { status: 400 }
    );
  }
  try {
    const [rows] = await db.query(
      "SELECT id, name, image_path, card_number, clan, rarity, drop_rate, official_rate, is_holo, quote, booster_id FROM card WHERE booster_id = ?;",
      [boosterId]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
