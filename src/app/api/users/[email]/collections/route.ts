import { collectionMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { CardsModel } from "@/model/CardsModel";
import { NextResponse, NextRequest } from "next/server";
import { getUserIdByEmail } from "@/service/UserService";
import { addCardToCollection } from "@/service/CollectionService";

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

export async function POST(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const email = params.email;

  try {
    const body = await request.json();

    const cardIds: number[] = body.cardIds;

    if (!Array.isArray(cardIds) || cardIds.length === 0) {
      return NextResponse.json(
        { error: "Aucune carte à ajouter." },
        { status: 400 }
      );
    }

    const userId = await getUserIdByEmail(email);
    if (!userId) {
      return NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 404 }
      );
    }

    await Promise.all(
      cardIds.map((cardId) => addCardToCollection(userId, cardId))
    );

    return NextResponse.json(
      { message: "Cartes ajoutées à la collection." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur ajout collection :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
