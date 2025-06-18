import { collectionMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { CardsModel } from "@/model/CardsModel";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { email: string } }
) {
  const userEmail = params.email;
  if (typeof userEmail !== "string") {
    return NextResponse.json(
      { error: collectionMessages.invalidEmail },
      { status: 400 }
    );
  }
  try {
    const [rows] = await db.query(
      "SELECT c.id, c.name, c.image_path, c.card_number, c.clan, c.rarity, c.official_rate, c.is_holo, c.quote, c.booster_id, co.quantity, b.season, b.set_name FROM card AS c JOIN collection AS co ON c.id = co.card_id JOIN user AS u ON u.id = co.user_id JOIN booster AS b ON c.booster_id = b.id WHERE u.email = ? ORDER BY c.card_number ASC",
      [userEmail]
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
    console.error(
      "Erreur MySQL (GET /api/collections/users/[email]/collection) :",
      error
    );
    return NextResponse.json(
      { error: collectionMessages.server },
      { status: 500 }
    );
  }
}
