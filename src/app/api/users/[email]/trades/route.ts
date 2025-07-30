import { tradesMessages } from "@/data/responseMessages";
import { checkUserAuth } from "@/lib/checkUserAuth";
import { db } from "@/lib/db";
import { FriendsModel } from "@/model/FriendsModel";
import { TradeModel } from "@/model/TradeModel";
import { UpdatedTradeModel } from "@/model/UpdatedTradeModel";
import { UserModel } from "@/model/UserModel";
import { NextRequest, NextResponse } from "next/server";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

interface UpdateResult {
  affectedRows: number;
  warningStatus?: number;
}

interface CheckUser {
  id: number;
  profil_id: string;
  card_quantity: number;
  card_rarity: string;
  card_id: number;
  pending_exchange_count: number;
}

export async function GET(_req: NextRequest) {
  const segments = _req.nextUrl.pathname.split("/").filter(Boolean);
  const userEmail = segments[segments.length - 2];
  const { searchParams } = new URL(_req.url);
  const type = searchParams.get("type") || "received";

  if (typeof userEmail !== "string") {
    return NextResponse.json(
      { error: tradesMessages.invalidEmail },
      { status: 400 }
    );
  }

  try {
    let query = `SELECT e.id, u1.username AS from_username, u1.email AS from_user_email, u2.username AS to_username, u2.email AS to_user_email, u1.id AS from_user_id, u2.id AS to_user_id, pp1.image_path AS from_user_avatar, pp2.image_path AS to_user_avatar, c1.image_path AS offered_card_img, c2.image_path AS requested_card_img, c1.id AS offered_card_id, c2.id AS requested_card_id, uc1.quantity AS offered_card_quantity, uc2.quantity AS requested_card_quantity, e.status, e.acceptance FROM exchange AS e JOIN user AS u1 ON e.from_user_id = u1.id JOIN user AS u2 ON e.to_user_id = u2.id JOIN profil_picture AS pp1 ON u1.profil_picture_id = pp1.id JOIN profil_picture AS pp2 ON u2.profil_picture_id = pp2.id JOIN card AS c1 ON e.offered_card_id = c1.id JOIN card AS c2 ON e.requested_card_id = c2.id JOIN collection AS uc1 ON e.from_user_id = uc1.user_id AND e.offered_card_id = uc1.card_id JOIN collection AS uc2 ON e.to_user_id = uc2.user_id AND e.requested_card_id = uc2.card_id WHERE e.status = 1`;
    const values: string[] = [];

    if (type === "received") {
      query += " AND u2.email = ? AND e.acceptance IS NULL";
    } else if (type === "sent") {
      query += " AND u1.email = ?";
    } else {
      return NextResponse.json(
        { error: "Paramètre 'type' invalide" },
        { status: 400 }
      );
    }

    values.push(userEmail);

    const [rows] = await db.query(query, values);
    const results = Array.isArray(rows) ? (rows as TradeModel[]) : [];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/users/[email]/trades) :", error);

    return NextResponse.json({ error: tradesMessages.server }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await checkUserAuth();
  if (!auth.authorized) return auth.response;

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
      typeof status !== "boolean" ||
      acceptance !== null ||
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

    if (from_user_id === to_user_id) {
      return NextResponse.json(
        { error: tradesMessages.tradeToSelf },
        { status: 400 }
      );
    }

    if (requested_card_id === offered_card_id) {
      return NextResponse.json(
        {
          error: tradesMessages.tradeSameCard,
        },
        { status: 400 }
      );
    }

    const [currentUser] = (await db.query(
      "SELECT u.id, u.profil_id, col.quantity AS card_quantity, c.rarity AS card_rarity, c.id AS card_id, (SELECT COUNT(*) FROM exchange AS e WHERE (e.from_user_id = u.id OR e.to_user_id = u.id) AND e.acceptance IS NULL) AS pending_exchange_count FROM user AS u JOIN card AS c ON c.id = ? JOIN collection AS col ON col.user_id = u.id AND col.card_id = c.id WHERE u.email = ?",
      [offered_card_id, auth.email]
    )) as [CheckUser[], unknown];
    const [friend] = (await db.query(
      "SELECT u.id, u.profil_id, col.quantity AS card_quantity, c.rarity AS card_rarity, c.id AS card_id, (SELECT COUNT(*) FROM exchange AS e WHERE (e.from_user_id = u.id OR e.to_user_id = u.id) AND e.acceptance IS NULL) AS pending_exchange_count FROM user AS u JOIN card AS c ON c.id = ? JOIN collection AS col ON col.user_id = u.id AND col.card_id = c.id WHERE u.id = ?",
      [requested_card_id, to_user_id]
    )) as [CheckUser[], unknown];

    if (!currentUser?.[0]) {
      return NextResponse.json(
        { error: tradesMessages.noUser },
        { status: 404 }
      );
    }
    if (!friend?.[0]) {
      return NextResponse.json(
        { error: tradesMessages.noUser },
        { status: 404 }
      );
    }
    if (currentUser[0].id !== from_user_id) {
      return NextResponse.json(
        {
          error: tradesMessages.noUser,
        },
        { status: 400 }
      );
    }

    if (
      currentUser[0]?.pending_exchange_count > 0 ||
      friend[0]?.pending_exchange_count > 0
    ) {
      return NextResponse.json(
        {
          error: tradesMessages.pendingTrade,
        },
        { status: 400 }
      );
    }

    const userProfilId = currentUser[0]?.profil_id;
    const friendProfilId = friend[0]?.profil_id;
    const [isFriend] = (await db.query(
      "SELECT 1 FROM is_friend WHERE acceptance = 1 AND ((user_profil_id = ? AND friend_profil_id = ?) OR (user_profil_id = ? AND friend_profil_id = ?))",
      [userProfilId, friendProfilId, friendProfilId, userProfilId]
    )) as [FriendsModel[], unknown];
    if (isFriend.length === 0) {
      return NextResponse.json(
        {
          error: tradesMessages.noFriend,
        },
        { status: 400 }
      );
    }

    if (currentUser[0].card_quantity <= 1 || friend[0].card_quantity <= 1) {
      return NextResponse.json(
        {
          error: tradesMessages.quantity,
        },
        { status: 400 }
      );
    }
    if (currentUser[0].card_rarity !== friend[0].card_rarity) {
      return NextResponse.json(
        {
          error: tradesMessages.rarity,
        },
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
  const auth = await checkUserAuth();
  if (!auth.authorized) return auth.response;

  try {
    const updatedExchange = (await req.json()) as UpdatedTradeModel;
    const { id, status, acceptance, from_user_id, to_user_id } =
      updatedExchange;
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

    const [currentUser] = (await db.query(
      "SELECT id FROM user WHERE email = ? LIMIT 1",
      [auth.email]
    )) as [UserModel[], unknown];
    if (!currentUser?.[0]) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié ou introuvable." },
        { status: 401 }
      );
    }
    if (currentUser[0].id === to_user_id) {
      if (typeof acceptance !== "boolean") {
        return NextResponse.json(
          { error: "Seul le destinataire peut répondre à l’échange." },
          { status: 400 }
        );
      }
    } else if (currentUser[0].id === from_user_id) {
      if (status !== false || acceptance === null) {
        return NextResponse.json(
          {
            error:
              "Tu peux archiver uniquement un échange déjà répondu (accepté ou refusé).",
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Tu n’es pas autorisé à modifier cet échange." },
        { status: 403 }
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
