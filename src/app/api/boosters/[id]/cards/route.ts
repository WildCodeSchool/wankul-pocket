import { NextRequest, NextResponse } from "next/server";
import { getCardsByBoosterId } from "@/service/CardsService";
import { manageOpening } from "@/service/OpenBoosterService";
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

  const url = new URL(request.url);
  const isOpening = url.searchParams.get("opening") === "true";

  try {
    if (isOpening) {
      const userIdHeader = request.headers.get("x-user-id");
      if (!userIdHeader) {
        return NextResponse.json({ error: "User ID requis." }, { status: 400 });
      }

      const userId = parseInt(userIdHeader, 10);
      const openedCards = await manageOpening(boosterId, userId);
      return NextResponse.json(openedCards, { status: 200 });
    }

    const cards = await getCardsByBoosterId(boosterId);
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
