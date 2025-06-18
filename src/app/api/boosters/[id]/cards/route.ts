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
      const emailHeader = request.headers.get("x-user-email");
      if (!userIdHeader) {
        return NextResponse.json({ error: "User ID requis." }, { status: 400 });
      }
      if (!emailHeader) {
        return NextResponse.json(
          { error: "User email requis." },
          { status: 400 }
        );
      }

      const userId = parseInt(userIdHeader, 10);
      const emailID = emailHeader;
      const openedCards = await manageOpening(boosterId, userId, emailID);
      return NextResponse.json(openedCards, { status: 200 });
    }

    const cards = await getCardsByBoosterId(boosterId);
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
