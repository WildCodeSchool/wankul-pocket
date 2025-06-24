import { tradesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { TradeModel } from "@/model/TradeModel";
import { NextResponse } from "next/server";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

interface UpdateResult {
  affectedRows: number;
  warningStatus?: number;
}

export async function GET(
  _req: Request,
  { params }: { params: { email: string } }
) {
  const userEmail = params.email;
  if (typeof userEmail !== "string") {
    return NextResponse.json(
      { error: tradesMessages.invalidEmail },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT e.id, u1.username AS from_username, u2.username AS to_username, u1.id AS from_user_id, u2.id AS to_user_id, pp.image_path AS from_user_avatar, c1.image_path AS offered_card_img, c2.image_path AS requested_card_img, c1.id AS offered_card_id, c2.id AS requested_card_id, e.status, e.acceptance FROM exchange AS e JOIN user AS u1 ON e.from_user_id = u1.id JOIN user AS u2 ON e.to_user_id = u2.id JOIN profil_picture AS pp ON u1.profil_picture_id = pp.id JOIN card AS c1 ON e.offered_card_id = c1.id JOIN card AS c2 ON e.requested_card_id = c2.id WHERE u2.email = ? AND (e.status IS NULL OR e.status = FALSE)",
      [userEmail]
    );
    const results = Array.isArray(rows) ? (rows as TradeModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: tradesMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/users/[email]/trades) :", error);
    return NextResponse.json({ error: tradesMessages.server }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      from_user_id,
      to_user_id,
      offered_card_id,
      requested_card_id,
      status,
      acceptance,
    } = await req.json();

    if (
      typeof from_user_id !== "number" ||
      typeof to_user_id !== "number" ||
      typeof offered_card_id !== "number" ||
      typeof requested_card_id !== "number" ||
      from_user_id <= 0 ||
      to_user_id <= 0 ||
      offered_card_id <= 0 ||
      requested_card_id <= 0
    ) {
      return NextResponse.json(
        { error: tradesMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "INSERT INTO exchange (from_user_id, to_user_id, offered_card_id, requested_card_id, status, acceptance) VALUES (?, ?, ?, ?, ?, ?)",
      [
        from_user_id,
        to_user_id,
        offered_card_id,
        requested_card_id,
        status,
        acceptance,
      ]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: tradesMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json({ error: tradesMessages.server }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const updatedExchange = (await req.json()) as TradeModel;
    const { id, status, acceptance } = updatedExchange;
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: tradesMessages.invalidId },
        { status: 400 }
      );
    }
    if (typeof status !== "boolean" || typeof acceptance !== "boolean") {
      return NextResponse.json(
        { error: tradesMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "UPDATE exchange SET status = ?, acceptance = ? WHERE id = ?",
      [status, acceptance, id]
    )) as [UpdateResult, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: tradesMessages.notFound || "Echange non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: tradesMessages.updateSuccess });
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error);
    return NextResponse.json({ error: tradesMessages.server }, { status: 500 });
  }
}
