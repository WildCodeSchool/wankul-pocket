import { NextRequest, NextResponse } from "next/server";
import { getCardsByBoosterId } from "@/lib/openBooster/getCardsByBoosterID";
import { cardsMessages } from "@/data/responseMessages";

export async function GET(
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
    const cards = await getCardsByBoosterId(boosterId);
    //if query.opening ?
    // get 5 cards from the booster
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
