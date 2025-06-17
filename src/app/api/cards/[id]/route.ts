import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { infoMessages } from "@/data/responseMessages";
import type { CardsModel } from "@/model/CardsModel";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const cardId = parseInt(params.id, 10);
  if (isNaN(cardId)) {
    return NextResponse.json(
      { error: infoMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT id, image_path, card_number, clan, rarity, drop_rate, official_rate, is_holo, quote, booster_id FROM card WHERE id = ?",
      [cardId]
    );
    const results = Array.isArray(rows) ? (rows as CardsModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: infoMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/cards/[id]) :", error);
    return NextResponse.json({ error: infoMessages.server }, { status: 500 });
  }
}
