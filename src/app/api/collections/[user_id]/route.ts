import { collectionMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { CardsModel } from "@/model/CardsModel";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { user_id: string } }
) {
  const userId = parseInt(params?.user_id);
  if (isNaN(userId)) {
    return NextResponse.json(
      { error: collectionMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT c.id, c.name, c.image_path, c.card_number, c.clan, c.rarity, c.official_rate, c.is_holo, c.quote, c.booster_id FROM card AS c JOIN collection AS co ON c.id = co.card_id JOIN user AS u ON u.id = co.user_id WHERE u.id = ? ORDER BY c.id ASC",
      [userId]
    );
    const results = Array.isArray(rows) ? (rows as CardsModel[]) : [];
    if (results.length === 0) {
      return NextResponse.json(
        { error: collectionMessages.notFound },
        { status: 404 }
      );
    }
    return NextResponse.json(results);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/collections/[user_id]) :", error);
    return NextResponse.json(
      { error: collectionMessages.server },
      { status: 500 }
    );
  }
}
