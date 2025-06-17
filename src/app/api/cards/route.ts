import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cardsMessages } from "@/data/responseMessages";

interface CardsResponse {
  name: string;
  image_path: string;
  card_number: number;
  clan: string;
  rarity: string;
  drop_rate: number;
  official_rate: number;
  is_holo: boolean;
  quote: string;
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
