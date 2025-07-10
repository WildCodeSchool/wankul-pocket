import { collectionMessages, questMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { QuestProgressModel } from "@/model/QuestProgressModel";
import { NextResponse, NextRequest } from "next/server";
import { getUserIdByEmail } from "@/service/UserService";

export async function GET(req: NextRequest) {
  const segments = req.nextUrl.pathname.split("/").filter(Boolean);
  const userEmail = segments[segments.length - 2];
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (typeof userEmail !== "string") {
    return NextResponse.json(
      { error: collectionMessages.invalidEmail },
      { status: 400 }
    );
  }

  try {
    if (type === "list") {
      const userId = await getUserIdByEmail(userEmail);

      if (!userId) {
        return NextResponse.json(
          { error: "Utilisateur non trouvé" },
          { status: 404 }
        );
      }

      const [rows] = await db.query(
        `SELECT 
          quest.*,
          completed_quests.id as id_completed,
          completed_quests.quest_id as quest_id_completed,
          completed_quests.user_id as user_id_completed
        FROM quest 
        LEFT JOIN completed_quests ON quest.id = completed_quests.quest_id AND completed_quests.user_id = ?
        WHERE quest.quest_type = 'standard'
        ORDER BY quest.category ASC`,
        [userId]
      );

      const questRows = Array.isArray(rows) ? rows : [];
      return NextResponse.json(questRows);
    }

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
      SELECT COALESCE(
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'card_id', c.id,
            'quantity', col.quantity,
            'rarity', c.rarity,
            'name', c.name,
            'clan', c.clan
          )
        ),
        JSON_ARRAY()
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
            collection: (() => {
              const collectionData = rows[0].collection;

              if (Array.isArray(collectionData)) {
                return collectionData;
              }

              if (typeof collectionData === "string") {
                try {
                  return JSON.parse(collectionData);
                } catch (error) {
                  console.error("Error parsing collection JSON:", error);
                  return [];
                }
              }

              return [];
            })(),
          }
        : null;

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/users/[email]/quests) :", error);
    return NextResponse.json(
      {
        error:
          type === "list" ? questMessages.server : collectionMessages.server,
      },
      { status: 500 }
    );
  }
}
