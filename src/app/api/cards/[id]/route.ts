import { cardsMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import type { CardsModel } from "@/model/CardsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const pathname = _req.nextUrl.pathname;
  const idStr = pathname.split("/").pop();
  const cardId = parseInt(idStr || "", 10);
  if (isNaN(cardId)) {
    return NextResponse.json(
      { error: cardsMessages.invalidId },
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
        { error: cardsMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/cards/[id]) :", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
