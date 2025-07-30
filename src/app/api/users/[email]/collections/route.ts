import { collectionMessages } from "@/data/responseMessages";
import { checkUserAuth } from "@/lib/checkUserAuth";
import { db } from "@/lib/db";
import { CardsModel } from "@/model/CardsModel";
import { getUserIdByEmail } from "@/service/UserService";
import { NextRequest, NextResponse } from "next/server";

interface UpdateResult {
  affectedRows: number;
  warningStatus?: number;
}

export async function GET(_req: NextRequest) {
  const segments = _req.nextUrl.pathname.split("/").filter(Boolean);
  const userEmail = segments[segments.length - 2];
  const { searchParams } = new URL(_req.url);
  const rarity = searchParams.get("rarity");

  if (typeof userEmail !== "string") {
    return NextResponse.json(
      { error: collectionMessages.invalidEmail },
      { status: 400 }
    );
  }

  try {
    let query = `
      SELECT c.id, c.name, c.image_path, c.card_number, c.clan, c.rarity, c.official_rate, 
             c.is_holo, c.quote, c.booster_id, co.quantity, b.season, b.set_name
      FROM card AS c
      JOIN collection AS co ON c.id = co.card_id
      JOIN user AS u ON u.id = co.user_id
      JOIN booster AS b ON c.booster_id = b.id
      WHERE u.email = ?
    `;
    const values: string[] = [userEmail];

    if (rarity) {
      query += " AND c.rarity = ?";
      values.push(rarity);
    }

    query += " ORDER BY c.card_number ASC";

    const [rows] = await db.query(query, values);
    const results = Array.isArray(rows) ? (rows as CardsModel[]) : [];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/users/[email]/collections) :", error);
    return NextResponse.json(
      { error: collectionMessages.server },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const email = segments[segments.length - 2];

  const auth = await checkUserAuth(email);
  if (!auth.authorized) return auth.response;

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
      cardIds.map((cardId) =>
        db.query(
          `INSERT INTO collection (user_id, card_id, quantity)
     VALUES (?, ?, 1)
     ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
          [userId, cardId]
        )
      )
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

export async function PATCH(req: NextRequest) {
  try {
    const { id, quantity, user_id } = (await req.json()) as CardsModel;
    const segments = req.nextUrl.pathname.split("/").filter(Boolean);
    const userEmail = segments[segments.length - 2];

    if (typeof userEmail !== "string") {
      return NextResponse.json(
        { error: collectionMessages.invalidEmail },
        { status: 400 }
      );
    }

    const auth = await checkUserAuth(userEmail);
    if (!auth.authorized) return auth.response;

    if (
      typeof quantity !== "number" ||
      isNaN(quantity) ||
      quantity < 1 ||
      typeof id !== "number" ||
      isNaN(id) ||
      typeof user_id !== "number" ||
      isNaN(user_id) ||
      user_id < 0
    ) {
      return NextResponse.json(
        { error: collectionMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "UPDATE collection SET quantity = ? WHERE card_id = ? AND user_id = ?",
      [quantity, id, user_id]
    )) as [UpdateResult, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: collectionMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: collectionMessages.updateSuccess });
  } catch (error) {
    console.error("Erreur PATCH /collections:", error);
    return NextResponse.json(
      { error: collectionMessages.server },
      { status: 500 }
    );
  }
}
