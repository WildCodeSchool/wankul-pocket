import { NextRequest, NextResponse } from "next/server";
import { addCardToCollection } from "@/service/CollectionService";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "ID utilisateur invalide." },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const cardIds: number[] = body.cardIds;

    if (!Array.isArray(cardIds) || cardIds.length === 0) {
      return NextResponse.json(
        { error: "Aucune carte à ajouter." },
        { status: 400 }
      );
    }

    await Promise.all(
      cardIds.map((cardId) => addCardToCollection(userId, cardId))
    );

    return NextResponse.json(
      { message: "Cartes ajoutées à la collection." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur ajout collection :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
