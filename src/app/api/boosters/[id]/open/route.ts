import { NextRequest, NextResponse } from "next/server";
import { manageOpening } from "@/service/OpenBoosterService";
import { cardsMessages } from "@/data/responseMessages";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const boosterId = parseInt(params.id, 10);
  if (isNaN(boosterId)) {
    return NextResponse.json(
      { error: cardsMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "Utilisateur requis." },
        { status: 400 }
      );
    }

    const cards = await manageOpening(boosterId, userId);
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error("Erreur ouverture booster :", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
