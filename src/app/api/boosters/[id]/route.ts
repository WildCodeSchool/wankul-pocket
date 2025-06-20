import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { boostersMessages } from "@/data/responseMessages";
import type { BoosterModel } from "@/model/BoosterModel";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const boosterId = parseInt(params.id, 10);
  if (isNaN(boosterId)) {
    return NextResponse.json(
      { error: boostersMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT id, name, image FROM booster WHERE id = ?",
      [boosterId]
    );
    const results = Array.isArray(rows) ? (rows as BoosterModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: boostersMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/boosters/[id]) :", error);
    return NextResponse.json(
      { error: boostersMessages.server },
      { status: 500 }
    );
  }
}
