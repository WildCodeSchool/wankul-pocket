import { NextRequest, NextResponse } from "next/server";
import { cardsMessages } from "@/data/responseMessages";
import { manageOpening } from "@/service/OpenBoosterService";

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

  const searchParams = request.nextUrl.searchParams;
  const isOpening = searchParams.get("opening");

  try {
    if (isOpening === "true") {
      const cards = await manageOpening(boosterId);
      return NextResponse.json(cards, { status: 200 });
    }
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: cardsMessages.server }, { status: 500 });
  }
}
