import { collectionMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { QuestProgressModel } from "@/model/QuestProgressModel";
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
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT 
    u.id AS user_id,
    u.bananas,

    (
      SELECT COUNT(*) 
      FROM is_friend 
      WHERE (user_profil_id = u.profil_id 
         OR friend_profil_id = u.profil_id)
         AND acceptance = 1
    ) AS friends_count,


    (
      SELECT COUNT(*) 
      FROM exchange 
      WHERE (from_user_id = u.id 
         OR to_user_id = u.id)
         AND acceptance = 1
    ) AS trades_count,


    (
      SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
          'card_id', c.id,
          'quantity', col.quantity,
          'rarity', c.rarity,
          'name', c.name,
          'clan', c.clan
        )
      )
      FROM collection col
      JOIN card c ON c.id = col.card_id
      WHERE col.user_id = u.id
    ) AS collection

  FROM user u
  WHERE u.email = ?;`,
      [userEmail]
    );

    const result =
      rows && (rows[0] as QuestProgressModel)
        ? {
            ...rows[0],
            collection: rows[0].collection || [],
          }
        : null;

    console.log("Résultat de la requête :", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/users/[email]/quests) :", error);
    return NextResponse.json(
      { error: collectionMessages.server },
      { status: 500 }
    );
  }
}
