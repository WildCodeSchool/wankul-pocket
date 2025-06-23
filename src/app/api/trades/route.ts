import { tradesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// interface InsertResult {
//   insertId: number
//   affectedRows?: number
//   warningStatus?: number
// }

// interface UpdateResult {
//   affectedRows: number
//   warningStatus?: number
// }

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT u1.username AS demandeur, u2.username AS invité, pp.image_path AS image_profil_demandeur, c1.image_path AS image_carte_proposée, c2.image_path AS image_carte_demandée, e.status, e.acceptance FROM exchange AS e JOIN user AS u1 ON e.from_user_id = u1.id JOIN user AS u2 ON e.to_user_id = u2.id JOIN profil_picture AS pp ON u1.profil_picture_id = pp.id JOIN card AS c1 ON e.offered_card_id = c1.id JOIN card AS c2 ON e.requested_card_id = c2.id WHERE e.to_user_id = ? AND (e.status IS NULL OR e.status = FALSE)"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: tradesMessages.server }, { status: 500 });
  }
}
