import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cardsMessages } from "@/data/responseMessages";
import { CardsModel } from "@/model/CardsModel";

interface CardsResponse extends CardsModel {
  booster_id: number;
}

export async function GET(request: Request) {
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
