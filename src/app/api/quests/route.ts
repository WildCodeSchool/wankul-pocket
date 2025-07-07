import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { questMessages } from "@/data/responseMessages";

export async function GET() {
  try {
    const [rows] = await db.query(
      `SELECT 
        quest.*,
        completed_quests.id as id_completed,
        completed_quests.quest_id as quest_id_completed,
        completed_quests.user_id as user_id_completed
      FROM quest 
      LEFT JOIN completed_quests ON quest.id = completed_quests.quest_id 
      ORDER BY quest.category ASC`
    );

    const questRows = Array.isArray(rows) ? rows : [];

    return NextResponse.json(questRows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: questMessages.server }, { status: 500 });
  }
}
