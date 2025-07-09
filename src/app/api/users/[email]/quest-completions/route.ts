import { NextResponse } from "next/server";
import { questMessages } from "@/data/responseMessages";
import { manageQuestCompletion } from "@/service/QuestCompletionService";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const referer = req.headers.get("referer");
    if (!referer || !referer.includes("/objectifs")) {
      return NextResponse.json(
        { error: "Accès non autorisé - Page invalide" },
        { status: 403 }
      );
    }

    const { user_id, quest_id, reward } = await req.json();
    const userEmail = params.email;

    if (
      typeof user_id !== "number" ||
      isNaN(user_id) ||
      typeof quest_id !== "number" ||
      isNaN(quest_id) ||
      typeof reward !== "number" ||
      isNaN(reward)
    ) {
      return NextResponse.json(
        { error: questMessages.invalidData },
        { status: 400 }
      );
    }

    const result = await manageQuestCompletion({
      user_id,
      quest_id,
      reward,
      userEmail,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Erreur dans la route quest-completions:", error);

    if (error.message === "Quest completion already exists") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    if (
      error.message === "User not found" ||
      error.message === "Quest not found"
    ) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error.message === "Quest completion requirements not met") {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    if (error.message === "Invalid reward amount") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const userEmail = params.email;

    const [completions] = await db.query<RowDataPacket[]>(
      `SELECT 
        cq.id,
        cq.quest_id,
        cq.user_id,
        cq.completed_at,
        q.name as quest_name,
        q.reward
      FROM completed_quests cq
      JOIN quest q ON cq.quest_id = q.id
      JOIN user u ON cq.user_id = u.id
      WHERE u.email = ?
      ORDER BY cq.completed_at DESC`,
      [userEmail]
    );

    const questCompletions = completions || [];

    return NextResponse.json({
      completions: questCompletions,
      total: questCompletions.length,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des completions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
